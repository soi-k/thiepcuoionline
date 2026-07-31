// Lưu trữ theo "collection" trong localStorage — mỗi trình duyệt lưu riêng, chưa
// dùng chung được giữa các khách mời khác nhau. API dạng Promise để sau này có thể
// thay bằng backend thật (Firebase/Supabase...) mà không cần sửa code gọi ở component.
const PREFIX = 'thiepcuoi:collection:'

function readCollection(name) {
  try {
    const raw = localStorage.getItem(PREFIX + name)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeCollection(name, items) {
  try {
    localStorage.setItem(PREFIX + name, JSON.stringify(items))
  } catch {
    // localStorage đầy hoặc bị chặn — bỏ qua, dữ liệu vẫn dùng được trong phiên hiện tại.
  }
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export const localStore = {
  async list(name) {
    return readCollection(name)
  },
  async add(name, item) {
    const items = readCollection(name)
    const record = { id: makeId(), createdAt: Date.now(), ...item }
    writeCollection(name, [...items, record])
    return record
  },
  async remove(name, id) {
    const items = readCollection(name)
    writeCollection(name, items.filter((i) => i.id !== id))
  },
  async update(name, id, patch) {
    const items = readCollection(name)
    const next = items.map((i) => (i.id === id ? { ...i, ...patch } : i))
    writeCollection(name, next)
    return next.find((i) => i.id === id)
  },
}
