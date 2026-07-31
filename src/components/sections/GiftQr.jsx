import { useState } from 'react'
import { Check, Copy, Gift } from 'lucide-react'
import { useWeddingConfig } from '../../hooks/useWeddingConfig.jsx'
import SectionReveal from '../ui/SectionReveal.jsx'
import FloralDivider from '../decor/FloralDivider.jsx'

function buildQrUrl({ bankBin, accountNumber, accountName, message }) {
  const params = new URLSearchParams({ accountName, addInfo: message })
  return `https://img.vietqr.io/image/${bankBin}-${accountNumber}-compact2.png?${params.toString()}`
}

function AccountCard({ account, giftMessage }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account.accountNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard API unavailable — người dùng có thể tự bôi đen để copy.
    }
  }

  return (
    <div className="flex flex-col items-center rounded-2xl border border-gold-200 bg-white/70 p-6 text-center shadow-sm">
      <p className="font-display text-lg text-wine-700">{account.owner}</p>
      <img
        src={buildQrUrl({ ...account, message: giftMessage })}
        alt={`Mã QR chuyển khoản ${account.owner}`}
        className="mt-4 h-48 w-48 rounded-lg border border-gold-200 object-contain"
        loading="lazy"
      />
      <div className="mt-4 space-y-1 text-sm text-ink/75">
        <p>{account.bankName}</p>
        <p className="font-medium text-ink">{account.accountName}</p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className={`mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
          copied
            ? 'border-green-400 bg-green-50 text-green-700'
            : 'border-gold-300 bg-white text-wine-700 hover:bg-gold-100'
        }`}
      >
        {copied ? <Check size={13} /> : <Copy size={13} />}
        {copied ? 'Đã copy' : account.accountNumber}
      </button>
    </div>
  )
}

export default function GiftQr() {
  const { config: wedding } = useWeddingConfig()

  if (!wedding.bankAccounts?.length) return null

  return (
    <section className="bg-wine-800 px-6 py-20 text-gold-100 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <SectionReveal>
          <Gift className="mx-auto text-gold-400" size={30} />
          <p className="mt-4 font-script text-3xl text-gold-300">Mừng cưới</p>
          <FloralDivider className="my-6" />
          <p className="mx-auto max-w-md text-sm leading-6 text-gold-200/80">
            Sự hiện diện của bạn là món quà quý giá nhất. Nếu muốn gửi lời chúc bằng một món quà
            nhỏ, bạn có thể quét mã QR bên dưới.
          </p>
        </SectionReveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {wedding.bankAccounts.map((account, i) => (
            <SectionReveal key={account.id ?? i} delay={i * 0.12}>
              <AccountCard account={account} giftMessage={wedding.giftMessage} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
