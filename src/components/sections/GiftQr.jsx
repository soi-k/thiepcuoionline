import { useState } from 'react'
import { Check, Copy, Gift } from 'lucide-react'
import { useWeddingConfig } from '../../hooks/useWeddingConfig.jsx'
import { assetUrl } from '../../lib/assetUrl.js'
import SectionReveal from '../ui/SectionReveal.jsx'
import FloralDivider from '../decor/FloralDivider.jsx'

function buildQrUrl({ bankBin, accountNumber, accountName, message }) {
  const params = new URLSearchParams({ accountName, addInfo: message })
  return `https://img.vietqr.io/image/${bankBin}-${accountNumber}-compact2.png?${params.toString()}`
}

const ROLE_LABEL = { groom: 'Chú rể', bride: 'Cô dâu' }

function AccountCard({ account, giftMessage, person }) {
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

  const displayName = person?.fullName || account.owner

  return (
    <div className="relative flex flex-col items-center rounded-2xl border border-gold-200 bg-white/70 px-5 pb-6 pt-6 text-center shadow-sm">
      {person?.avatar && (
        <div className="-mt-12 mb-3 h-20 w-20 overflow-hidden rounded-full border-4 border-gold-300 bg-cream-100 shadow-md">
          <img src={assetUrl(person.avatar)} alt={displayName} className="h-full w-full object-cover" />
        </div>
      )}
      {account.side && (
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-600">
          {ROLE_LABEL[account.side]}
        </p>
      )}
      <p className="mt-1 font-display text-lg text-wine-700">{displayName}</p>
      {!person && <p className="text-xs text-ink/50">{account.owner}</p>}

      <div className="mt-4 w-full rounded-xl border border-gold-200 bg-cream-50 p-3">
        <p className="mb-2 font-script text-base text-wine-600">Mừng cưới</p>
        <img
          src={buildQrUrl({ ...account, message: giftMessage })}
          alt={`Mã QR chuyển khoản ${displayName}`}
          className="mx-auto h-40 w-40 rounded-lg object-contain"
          loading="lazy"
        />
      </div>

      <p className="mt-3 text-xs text-ink/60">{account.bankName}</p>
      <button
        type="button"
        onClick={handleCopy}
        className={`mt-2 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
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

  const personFor = (account) =>
    account.side === 'groom' ? wedding.groom : account.side === 'bride' ? wedding.bride : null

  return (
    <section id="gift-section" className="bg-wine-800 px-6 py-20 text-gold-100 sm:py-28">
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

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {wedding.bankAccounts.map((account, i) => (
            <SectionReveal key={account.id ?? i} delay={i * 0.12}>
              <AccountCard account={account} giftMessage={wedding.giftMessage} person={personFor(account)} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
