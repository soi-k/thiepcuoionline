import { useCallback, useState } from 'react'
import HeartBurst from '../components/decor/HeartBurst.jsx'

export function useHeartBursts() {
  const [bursts, setBursts] = useState([])

  const trigger = useCallback((x, y) => {
    setBursts((prev) => [...prev, { id: `${Date.now()}-${Math.random()}`, x, y }])
  }, [])

  const remove = useCallback((id) => {
    setBursts((prev) => prev.filter((b) => b.id !== id))
  }, [])

  const portal = bursts.map((b) => (
    <HeartBurst key={b.id} burstId={b.id} x={b.x} y={b.y} onDone={remove} />
  ))

  return { trigger, portal }
}
