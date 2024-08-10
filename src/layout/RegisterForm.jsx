import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import AdminHome from "./Adminhome";

export default function RegisterForm() {
  const [input, setInput] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const hdlChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:8889/auth/register",
        input
      );
      console.log(response);
      Swal.fire({
        title: "เพิ่มผู้ใช้ในระบบสำเร็จ!",
        text: "เพิ่มผู้ใช้ในระบบแล้ว",
        icon: "success",
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="flex  items-center min-h-screen bg-gray-100">
        <AdminHome />
        <form
          className="border rounded-lg p-8 bg-white shadow-lg max-w-sm w-full mx-auto"
          onSubmit={hdlSubmit}
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            เพิ่มผู้ใช้งาน
          </h2>
          <div className="mb-4 relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="กำหนดรหัสผนักงานในการเข้าระบบ"
              name="username"
              value={input.username}
              onChange={hdlChange}
              className="pl-10 input input-bordered w-full h-10 px-3 rounded-md"
            />
          </div>

          <div className="mb-4 relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="รหัสผ่าน"
              name="password"
              value={input.password}
              onChange={hdlChange}
              className="pl-10 input input-bordered w-full h-10 px-3 rounded-md"
            />
          </div>

          <div className="mb-4 relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="ยืนยันรหัสผ่าน"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={hdlChange}
              className="pl-10 input input-bordered w-full h-10 px-3 rounded-md"
            />
          </div>

          <div className="text-center text-gray-600 text-sm mb-4">
            กำหนดชื่อผู้ใช้และรหัสผ่าน .
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            เพิ่มผู้ใช้ในระบบ
          </button>
        </form>
      </div>
    </>
  );
}
