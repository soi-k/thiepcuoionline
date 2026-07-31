const GUEST_PARAM = 'to'

export function parseGuestList(rawText) {
  return rawText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

export function buildGuestLink(baseUrl, guestName) {
  const url = new URL(baseUrl)
  url.searchParams.set(GUEST_PARAM, guestName)
  return url.toString()
}

export function getGuestNameFromLocation(location) {
  const params = new URLSearchParams(location.search)
  return params.get(GUEST_PARAM)?.trim() || null
}
