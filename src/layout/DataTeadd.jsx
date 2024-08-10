import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import TeHome from "./TeHome";

export default function DataTeadd() {
  const initialInputState = {
    usernamedata: "",
    surname: "",
    phone: "",
    appointment: "",
  };

  const [input, setInput] = useState(initialInputState);

  const hdlChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();

      // Validate required fields before submission
      if (
        !input.usernamedata ||
        !input.surname ||
        !input.phone 
      ) {
        Swal.fire({
          icon: "error",
          title: "ข้อผิดพลาด!",
          text: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
        });
        return;
      }

      const output = { ...input, requesDate: new Date(input.requesDate) };
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:8889/repair/user", output, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      Swal.fire({
        icon: "success",
        title: "สำเร็จ!",
        text: "คุณได้ทำการแจ้งซ่อมเรียบร้อยแล้ว",
      });

      setInput(initialInputState);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "ข้อผิดพลาด!",
        text: err.message,
      });
    }
  };

  return (
    <div className="flex">
      <div className="w-1/3">
        <TeHome />
      </div>
      <div className="mr-20">
        <form
          className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-lg mt-20 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl"
          onSubmit={hdlSubmit}
        >
          {/* Section: รายละเอียดผู้แจ้ง */}
          <p className="mb-2 text-lg font-semibold">แบบฟอร์มกรอกข้อมูล</p>
          <div className="flex mb-4">
            <div className="w-full mr-4">
              <label className="label-text">ชื่อ :</label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="usernamedata"
                value={input.usernamedata}
                onChange={hdlChange}
                placeholder="กรุณาระบุชื่อของคุณ"
              />
            </div>
            <div className="w-full mr-4">
              <label className="label-text">นามสกุล :</label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="surname"
                value={input.surname}
                onChange={hdlChange}
                placeholder="กรุณาระบุนามสกุล"
              />
            </div>
            <div className="w-full">
              <label className="label-text">เบอร์โทรศัพท์ :</label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="phone"
                value={input.phone}
                onChange={hdlChange}
                placeholder="กรุณาระบุเบอร์โทร"
              />
            </div>
            <div className="w-full  mx-4">
              <label className="label-text">แผนก:</label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="appointment"
                value={input.appointment}
                onChange={hdlChange}
                disabled // เพิ่ม attribute disabled เพื่อปิดการเลือก
              >
                <option value="ช่าง">ช่าง</option> 
                เพื่อเป็นค่าเดียว
              </select>
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-outline btn-info">
              ยีนยันการเพิ่มข้อมูล
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
