import { Link, useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

const HomeNav = [
  { to: "/home", text: "หน้าหลัก" },
  { to: "/login", text: "เข้าสู่ระบบ" },
];

const userNav = [{ to: "/UserHome", text: "เมนู" }];

const adminNav = [
  { to: "/repairlist", text: "จัดการข้อมูล" },
];

const TeNav = [
  { to: "/rq", text: "รายการที่แจ้งซ่อม" },
  { to: "/homete", text: "หน้าแรก" },
];

export default function Header() {
  const { user, logout } = useAuth();
  const [selectedLink, setSelectedLink] = useState(null); // State เพื่อเก็บลิงก์ที่ถูกเลือก
  const finalNav = user?.id
    ? user.role === "ADMIN"
      ? adminNav
      : user.role === "TECNICIANC"
      ? TeNav
      : userNav
    : HomeNav;

  const navigate = useNavigate();

  const handleLinkClick = (to) => {
    setSelectedLink(to);
  };

  const hdlLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-none">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl  ">
          <div className="avatar-group  rtl:space-x-reverse">
            <div className="">
              {user?.id ? (
                <>
                  {user?.role === "ADMIN" ? (
                    <div>
                      {user.username} ({user.role})
                    </div>
                  ) : (
                     <div> รหัสผู้ใช้งาน {user.username}</div>
                  )}
                </>
              ) : (
                <div class="w-14 h-14 rounded-full overflow-hidden">
                  <img
                    src="image/Take2.png"
                    alt="Logo"
                    class="w-full h-full object-cover rounded-full"
                  ></img>
                </div>
              )}
            </div>
          </div>
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal  px-1">
          {finalNav.map((el) => (
            <li key={el.to}>
              <Link
                to={el.to}
                onClick={() => handleLinkClick(el.to)}
                className={selectedLink === el.to ? "active" : ""}
              >
                {el.text}
              </Link>
            </li>
          ))}
          {user?.id && (
            <div className="tooltip  tooltip-bottom" data-tip="ออกจากระบบ">
              <li>
                <Link to="#" onClick={hdlLogout}>
                  <TbLogout size={20} />
                </Link>
              </li>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
