import axios from "axios";
import { useState } from "react";
import React from "react";
import Adminhome from "./Adminhome";

export default function TeAdd() {
  const [input, setInput] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "TECNICIANC",
  });
  console.log(input);
  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      // validation
      if (input.password !== input.confirmPassword) {
        return alert("Please check confirm password");
      }
      const rs = await axios.post(
        "http://localhost:8889/auth/registerte",
        input
      );
      console.log(rs);
      if (rs.status === 200) {
        alert("Register Successful");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="w-1/3">
          <Adminhome />
        </div>
        <div className="mr-20">
          <form
            className="max-w-md mx-auto p-8 bg-gray-100 rounded-lg shadow-lg mt-28 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl"
            onSubmit={hdlSubmit}
          >
            {/* repairUser */}
            <h2 className="text-2xl font-bold mb-4">แบบฟอร์มเพิ่มช่าง</h2>
            <div className="flex">
              <div className="mr-2">
                <label className="label-text mb-2 mt-4 mr-2">
                  ชื่อในการเข้าระบบของช่าง
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="username"
                  value={input.username}
                  onChange={hdlChange}
                  placeholder="กรุณากรอกข้อมูล"
                />
              </div>

              <div className="mr-2">
                <label className="label-text mb-2 mt-4 mr-2">รหัสผ่านที่ใช้เข้าระบบ :</label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="password"
                  value={input.password}
                  onChange={hdlChange}
                  placeholder="กรุณาระบุระหัสผ่าน"
                />
              </div>

              <div className="mr-2">
                <label className="label-text mb-2 mt-4 mr-2">
                  ยืนยันระหัสผ่าน:
                </label>
                <input
                  type="text"
                  name="confirmPassword"
                  value={input.confirmPassword}
                  onChange={hdlChange}
                  className="input input-bordered"
                  placeholder="ยืนยันรหัสผ่าน"
                />
              </div>
            </div>

            <div className="flex mt-10">
              <div className="mr-2">
                <label className="label-text mb-2 mt-4 mr-2">
                  ระดับผู้ใช้งาน:
                </label>
                <input
                  type="text"
                  name="appointment"
                  value={input.role}
                  onChange={hdlChange}
                  className="input input-bordered"
                  placeholder="ตำแหน่ง"
                />
              </div>
            </div>
          
            <hr className="mt-5 "></hr>
            {/* datate */}
            <button
              type="submit"
              className="btn btn-info w-full rounded-md py-2 px-4 bg-sky-400 text-white font-semibold shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 mt-4  "
            >
              เพิ่มช่างในระบบ
            </button>
          </form>
        </div>
      </div>
    </>
  );
}


