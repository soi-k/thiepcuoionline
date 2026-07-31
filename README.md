# Thiệp Cưới Online

Web thiệp cưới online — React + Vite + Tailwind CSS v4 + Framer Motion.

## Tính năng

- Trang bìa "Mở Thiệp Mời" với hiệu ứng confetti, parallax, sau đó vào thiệp chính
- Giới thiệu cô dâu chú rể (ảnh đại diện, phụ huynh), câu chuyện tình yêu dạng timeline có ảnh + video, thông tin lễ cưới kèm bản đồ nhúng và dress code
- Gallery nhiều ảnh chia theo album/tab, lightbox có điều hướng, khách mời có thể tự chia sẻ ảnh vào album
- RSVP xác nhận tham dự cho khách + bảng thống kê, xuất CSV cho chủ thiệp (trang `/tuy-chinh`)
- Sổ lưu bút: khách gửi lời chúc, thả tim
- Mừng cưới: mã QR VietQR tạo tự động theo số tài khoản ngân hàng
- Cá nhân hoá tên khách mời qua link (`/?to=Tên+Khách`)
- Trang `/tao-thiep`: dán danh sách tên khách (mỗi dòng một tên) → tự tạo link riêng cho từng người, có nút copy
- Trang `/tuy-chinh`: chỉnh toàn bộ nội dung thiệp ngay trên web, xem trước trực tiếp, xuất file cấu hình
- Chọn nhạc nền, hiệu ứng cánh hoa/tim/lấp lánh rơi, chữ hiện dần khi cuộn trang
- Font Playfair Display / Dancing Script / Be Vietnam Pro được tự host trong `public/fonts` (không phụ thuộc CDN ngoài)

### Về sổ lưu bút / RSVP / ảnh khách upload

Ba tính năng này hiện lưu dữ liệu bằng `localStorage` (`src/lib/localStore.js`) — mỗi
trình duyệt lưu riêng, **chưa dùng chung được giữa các khách mời thật**. Đây là bản
demo để duyệt giao diện/luồng hoạt động. Để dùng thật cho nhiều khách mời, cần nối
một backend (khuyến nghị Firebase — Firestore cho lời chúc/RSVP, Storage cho ảnh).
Vì code đã tách theo `useCollection` hook, việc thay `localStore` bằng backend thật
không cần sửa lại các component giao diện.

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
