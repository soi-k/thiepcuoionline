// Đặt (set) giá trị theo đường dẫn (path) trong object/array lồng nhau mà không sửa dữ liệu gốc.
export function setIn(target, path, value) {
  const [key, ...rest] = path
  const isArrayTarget = Array.isArray(target)
  const base = target ?? (typeof key === 'number' ? [] : {})

  if (rest.length === 0) {
    if (isArrayTarget || Array.isArray(base)) {
      const copy = [...base]
      copy[key] = value
      return copy
    }
    return { ...base, [key]: value }
  }

  const nextBase = base[key] ?? (typeof rest[0] === 'number' ? [] : {})
  const nextValue = setIn(nextBase, rest, value)

  if (isArrayTarget || Array.isArray(base)) {
    const copy = [...base]
    copy[key] = nextValue
    return copy
  }
  return { ...base, [key]: nextValue }
}

export function removeAt(target, path, index) {
  const list = path.reduce((acc, key) => acc[key], target)
  const copy = [...list]
  copy.splice(index, 1)
  return setIn(target, path, copy)
}

export function insertAt(target, path, item) {
  const list = path.reduce((acc, key) => acc[key], target)
  return setIn(target, path, [...list, item])
}
