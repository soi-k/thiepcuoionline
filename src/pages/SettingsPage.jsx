import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Download, Eye, ImagePlus, RotateCcw } from 'lucide-react'
import { useWeddingConfig } from '../hooks/useWeddingConfig.jsx'
import { resizeImageFile } from '../lib/imageUpload.js'
import { configToFileText, downloadTextFile } from '../lib/exportConfig.js'
import { assetUrl } from '../lib/assetUrl.js'
import FloralDivider from '../components/decor/FloralDivider.jsx'
import { Field, TextareaField } from '../components/settings/Field.jsx'
import SectionCard from '../components/settings/SectionCard.jsx'
import RepeatableItem from '../components/settings/RepeatableItem.jsx'
import AddButton from '../components/settings/AddButton.jsx'

function GalleryItemFields({ photo, path, updateField }) {
  const fileInputRef = useRef(null)

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const dataUrl = await resizeImageFile(file)
    updateField([...path, 'src'], dataUrl)
  }

  return (
    <>
      <div className="flex gap-3">
        <div className="aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-lg border border-gold-200 bg-cream-100">
          {photo.src && <img src={assetUrl(photo.src)} alt="" className="h-full w-full object-cover" />}
        </div>
        <div className="flex-1 space-y-3">
          <Field
            label="Đường dẫn ảnh (URL hoặc /gallery/...)"
            value={photo.src}
            onChange={(v) => updateField([...path, 'src'], v)}
            placeholder="https://... hoặc /gallery/photo-1.jpg"
          />
          <Field
            label="Mô tả ảnh"
            value={photo.alt}
            onChange={(v) => updateField([...path, 'alt'], v)}
            placeholder="Ảnh cưới ngoại cảnh"
          />
        </div>
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFile} />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-wine-700 hover:underline"
      >
        <ImagePlus size={13} />
        Tải ảnh lên từ máy
      </button>
    </>
  )
}

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
          <SectionCard title="Cô dâu & Chú rể">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">Chú rể</p>
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

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                Dấu mốc thời gian
              </p>
              {config.timeline.map((item, i) => (
                <RepeatableItem key={i} onRemove={() => removeItem(['timeline'], i)}>
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
                onClick={() => addItem(['timeline'], { year: '', title: '', desc: '' })}
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

          <SectionCard
            title="Thư viện ảnh"
            description="Dán link ảnh đã có sẵn (khuyên dùng), hoặc tải ảnh trực tiếp từ máy — ảnh tải lên sẽ được nén và lưu tạm trên trình duyệt."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {config.gallery.map((photo, i) => (
                <RepeatableItem key={i} onRemove={() => removeItem(['gallery'], i)}>
                  <GalleryItemFields photo={photo} path={['gallery', i]} updateField={updateField} />
                </RepeatableItem>
              ))}
            </div>
            <AddButton
              label="Thêm ảnh"
              onClick={() => addItem(['gallery'], { src: '', alt: '' })}
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
