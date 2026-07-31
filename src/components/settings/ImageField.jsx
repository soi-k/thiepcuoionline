import { useRef } from 'react'
import { ImagePlus } from 'lucide-react'
import { resizeImageFile } from '../../lib/imageUpload.js'
import { assetUrl } from '../../lib/assetUrl.js'
import { Field } from './Field.jsx'

export default function ImageField({ label, value, onChange, placeholder, aspect = 'aspect-[4/5]' }) {
  const fileInputRef = useRef(null)

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const dataUrl = await resizeImageFile(file)
    onChange(dataUrl)
    e.target.value = ''
  }

  return (
    <div className="flex gap-3">
      <div className={`w-20 shrink-0 overflow-hidden rounded-lg border border-gold-200 bg-cream-100 ${aspect}`}>
        {value && <img src={assetUrl(value)} alt="" className="h-full w-full object-cover" />}
      </div>
      <div className="flex-1 space-y-2">
        <Field label={label} value={value} onChange={onChange} placeholder={placeholder} />
        <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFile} />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-wine-700 hover:underline"
        >
          <ImagePlus size={13} />
          Tải ảnh lên từ máy
        </button>
      </div>
    </div>
  )
}
