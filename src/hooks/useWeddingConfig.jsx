import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { wedding as defaultWedding } from '../lib/weddingConfig.js'
import { insertAt, removeAt, setIn } from '../lib/configPath.js'

const STORAGE_KEY = 'thiepcuoi:weddingConfig'

function loadStoredConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function persist(config) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  } catch {
    // localStorage đầy hoặc bị chặn — bỏ qua, form vẫn hoạt động trong phiên hiện tại.
  }
}

const WeddingConfigContext = createContext(null)

export function WeddingConfigProvider({ children }) {
  const [config, setConfigState] = useState(() => loadStoredConfig() ?? defaultWedding)
  const [isCustomized, setIsCustomized] = useState(() => loadStoredConfig() !== null)

  const setConfig = useCallback((updater) => {
    setConfigState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      persist(next)
      setIsCustomized(true)
      return next
    })
  }, [])

  const updateField = useCallback(
    (path, value) => setConfig((prev) => setIn(prev, path, value)),
    [setConfig],
  )

  const addItem = useCallback((path, item) => setConfig((prev) => insertAt(prev, path, item)), [setConfig])

  const removeItem = useCallback(
    (path, index) => setConfig((prev) => removeAt(prev, path, index)),
    [setConfig],
  )

  const resetConfig = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setConfigState(defaultWedding)
    setIsCustomized(false)
  }, [])

  const importConfig = useCallback(
    (nextConfig) => {
      setConfig(nextConfig)
    },
    [setConfig],
  )

  const value = useMemo(
    () => ({ config, isCustomized, updateField, addItem, removeItem, resetConfig, importConfig }),
    [config, isCustomized, updateField, addItem, removeItem, resetConfig, importConfig],
  )

  return <WeddingConfigContext.Provider value={value}>{children}</WeddingConfigContext.Provider>
}

export function useWeddingConfig() {
  const ctx = useContext(WeddingConfigContext)
  if (!ctx) throw new Error('useWeddingConfig must be used within WeddingConfigProvider')
  return ctx
}
