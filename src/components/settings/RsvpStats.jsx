import { Download, Users } from 'lucide-react'
import { useCollection } from '../../hooks/useCollection.js'
import { toCsv } from '../../lib/csv.js'
import { downloadTextFile } from '../../lib/exportConfig.js'
import SectionCard from './SectionCard.jsx'

export default function RsvpStats() {
  const { items } = useCollection('rsvp')

  const attendingCount = items.filter((i) => i.attending).length
  const notAttendingCount = items.length - attendingCount
  const totalAttendingPeople = items
    .filter((i) => i.attending)
    .reduce((sum, i) => sum + Math.max(1, Number(i.guestCount || 1)), 0)

  const handleExportCsv = () => {
    const csv = toCsv(
      items.map((i) => ({ ...i, attending: i.attending ? 'Tham dự' : 'Không tham dự' })),
      [
        { key: 'guestName', label: 'Tên khách' },
        { key: 'attending', label: 'Trạng thái' },
        { key: 'guestCount', label: 'Số người' },
        { key: 'note', label: 'Lời nhắn' },
      ],
    )
    downloadTextFile('rsvp.csv', csv, 'text/csv')
  }

  return (
    <SectionCard
      title="Thống kê RSVP"
      description="Danh sách khách đã xác nhận tham dự (dữ liệu demo trên trình duyệt này)"
    >
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl border border-gold-200 bg-cream-50 p-3">
          <p className="font-display text-2xl text-wine-700">{totalAttendingPeople}</p>
          <p className="text-xs text-ink/50">Người tham dự</p>
        </div>
        <div className="rounded-xl border border-gold-200 bg-cream-50 p-3">
          <p className="font-display text-2xl text-wine-700">{attendingCount}</p>
          <p className="text-xs text-ink/50">Xác nhận đến</p>
        </div>
        <div className="rounded-xl border border-gold-200 bg-cream-50 p-3">
          <p className="font-display text-2xl text-wine-700">{notAttendingCount}</p>
          <p className="text-xs text-ink/50">Không thể đến</p>
        </div>
      </div>

      {items.length > 0 && (
        <div className="max-h-60 overflow-y-auto rounded-xl border border-gold-200">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-gold-100 text-xs uppercase text-wine-700">
              <tr>
                <th className="px-3 py-2">Khách</th>
                <th className="px-3 py-2">Trạng thái</th>
                <th className="px-3 py-2">Số người</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-100">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-3 py-2">{item.guestName}</td>
                  <td className="px-3 py-2">{item.attending ? 'Tham dự' : 'Không tham dự'}</td>
                  <td className="px-3 py-2">{item.attending ? item.guestCount : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {items.length === 0 && (
        <p className="flex items-center justify-center gap-2 py-4 text-sm text-ink/40">
          <Users size={15} />
          Chưa có khách nào phản hồi
        </p>
      )}

      <button
        type="button"
        onClick={handleExportCsv}
        disabled={items.length === 0}
        className="inline-flex items-center gap-2 rounded-full border border-gold-300 bg-white px-4 py-2 text-xs font-medium text-wine-700 transition hover:bg-gold-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Download size={13} />
        Xuất CSV
      </button>
    </SectionCard>
  )
}
