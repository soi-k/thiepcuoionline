import { Trash2 } from 'lucide-react'

export default function RepeatableItem({ children, onRemove, removeLabel = 'Xoá' }) {
  return (
    <div className="relative rounded-xl border border-gold-200 bg-cream-50/60 p-4">
      <button
        type="button"
        onClick={onRemove}
        aria-label={removeLabel}
        className="absolute right-3 top-3 rounded-full p-1.5 text-wine-600/70 transition hover:bg-wine-700/10 hover:text-wine-700"
      >
        <Trash2 size={15} />
      </button>
      <div className="grid gap-3 pr-8">{children}</div>
    </div>
  )
}
