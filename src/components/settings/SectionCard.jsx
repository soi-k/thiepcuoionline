export default function SectionCard({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-gold-200 bg-white/70 p-5 shadow-sm sm:p-6">
      <h2 className="font-display text-lg text-wine-700">{title}</h2>
      {description && <p className="mt-1 text-xs text-ink/50">{description}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  )
}
