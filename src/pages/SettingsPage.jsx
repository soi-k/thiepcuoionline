import { Link } from 'react-router-dom'
import { ArrowLeft, Download, Eye, RotateCcw } from 'lucide-react'
import { useWeddingConfig } from '../hooks/useWeddingConfig.jsx'
import { configToFileText, downloadTextFile } from '../lib/exportConfig.js'
import FloralDivider from '../components/decor/FloralDivider.jsx'
import { Field, TextareaField } from '../components/settings/Field.jsx'
import ImageField from '../components/settings/ImageField.jsx'
import BankSelectField from '../components/settings/BankSelectField.jsx'
import SectionCard from '../components/settings/SectionCard.jsx'
import RepeatableItem from '../components/settings/RepeatableItem.jsx'
import AddButton from '../components/settings/AddButton.jsx'
import RsvpStats from '../components/settings/RsvpStats.jsx'

export default function SettingsPage() {
  const { config, updateField, addItem, removeItem, resetConfig } = useWeddingConfig()

  const handleExport = () => {
    downloadTextFile('weddingConfig.js', configToFileText(config))
  }

  const handleReset = () => {
    if (confirm('Khôi phục toàn bộ nội dung về mặc định? Thao tác này không thể hoàn tác.')) {
      resetConfig()
    }
  }

  const weddingDateValue = config.weddingDate?.slice(0, 16) ?? ''

  return (
    <div className="min-h-screen bg-cream-50 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-wine-700 hover:underline">
            <ArrowLeft size={15} />
            Về trang thiệp
          </Link>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full border border-gold-300 bg-white px-3 py-1.5 text-xs font-medium text-wine-700 hover:bg-gold-100"
            >
              <Eye size={13} />
              Xem trước
            </Link>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-full border border-gold-300 bg-white px-3 py-1.5 text-xs font-medium text-wine-700 hover:bg-gold-100"
            >
              <RotateCcw size={13} />
              Khôi phục mặc định
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="font-script text-3xl text-wine-600">Tuỳ chỉnh nội dung thiệp</p>
          <FloralDivider className="my-4" />
          <p className="text-sm text-ink/70">
            Mọi thay đổi được lưu ngay trên trình duyệt này và hiện trong mục "Xem trước". Khi ưng
            ý, bấm <strong>Tải file cấu hình</strong> ở cuối trang rồi thay vào{' '}
            <code className="rounded bg-gold-100 px-1 py-0.5 text-xs">src/lib/weddingConfig.js</code>{' '}
            và build lại để khách mời thấy nội dung mới.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <RsvpStats />

          <SectionCard title="Cô dâu & Chú rể">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">Chú rể</p>
                <ImageField
                  label="Ảnh đại diện"
                  value={config.groom.avatar}
                  onChange={(v) => updateField(['groom', 'avatar'], v)}
                  aspect="aspect-square"
                />
                <Field
                  label="Họ tên đầy đủ"
                  value={config.groom.fullName}
                  onChange={(v) => updateField(['groom', 'fullName'], v)}
                />
                <Field
                  label="Tên gọi ngắn (hiển thị lớn)"
                  value={config.groom.shortName}
                  onChange={(v) => updateField(['groom', 'shortName'], v)}
                />
                <Field
                  label="Phụ huynh"
                  value={config.groom.parents}
                  onChange={(v) => updateField(['groom', 'parents'], v)}
                />
              </div>
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">Cô dâu</p>
                <ImageField
                  label="Ảnh đại diện"
                  value={config.bride.avatar}
                  onChange={(v) => updateField(['bride', 'avatar'], v)}
                  aspect="aspect-square"
                />
                <Field
                  label="Họ tên đầy đủ"
                  value={config.bride.fullName}
                  onChange={(v) => updateField(['bride', 'fullName'], v)}
                />
                <Field
                  label="Tên gọi ngắn (hiển thị lớn)"
                  value={config.bride.shortName}
                  onChange={(v) => updateField(['bride', 'shortName'], v)}
                />
                <Field
                  label="Phụ huynh"
                  value={config.bride.parents}
                  onChange={(v) => updateField(['bride', 'parents'], v)}
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Ngày giờ cưới" description="Dùng để đếm ngược trên trang bìa (giờ Việt Nam, GMT+7)">
            <Field
              label="Ngày & giờ"
              type="datetime-local"
              value={weddingDateValue}
              onChange={(v) => updateField(['weddingDate'], `${v}:00+07:00`)}
            />
          </SectionCard>

          <SectionCard title="Lời mở đầu">
            <Field
              label="Tiêu đề (chữ script phía trên)"
              value={config.hero.heading}
              onChange={(v) => updateField(['hero', 'heading'], v)}
            />
            <Field
              label="Câu giới thiệu ngắn"
              value={config.hero.subheading}
              onChange={(v) => updateField(['hero', 'subheading'], v)}
            />
            <Field
              label="Lời chào khách mời"
              value={config.defaultGuestGreeting}
              onChange={(v) => updateField(['defaultGuestGreeting'], v)}
            />
          </SectionCard>

          <SectionCard title="Câu chuyện tình yêu">
            <TextareaField
              label="Đoạn giới thiệu"
              value={config.story}
              onChange={(v) => updateField(['story'], v)}
              rows={5}
            />
            <Field
              label="Link video (YouTube/Vimeo, để trống nếu không có)"
              value={config.storyVideoUrl}
              onChange={(v) => updateField(['storyVideoUrl'], v)}
              placeholder="https://youtu.be/..."
            />

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                Dấu mốc thời gian
              </p>
              {config.timeline.map((item, i) => (
                <RepeatableItem key={i} onRemove={() => removeItem(['timeline'], i)}>
                  <ImageField
                    label="Ảnh minh hoạ"
                    value={item.image}
                    onChange={(v) => updateField(['timeline', i, 'image'], v)}
                    aspect="aspect-video"
                  />
                  <div className="grid gap-3 sm:grid-cols-3">
                    <Field
                      label="Năm"
                      value={item.year}
                      onChange={(v) => updateField(['timeline', i, 'year'], v)}
                      className="sm:col-span-1"
                    />
                    <Field
                      label="Tiêu đề"
                      value={item.title}
                      onChange={(v) => updateField(['timeline', i, 'title'], v)}
                      className="sm:col-span-2"
                    />
                  </div>
                  <TextareaField
                    label="Mô tả"
                    value={item.desc}
                    onChange={(v) => updateField(['timeline', i, 'desc'], v)}
                    rows={2}
                  />
                </RepeatableItem>
              ))}
              <AddButton
                label="Thêm mốc thời gian"
                onClick={() => addItem(['timeline'], { year: '', title: '', desc: '', image: '' })}
              />
            </div>
          </SectionCard>

          <SectionCard title="Thông tin lễ cưới">
            <div className="space-y-3">
              {config.events.map((event, i) => (
                <RepeatableItem key={i} onRemove={() => removeItem(['events'], i)}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Tên buổi lễ"
                      value={event.label}
                      onChange={(v) => updateField(['events', i, 'label'], v)}
                      placeholder="Lễ Vu Quy"
                    />
                    <Field
                      label="Ngày"
                      value={event.date}
                      onChange={(v) => updateField(['events', i, 'date'], v)}
                      placeholder="Thứ Bảy, 12/12/2026"
                    />
                    <Field
                      label="Giờ"
                      value={event.time}
                      onChange={(v) => updateField(['events', i, 'time'], v)}
                      placeholder="09:00"
                    />
                    <Field
                      label="Địa điểm"
                      value={event.venue}
                      onChange={(v) => updateField(['events', i, 'venue'], v)}
                    />
                  </div>
                  <Field
                    label="Địa chỉ đầy đủ"
                    value={event.address}
                    onChange={(v) => updateField(['events', i, 'address'], v)}
                  />
                  <Field
                    label="Từ khoá tìm trên Google Maps"
                    value={event.mapQuery}
                    onChange={(v) => updateField(['events', i, 'mapQuery'], v)}
                  />
                </RepeatableItem>
              ))}
              <AddButton
                label="Thêm buổi lễ"
                onClick={() =>
                  addItem(['events'], {
                    label: '',
                    date: '',
                    time: '',
                    venue: '',
                    address: '',
                    mapQuery: '',
                  })
                }
              />
            </div>
          </SectionCard>

          <SectionCard title="Trang phục (Dress code)">
            <TextareaField
              label="Ghi chú"
              value={config.dressCode.note}
              onChange={(v) => updateField(['dressCode', 'note'], v)}
              rows={2}
            />
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">Tông màu</p>
              <div className="flex flex-wrap items-center gap-3">
                {config.dressCode.colors.map((color, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => updateField(['dressCode', 'colors', i], e.target.value)}
                      className="h-9 w-9 cursor-pointer rounded border border-gold-200 bg-transparent p-0.5"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(['dressCode', 'colors'], i)}
                      className="text-xs text-wine-600/70 hover:text-wine-700"
                    >
                      Xoá
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addItem(['dressCode', 'colors'], '#7a1122')}
                  className="rounded-full border border-dashed border-gold-300 px-3 py-1.5 text-xs font-medium text-wine-700 hover:bg-gold-100/60"
                >
                  + Thêm màu
                </button>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Thư viện ảnh"
            description="Dán link ảnh đã có sẵn (khuyên dùng), hoặc tải ảnh trực tiếp từ máy. Điền 'Album' để nhóm ảnh theo buổi lễ."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {config.gallery.map((photo, i) => (
                <RepeatableItem key={i} onRemove={() => removeItem(['gallery'], i)}>
                  <ImageField
                    label="Đường dẫn ảnh (URL hoặc /gallery/...)"
                    value={photo.src}
                    onChange={(v) => updateField(['gallery', i, 'src'], v)}
                    placeholder="https://... hoặc /gallery/photo-1.jpg"
                  />
                  <Field
                    label="Mô tả ảnh"
                    value={photo.alt}
                    onChange={(v) => updateField(['gallery', i, 'alt'], v)}
                    placeholder="Ảnh cưới ngoại cảnh"
                  />
                  <Field
                    label="Album (VD: Ăn hỏi, Lễ cưới, Prewedding)"
                    value={photo.category}
                    onChange={(v) => updateField(['gallery', i, 'category'], v)}
                  />
                </RepeatableItem>
              ))}
            </div>
            <AddButton
              label="Thêm ảnh"
              onClick={() => addItem(['gallery'], { src: '', alt: '', category: '' })}
            />
          </SectionCard>

          <SectionCard
            title="Nhạc nền"
            description="Đặt file nhạc trong public/music rồi điền đường dẫn dạng /music/ten-file.mp3, hoặc dán link nhạc đã host sẵn."
          >
            <div className="space-y-3">
              {config.musicTracks.map((track, i) => (
                <RepeatableItem key={track.id ?? i} onRemove={() => removeItem(['musicTracks'], i)}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Tên bài hát"
                      value={track.title}
                      onChange={(v) => updateField(['musicTracks', i, 'title'], v)}
                    />
                    <Field
                      label="Đường dẫn file (/music/... hoặc URL)"
                      value={track.src}
                      onChange={(v) => updateField(['musicTracks', i, 'src'], v)}
                    />
                  </div>
                </RepeatableItem>
              ))}
              <AddButton
                label="Thêm bài nhạc"
                onClick={() =>
                  addItem(['musicTracks'], { id: `track-${Date.now()}`, title: '', src: '' })
                }
              />
            </div>
          </SectionCard>

          <SectionCard
            title="Mừng cưới (QR chuyển khoản)"
            description="Mã QR được tạo tự động qua VietQR — khách quét là ra đúng số tài khoản, không cần đặt hàng in ấn."
          >
            <Field
              label="Lời nhắn mặc định khi chuyển khoản"
              value={config.giftMessage}
              onChange={(v) => updateField(['giftMessage'], v)}
            />
            <div className="space-y-3">
              {config.bankAccounts.map((account, i) => (
                <RepeatableItem key={account.id ?? i} onRemove={() => removeItem(['bankAccounts'], i)}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Bên (VD: Nhà Trai / Nhà Gái)"
                      value={account.owner}
                      onChange={(v) => updateField(['bankAccounts', i, 'owner'], v)}
                    />
                    <BankSelectField
                      bankBin={account.bankBin}
                      onChange={({ bankBin, bankName }) => {
                        updateField(['bankAccounts', i, 'bankBin'], bankBin)
                        updateField(['bankAccounts', i, 'bankName'], bankName)
                      }}
                    />
                    <Field
                      label="Số tài khoản"
                      value={account.accountNumber}
                      onChange={(v) => updateField(['bankAccounts', i, 'accountNumber'], v)}
                    />
                    <Field
                      label="Tên chủ tài khoản (không dấu, IN HOA)"
                      value={account.accountName}
                      onChange={(v) => updateField(['bankAccounts', i, 'accountName'], v)}
                    />
                  </div>
                </RepeatableItem>
              ))}
              <AddButton
                label="Thêm tài khoản"
                onClick={() =>
                  addItem(['bankAccounts'], {
                    id: `bank-${Date.now()}`,
                    owner: '',
                    bankName: '',
                    bankBin: '',
                    accountNumber: '',
                    accountName: '',
                  })
                }
              />
            </div>
          </SectionCard>
        </div>

        <div className="mt-10 rounded-2xl border border-gold-300 bg-wine-800 p-6 text-center text-gold-100">
          <p className="font-display text-lg">Hoàn tất tuỳ chỉnh?</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-gold-200/80">
            Tải file cấu hình để thay vào mã nguồn và triển khai bản chính thức cho khách mời xem.
          </p>
          <button
            type="button"
            onClick={handleExport}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold-400 px-6 py-2.5 text-sm font-medium text-wine-900 transition hover:bg-gold-300"
          >
            <Download size={16} />
            Tải file cấu hình (weddingConfig.js)
          </button>
        </div>
      </div>
    </div>
  )
}
