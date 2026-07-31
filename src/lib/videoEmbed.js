// Chuyển link YouTube/Vimeo thường thành link nhúng (embed) được.
export function getEmbedUrl(url) {
  if (!url) return null
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`
    }
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname.startsWith('/embed/')) return url
      const id = u.searchParams.get('v') || u.pathname.split('/shorts/')[1]
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
    if (u.hostname.includes('vimeo.com')) {
      if (u.pathname.startsWith('/video/')) return `https://player.vimeo.com/video/${u.pathname.split('/')[2]}`
      const id = u.pathname.split('/').filter(Boolean).pop()
      return id ? `https://player.vimeo.com/video/${id}` : null
    }
    return null
  } catch {
    return null
  }
}
