// Ghép đường dẫn public ("/gallery/x.jpg") với BASE_URL của Vite để hoạt động
// đúng khi deploy dưới một subpath (vd: GitHub Pages project site). URL tuyệt đối
// (http.../data:...) được giữ nguyên.
export function assetUrl(path) {
  if (!path) return path
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
