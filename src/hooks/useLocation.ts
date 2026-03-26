import { useEffect, useMemo, useState } from 'react'
import {
  genericIstanbulRules,
  getMunicipalityByDistrict,
  type MunicipalityRules,
} from '../data/municipalities'

type LocationStatus = 'detecting' | 'found' | 'approximate' | 'error'

interface LocationState {
  municipality: MunicipalityRules
  district: string
  status: LocationStatus
}

interface NominatimAddress {
  borough?: string
  city_district?: string
  suburb?: string
  town?: string
  city?: string
}

interface NominatimResponse {
  address?: NominatimAddress
}

function getDistrictFromAddress(address: NominatimAddress | undefined): string | null {
  if (!address) {
    return null
  }

  const possibleDistrict = address.city_district ?? address.borough ?? address.suburb
  if (possibleDistrict) {
    return possibleDistrict
  }

  return address.town ?? address.city ?? null
}

export function useLocation(): LocationState {
  const defaultState = useMemo<LocationState>(
    () => ({
      municipality: genericIstanbulRules,
      district: genericIstanbulRules.district,
      status: 'detecting',
    }),
    [],
  )
  const [state, setState] = useState<LocationState>(defaultState)

  useEffect(() => {
    let isCancelled = false

    async function detectLocation() {
      if (!navigator.geolocation) {
        if (!isCancelled) {
          setState({
            municipality: genericIstanbulRules,
            district: genericIstanbulRules.district,
            status: 'error',
          })
        }
        return
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=tr`,
            )

            if (!response.ok) {
              throw new Error('Nominatim istegi basarisiz')
            }

            const data = (await response.json()) as NominatimResponse
            const districtName = getDistrictFromAddress(data.address)
            const matchedMunicipality = districtName
              ? getMunicipalityByDistrict(districtName)
              : null

            if (isCancelled) {
              return
            }

            if (matchedMunicipality) {
              setState({
                municipality: matchedMunicipality,
                district: matchedMunicipality.district,
                status: 'found',
              })
              return
            }

            setState({
              municipality: genericIstanbulRules,
              district: districtName ?? genericIstanbulRules.district,
              status: 'approximate',
            })
          } catch {
            if (!isCancelled) {
              setState({
                municipality: genericIstanbulRules,
                district: genericIstanbulRules.district,
                status: 'approximate',
              })
            }
          }
        },
        () => {
          if (!isCancelled) {
            setState({
              municipality: genericIstanbulRules,
              district: genericIstanbulRules.district,
              status: 'error',
            })
          }
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000,
        },
      )
    }

    void detectLocation()

    return () => {
      isCancelled = true
    }
  }, [])

  return state
}
