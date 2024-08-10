import useAuth from "../hooks/useAuth";

export default function HomesystemTe() {
  const { user } = useAuth();

  return (
    <div>
      <div
        className="hero min-h-screen "
        style={{ backgroundImage: "url(../image/com01.jpg)" }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Take Care Tech:</h1>
            <h2 className="mb-5 text-2xl font-bold">
                ระบบแจ้งซ่อมอุปกรณ์คอมพิวเตอร์ออนไลน์
            </h2>
            <div>
              <p>ยินดีต้อนรับช่าง</p>
              {user?.id ? user.username : "ผู้เยี่ยมชม"}
            </div>
          </div>
        </div>
      </div>
      <div className="stats shadow"></div>
    </div>
  );
}
