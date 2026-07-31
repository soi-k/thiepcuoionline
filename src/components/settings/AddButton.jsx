import { Plus } from 'lucide-react'

export default function AddButton({ onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-gold-300 py-2.5 text-sm font-medium text-wine-700 transition hover:bg-gold-100/60"
    >
      <Plus size={15} />
      {label}
    </button>
  )
}
