import { VIETNAM_BANKS } from '../../lib/banks.js'

export default function BankSelectField({ bankBin, onChange }) {
  const handleSelect = (e) => {
    const bin = e.target.value
    const bank = VIETNAM_BANKS.find((b) => b.bin === bin)
    onChange({ bankBin: bin, bankName: bank?.name ?? '' })
  }

  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-wine-700">Ngân hàng</span>
      <select
        value={bankBin}
        onChange={handleSelect}
        className="w-full rounded-lg border border-gold-200 bg-cream-50 px-3 py-2 text-sm text-ink outline-none focus:border-wine-400"
      >
        <option value="">-- Chọn ngân hàng --</option>
        {VIETNAM_BANKS.map((b) => (
          <option key={b.bin} value={b.bin}>
            {b.name}
          </option>
        ))}
      </select>
    </label>
  )
}
