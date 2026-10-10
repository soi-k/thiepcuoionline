// Lưu trữ theo "collection" trong localStorage — mỗi trình duyệt lưu riêng, chưa
// dùng chung được giữa các khách mời khác nhau. API dạng Promise để sau này có thể
// thay bằng backend thật (Firebase/Supabase...) mà không cần sửa code gọi ở component.
const PREFIX = 'thiepcuoi:collection:'
const listeners = new Map()

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

function notify(name) {
  listeners.get(name)?.forEach((fn) => fn())
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export const localStore = {
  // Đăng ký nhận thông báo mỗi khi collection này thay đổi (kể cả do component khác
  // trên cùng trang ghi), để nhiều nơi hiển thị cùng 1 collection luôn đồng bộ.
  subscribe(name, fn) {
    if (!listeners.has(name)) listeners.set(name, new Set())
    listeners.get(name).add(fn)
    return () => listeners.get(name)?.delete(fn)
  },
  async list(name) {
    return readCollection(name)
  },
  async add(name, item) {
    const items = readCollection(name)
    const record = { id: makeId(), createdAt: Date.now(), ...item }
    writeCollection(name, [...items, record])
    notify(name)
    return record
  },
  async remove(name, id) {
    const items = readCollection(name)
    writeCollection(
      name,
      items.filter((i) => i.id !== id),
    )
    notify(name)
  },
  async update(name, id, patch) {
    const items = readCollection(name)
    const next = items.map((i) => (i.id === id ? { ...i, ...patch } : i))
    writeCollection(name, next)
    notify(name)
    return next.find((i) => i.id === id)
  },
}
