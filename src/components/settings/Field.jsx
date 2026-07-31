export function Field({ label, value, onChange, placeholder, type = 'text', className = '' }) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="mb-1.5 block font-medium text-wine-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gold-200 bg-cream-50 px-3 py-2 text-sm text-ink outline-none focus:border-wine-400"
      />
    </label>
  )
}

export function TextareaField({ label, value, onChange, placeholder, rows = 4, className = '' }) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="mb-1.5 block font-medium text-wine-700">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-y rounded-lg border border-gold-200 bg-cream-50 px-3 py-2 text-sm text-ink outline-none focus:border-wine-400"
      />
    </label>
  )
}
