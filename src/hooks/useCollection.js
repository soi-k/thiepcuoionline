import { useCallback, useEffect, useState } from 'react'
import { localStore } from '../lib/localStore.js'

export function useCollection(name) {
  const [items, setItems] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let active = true
    localStore.list(name).then((data) => {
      if (!active) return
      setItems(data)
      setLoaded(true)
    })
    return () => {
      active = false
    }
  }, [name])

  const add = useCallback(
    async (item) => {
      const record = await localStore.add(name, item)
      setItems((prev) => [...prev, record])
      return record
    },
    [name],
  )

  const remove = useCallback(
    async (id) => {
      await localStore.remove(name, id)
      setItems((prev) => prev.filter((i) => i.id !== id))
    },
    [name],
  )

  const update = useCallback(
    async (id, patch) => {
      const record = await localStore.update(name, id, patch)
      setItems((prev) => prev.map((i) => (i.id === id ? record : i)))
      return record
    },
    [name],
  )

  return { items, loaded, add, remove, update }
}
