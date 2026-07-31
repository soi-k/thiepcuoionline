# Thiệp Cưới Online

Web thiệp cưới online — React + Vite + Tailwind CSS v4 + Framer Motion.

## Tính năng

- Trang bìa "Mở Thiệp Mời" với hiệu ứng confetti, sau đó vào thiệp chính
- Đếm ngược đến ngày cưới, câu chuyện tình yêu, thông tin lễ cưới (kèm link Google Maps), gallery ảnh
- Cá nhân hoá tên khách mời qua link (`/?to=Tên+Khách`)
- Trang `/tao-thiep`: dán danh sách tên khách (mỗi dòng một tên) → tự tạo link riêng cho từng người, có nút copy
- Chọn nhạc nền, hiệu ứng cánh hoa rơi, chuyển động khi cuộn trang
- Font Playfair Display / Dancing Script / Be Vietnam Pro được tự host trong `public/fonts` (không phụ thuộc CDN ngoài)

## Chỉnh sửa nội dung

Toàn bộ nội dung thiệp (tên cô dâu chú rể, ngày giờ, địa điểm, câu chuyện, timeline, gallery, nhạc nền) nằm trong một file duy nhất:

```
src/lib/weddingConfig.js
```

Ảnh gallery hiện là placeholder SVG (`public/gallery`) — thay bằng ảnh thật (`.jpg`/`.png`) rồi cập nhật đường dẫn trong `weddingConfig.js`.

Nhạc nền hiện là file demo tự sinh (`public/music/*.wav`) — thay bằng file nhạc thật rồi cập nhật `musicTracks` trong `weddingConfig.js`.

## Phát triển

```bash
npm install
npm run dev      # chạy dev server
npm run build    # build production vào dist/
npm run lint     # kiểm tra lint
```
