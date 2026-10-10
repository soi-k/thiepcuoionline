import { useCallback, useEffect, useState } from 'react'
import { localStore } from '../lib/localStore.js'

export function useCollection(name) {
  const [items, setItems] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let active = true

    const load = () => {
      localStore.list(name).then((data) => {
        if (!active) return
        setItems(data)
        setLoaded(true)
      })
    }

    load()
    const unsubscribe = localStore.subscribe(name, load)
    return () => {
      active = false
      unsubscribe()
    }
  }, [name])

  // add/remove/update chỉ cần ghi — localStore sẽ báo lại cho mọi nơi đang
  // hiển thị collection này (kể cả chính nơi gọi) qua subscribe ở trên.
  const add = useCallback((item) => localStore.add(name, item), [name])
  const remove = useCallback((id) => localStore.remove(name, id), [name])
  const update = useCallback((id, patch) => localStore.update(name, id, patch), [name])

  return { items, loaded, add, remove, update }
}
