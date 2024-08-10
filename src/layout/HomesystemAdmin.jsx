import useAuth from "../hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";

export default function HomesystemAdmin() {
  const { user } = useAuth();
  const [usercount, setUsercount] = useState(null);
  const [admincount, setAdmincount] = useState(null);
  const [tecount, setTecount] = useState(null);
  const [repair, setRepaircount] = useState(null);

  useEffect(() => {
    const count = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }
        const response = await axios.get("http://localhost:8889/repair/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ad = await axios.get("http://localhost:8889/repair/admin", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const te = await axios.get("http://localhost:8889/repair/teindata", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const repair = await axios.get("http://localhost:8889/repair/Allrepair", {
          headers: { Authorization: `Bearer ${token}` },
        });


        setUsercount(response.data.count); 
        setAdmincount(ad.data.countAd); 
        setTecount(te.data.countTe); 
        setRepaircount(repair.data.countre); 
      } catch (error) {
        alert(error);
      }
    };
    count();
  }, []);

  return (
    <div>
      <div className="stats shadow"></div>
      <div
        className="hero min-h-screen "
        style={{ backgroundImage: "url(../image/com01.jpg)" }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="stats shadow ">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">ผู้ใช้</div>
              <div className="stat-value text-primary">{usercount}</div>
              <div className="stat-desc">คน</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">จำนวนผู้ดูแล</div>
              <div className="stat-value text-info">{admincount}</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">รายการแจ้งซ่อมทั้งหมด</div>
              <div className="stat-value text-secondary">{repair}</div>
            </div>

            <div className="stat">
              <div className="stat-value text-1xl">ช่างที่มีในระบบ</div>
              <div className="stat-title text-2xl">{tecount}</div>
              <div className="stat-desc text-secondary text-2xl">คน</div>
            </div>
          </div>
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Take Care Tech:</h1>
            <h2 className="mb-5 text-2xl font-bold">
              ระบบแจ้งซ่อมอุปกรณ์คอมพิวเตอร์ออนไลน์
            </h2>
            <div>
              <p>ยินดีต้อนรับ</p>
              {user?.id ? user.username : "ผู้เยี่ยมชม"}
            </div>        
          </div>
        </div>
      </div>
      
    </div>
  );
}
