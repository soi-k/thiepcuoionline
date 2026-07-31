import { useLocation } from 'react-router-dom'
import { getGuestNameFromLocation } from '../lib/guestLink.js'

export function useGuestName() {
  const location = useLocation()
  return getGuestNameFromLocation(location)
}
