export function configToFileText(config) {
  return `// Toàn bộ nội dung thiệp — file này được xuất từ trang /tuy-chinh.
// Thay thế src/lib/weddingConfig.js bằng file này rồi build lại để khách mời thấy nội dung mới.
export const wedding = ${JSON.stringify(config, null, 2)}
`
}

export function downloadTextFile(filename, text, mimeType = 'text/javascript') {
  const blob = new Blob([text], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
