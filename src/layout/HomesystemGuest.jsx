import useAuth from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom';

export default function HomesystemGuest() {
  const { user } = useAuth();

  const handleNavButtonClick = (path) => {
    navigate(path);
  };
  const navigate = useNavigate();

  return (
    <div className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/path/to/your/image.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-60"
        />
      </div>
      <div className="relative p-8 bg-white bg-opacity-80 rounded-lg shadow-2xl max-w-lg mx-auto w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-6">
          ระบบแจ้งซ่อมออนไลน์
        </h2>
        <p className="text-center text-gray-700 mb-4">
          ยินดีต้อนรับเข้าสู่ระบบแจ้งซ่อมออนไลน์ของเรา
          ระบบที่ออกแบบมาเพื่อช่วยให้คุณสามารถรายงานปัญหาและติดตามสถานะการซ่อมได้ง่ายดาย
        </p>
        <button
          onClick={() => handleNavButtonClick("/login")}
          className="w-full py-2 px-4  bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out mb-6"
        >
          เริ่มต้นใช้งาน
        </button>
        <div className="text-center text-gray-500 text-sm">
          <p className="mb-2">หมายเหตุ: ยังไม่มีบัญชีโปรดติดต่อผู้ดูแลระบบ</p>
          <p>
            โทร:{" "}
            <a href="tel:1234567890" className="text-blue-600 hover:underline">
              123-456-7890
            </a>
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:contact@example.com"
              className="text-blue-600 hover:underline"
            >
              takecartech01@example.com
            </a>
          </p>
          <p>
            หรือมาที่:{" "}
            <a
              href="https://maps.google.com/?q=123+Example+St,+City,+Country"
              className="text-blue-600 hover:underline"
            >
              {" "}
              อาคาร 5 ชั้น 3 ห้องศูนข้อมูลและสารสนเทศ แผนก IT{" "}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
