// Toàn bộ nội dung thiệp — chỉ cần sửa các giá trị bên dưới để thay bằng thông tin thật.
export const wedding = {
  groom: {
    fullName: 'Nguyễn Văn A',
    shortName: 'Văn A',
    parents: 'Ông Nguyễn Văn B & Bà Trần Thị C',
  },
  bride: {
    fullName: 'Trần Thị B',
    shortName: 'Thị B',
    parents: 'Ông Trần Văn D & Bà Lê Thị E',
  },

  // ISO datetime dùng để đếm ngược
  weddingDate: '2026-12-12T11:00:00+07:00',

  hero: {
    heading: 'Save The Date',
    subheading: 'Chúng tôi sắp kết hôn',
  },

  story:
    'Từ những ngày đầu gặp gỡ đến khoảnh khắc quyết định gắn bó cả cuộc đời, mỗi chặng đường chúng tôi đi qua đều là một câu chuyện đẹp. Giờ đây, chúng tôi muốn cùng nhau viết tiếp chương mới — và rất hạnh phúc khi có sự hiện diện của bạn trong ngày trọng đại này.',

  timeline: [
    { year: '2019', title: 'Gặp gỡ', desc: 'Lần đầu gặp nhau trong một buổi chiều mưa Sài Gòn.' },
    { year: '2021', title: 'Hẹn hò', desc: 'Bắt đầu hành trình yêu thương và thấu hiểu nhau.' },
    { year: '2024', title: 'Cầu hôn', desc: 'Lời cầu hôn bất ngờ dưới ánh hoàng hôn.' },
    { year: '2026', title: 'Về chung một nhà', desc: 'Ngày trọng đại chính thức bắt đầu.' },
  ],

  events: [
    {
      label: 'Lễ Vu Quy',
      date: 'Thứ Bảy, 12/12/2026',
      time: '09:00',
      venue: 'Tư gia nhà gái',
      address: '123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh',
      mapQuery: '123 Đường ABC, Quận 1, TP. Hồ Chí Minh',
    },
    {
      label: 'Lễ Thành Hôn',
      date: 'Thứ Bảy, 12/12/2026',
      time: '11:00',
      venue: 'Trung tâm Tiệc cưới Hoa Hồng',
      address: '456 Đường DEF, Phường UVW, Quận 3, TP. Hồ Chí Minh',
      mapQuery: '456 Đường DEF, Quận 3, TP. Hồ Chí Minh',
    },
  ],

  // Placeholder — thay bằng ảnh cưới thật (.jpg/.png) trong public/gallery
  gallery: [
    { src: '/gallery/photo-1.svg', alt: 'Ảnh cưới 1' },
    { src: '/gallery/photo-2.svg', alt: 'Ảnh cưới 2' },
    { src: '/gallery/photo-3.svg', alt: 'Ảnh cưới 3' },
    { src: '/gallery/photo-4.svg', alt: 'Ảnh cưới 4' },
    { src: '/gallery/photo-5.svg', alt: 'Ảnh cưới 5' },
    { src: '/gallery/photo-6.svg', alt: 'Ảnh cưới 6' },
  ],

  // File demo tự sinh — thay bằng file mp3/wav nhạc thật của bạn trong public/music
  musicTracks: [
    { id: 'track-1', title: 'Giai điệu 1 (demo)', src: '/music/track-1.wav' },
    { id: 'track-2', title: 'Giai điệu 2 (demo)', src: '/music/track-2.wav' },
    { id: 'track-3', title: 'Giai điệu 3 (demo)', src: '/music/track-3.wav' },
  ],

  defaultGuestGreeting: 'Trân trọng kính mời',
}
