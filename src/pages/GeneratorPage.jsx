import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Copy, CopyPlus, ArrowLeft } from 'lucide-react'
import { buildGuestLink, parseGuestList } from '../lib/guestLink.js'
import FloralDivider from '../components/decor/FloralDivider.jsx'

function CopyButton({ text, label = 'Copy link' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard API unavailable — no-op, user can select the text manually.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
        copied
          ? 'border-green-400 bg-green-50 text-green-700'
          : 'border-gold-300 bg-white text-wine-700 hover:bg-gold-100'
      }`}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? 'Đã copy' : label}
    </button>
  )
}

export default function GeneratorPage() {
  const [rawText, setRawText] = useState('')
  const [generated, setGenerated] = useState(null)

  const baseUrl = useMemo(() => `${window.location.origin}${import.meta.env.BASE_URL}`, [])

  const handleGenerate = () => {
    const names = parseGuestList(rawText)
    setGenerated(names.map((name) => ({ name, link: buildGuestLink(baseUrl, name) })))
  }

  const copyAllText = useMemo(() => {
    if (!generated) return ''
    return generated.map((g) => `${g.name}: ${g.link}`).join('\n')
  }, [generated])

  return (
    <div className="min-h-screen bg-cream-50 px-6 py-14">
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-wine-700 hover:underline"
          >
            <ArrowLeft size={15} />
            Về trang thiệp
          </Link>
          <Link to="/tuy-chinh" className="text-sm text-wine-700 hover:underline">
            Tuỳ chỉnh nội dung
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="font-script text-3xl text-wine-600">Tạo link mời khách</p>
          <FloralDivider className="my-4" />
          <p className="text-sm text-ink/70">
            Dán danh sách tên khách mời — mỗi tên một dòng. Hệ thống sẽ tự tạo link thiệp riêng
            cho từng người, kèm tên khi họ mở thiệp.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-gold-200 bg-white/70 p-5 shadow-sm">
          <label htmlFor="guest-list" className="mb-2 block text-sm font-medium text-wine-700">
            Danh sách khách mời
          </label>
          <textarea
            id="guest-list"
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder={'Nguyễn Văn A\nTrần Thị B\nGia đình anh Chị Lê Văn C'}
            rows={8}
            className="w-full resize-y rounded-xl border border-gold-200 bg-cream-50 p-3 text-sm text-ink outline-none focus:border-wine-400"
          />
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!rawText.trim()}
            className="mt-4 w-full rounded-full bg-wine-700 py-2.5 text-sm font-medium text-gold-100 transition hover:bg-wine-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Tạo danh sách link
          </button>
        </div>

        {generated && (
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-wine-700">
                {generated.length} link đã được tạo
              </p>
              {generated.length > 0 && <CopyButton text={copyAllText} label="Copy tất cả" />}
            </div>

            {generated.length === 0 ? (
              <p className="rounded-xl border border-dashed border-gold-300 p-6 text-center text-sm text-ink/50">
                Chưa có tên nào hợp lệ.
              </p>
            ) : (
              <ul className="divide-y divide-gold-200 overflow-hidden rounded-2xl border border-gold-200 bg-white/70">
                {generated.map((g) => (
                  <li key={g.link} className="flex items-center justify-between gap-3 px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate font-display text-sm text-ink">{g.name}</p>
                      <p className="truncate text-xs text-ink/50">{g.link}</p>
                    </div>
                    <CopyButton text={g.link} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <p className="mt-10 flex items-center justify-center gap-1.5 text-center text-xs text-ink/40">
          <CopyPlus size={13} />
          Trang này chỉ dành cho chủ thiệp — không chia sẻ link /tao-thiep cho khách mời.
        </p>
      </div>
    </div>
  )
}
