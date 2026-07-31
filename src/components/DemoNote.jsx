export default function DemoNote({ className = '' }) {
  return (
    <p className={`text-xs italic opacity-60 ${className}`}>
      * Dữ liệu demo — lưu tạm trên trình duyệt này, chưa dùng chung được giữa các khách mời.
    </p>
  )
}
