// Toàn bộ nội dung thiệp — chỉ cần sửa các giá trị bên dưới để thay bằng thông tin thật.
export const wedding = {
  groom: {
    fullName: 'Nguyễn Văn A',
    shortName: 'Văn A',
    parents: 'Ông Nguyễn Văn B & Bà Trần Thị C',
    avatar: '/gallery/groom-avatar.svg',
  },
  bride: {
    fullName: 'Trần Thị B',
    shortName: 'Thị B',
    parents: 'Ông Trần Văn D & Bà Lê Thị E',
    avatar: '/gallery/bride-avatar.svg',
  },

  // ISO datetime dùng để đếm ngược
  weddingDate: '2026-12-12T11:00:00+07:00',

  hero: {
    heading: 'Save The Date',
    subheading: 'Chúng tôi sắp kết hôn',
  },

  story:
    'Từ những ngày đầu gặp gỡ đến khoảnh khắc quyết định gắn bó cả cuộc đời, mỗi chặng đường chúng tôi đi qua đều là một câu chuyện đẹp. Giờ đây, chúng tôi muốn cùng nhau viết tiếp chương mới — và rất hạnh phúc khi có sự hiện diện của bạn trong ngày trọng đại này.',

  // Link YouTube/Vimeo video cầu hôn hoặc prewedding (để trống nếu không có)
  storyVideoUrl: '',

  timeline: [
    {
      year: '2019',
      title: 'Gặp gỡ',
      desc: 'Lần đầu gặp nhau trong một buổi chiều mưa Sài Gòn.',
      image: '/gallery/photo-11.svg',
    },
    {
      year: '2021',
      title: 'Hẹn hò',
      desc: 'Bắt đầu hành trình yêu thương và thấu hiểu nhau.',
      image: '/gallery/photo-12.svg',
    },
    {
      year: '2024',
      title: 'Cầu hôn',
      desc: 'Lời cầu hôn bất ngờ dưới ánh hoàng hôn.',
      image: '/gallery/photo-9.svg',
    },
    {
      year: '2026',
      title: 'Về chung một nhà',
      desc: 'Ngày trọng đại chính thức bắt đầu.',
      image: '/gallery/photo-10.svg',
    },
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

  dressCode: {
    note: 'Trân trọng kính mời quý khách chọn trang phục lịch sự, ưu tiên các tông màu chủ đạo:',
    colors: ['#7a1122', '#d9b567', '#fdf7ea'],
  },

  // Placeholder — thay bằng ảnh cưới thật (.jpg/.png) trong public/gallery
  // category dùng để nhóm ảnh theo album (Ăn hỏi / Lễ cưới / Prewedding / Kỷ niệm...)
  gallery: [
    { src: '/gallery/photo-1.svg', alt: 'Ảnh ăn hỏi 1', category: 'Ăn hỏi' },
    { src: '/gallery/photo-2.svg', alt: 'Ảnh ăn hỏi 2', category: 'Ăn hỏi' },
    { src: '/gallery/photo-3.svg', alt: 'Ảnh ăn hỏi 3', category: 'Ăn hỏi' },
    { src: '/gallery/photo-4.svg', alt: 'Ảnh lễ cưới 1', category: 'Lễ cưới' },
    { src: '/gallery/photo-5.svg', alt: 'Ảnh lễ cưới 2', category: 'Lễ cưới' },
    { src: '/gallery/photo-6.svg', alt: 'Ảnh lễ cưới 3', category: 'Lễ cưới' },
    { src: '/gallery/photo-7.svg', alt: 'Ảnh prewedding 1', category: 'Prewedding' },
    { src: '/gallery/photo-8.svg', alt: 'Ảnh prewedding 2', category: 'Prewedding' },
    { src: '/gallery/photo-9.svg', alt: 'Ảnh prewedding 3', category: 'Prewedding' },
    { src: '/gallery/photo-10.svg', alt: 'Ảnh prewedding 4', category: 'Prewedding' },
    { src: '/gallery/photo-11.svg', alt: 'Ảnh kỷ niệm 1', category: 'Kỷ niệm' },
    { src: '/gallery/photo-12.svg', alt: 'Ảnh kỷ niệm 2', category: 'Kỷ niệm' },
  ],

  // File demo tự sinh — thay bằng file mp3/wav nhạc thật của bạn trong public/music
  musicTracks: [
    { id: 'track-1', title: 'Giai điệu 1 (demo)', src: '/music/track-1.wav' },
    { id: 'track-2', title: 'Giai điệu 2 (demo)', src: '/music/track-2.wav' },
    { id: 'track-3', title: 'Giai điệu 3 (demo)', src: '/music/track-3.wav' },
  ],

  defaultGuestGreeting: 'Trân trọng kính mời',

  // Dùng để tạo mã QR mừng cưới (VietQR) — bankBin lấy theo mã BIN chuẩn Napas
  giftMessage: 'Mung cuoi',
  bankAccounts: [
    {
      id: 'nha-trai',
      owner: 'Nhà Trai',
      bankName: 'Vietcombank',
      bankBin: '970436',
      accountNumber: '0123456789',
      accountName: 'NGUYEN VAN B',
    },
    {
      id: 'nha-gai',
      owner: 'Nhà Gái',
      bankName: 'Techcombank',
      bankBin: '970407',
      accountNumber: '9876543210',
      accountName: 'TRAN VAN D',
    },
  ],
}
