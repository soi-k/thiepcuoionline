// Toàn bộ nội dung thiệp — chỉ cần sửa các giá trị bên dưới để thay bằng thông tin thật.
export const wedding = {
  groom: {
    fullName: 'Hoàng Anh',
    shortName: 'Hoàng Anh',
    parents: 'Bà Vũ Thị Sinh',
    avatar: '/gallery/groom-avatar.svg',
  },
  bride: {
    fullName: 'Phương Anh',
    shortName: 'Phương Anh',
    parents: 'Ông Nguyễn Xuân Thành & Bà Nguyễn Thị Hợi',
    avatar: '/gallery/bride-avatar.svg',
  },

  // ISO datetime dùng để đếm ngược
  weddingDate: '2026-10-25T10:30:00+07:00',

  hero: {
    heading: 'Lễ Thành Hôn',
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
      label: 'Lễ Thành Hôn',
      date: 'Chủ Nhật, 25/10/2026',
      time: '10:30',
      venue: 'Gia đình nhà trai',
      address: 'Khu Vạn Ninh, Xã Lê Quý Đôn, Tỉnh Hưng Yên',
      mapQuery: 'Khu Vạn Ninh, Xã Lê Quý Đôn, Hưng Yên',
    },
  ],

  dressCode: {
    note: 'Trân trọng kính mời quý khách chọn trang phục lịch sự, ưu tiên các tông màu chủ đạo:',
    colors: ['#7a1122', '#d9b567', '#fdf7ea'],
  },

  // Ảnh cưới thật của Hoàng Anh & Phương Anh
  // category dùng để nhóm ảnh theo album (Ăn hỏi / Lễ cưới / Prewedding / Kỷ niệm...)
  gallery: [
    { src: '/gallery/anhoi-1.jpg', alt: 'Ảnh áo dài', category: 'Ăn hỏi' },
    { src: '/gallery/prewedding-1.jpg', alt: 'Ảnh cưới 1', category: 'Prewedding' },
    { src: '/gallery/prewedding-2.jpg', alt: 'Ảnh cưới 2', category: 'Prewedding' },
    { src: '/gallery/prewedding-3.jpg', alt: 'Ảnh cưới 3', category: 'Prewedding' },
    { src: '/gallery/prewedding-4.jpg', alt: 'Ảnh cưới 4', category: 'Prewedding' },
  ],

  musicTracks: [{ id: 'i-do', title: 'Em Đồng Ý (I Do)', src: '/music/i-do.mp3' }],

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
