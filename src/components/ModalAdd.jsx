import React, { useState } from "react";
import axios from "axios";

export default function ModalAdd() {
    const [input, setInput] = useState({
        name: "",
        // เพิ่มฟิลด์อื่น ๆ ตามที่ต้องการ
      });
    
      const handleChange = (e) => {
        setInput((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
    
      const handleSubmit = async (e) => {
        try {
          e.preventDefault();
          const token = localStorage.getItem("token");
          const response = await axios.post(
            "http://localhost:8889/repair/te",
            input,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          alert("การสร้างข้อมูลเสร็จสมบูรณ์");
          // เพิ่มการปิดโมดัลหรืออัพเดทข้อมูลหลังจากสร้างข้อมูลเสร็จสมบูรณ์
        } catch (err) {
          alert(err.message);
        }
      };
    
      return (
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <button
              className="modal-close mr-auto"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              <svg viewBox="0 0 24 " className="w-6 h-6 fill-current  ">
                <path  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              </svg>
            </button>
            <h3 className="font-bold text-lg text-center mb-5  ">รายละเอียดเพิ่มเติมหรืออัพเดทข้อมูลหลังจากแจ้งซ่อม</h3>
            <form
              className="flex flex-col min-w-[200px] border rounded w-3/6 mx-auto p-5 gap-6 mb-8"
              onSubmit={handleSubmit}
            >
          
              {/* เพิ่มฟิลด์อื่น ๆ ตามที่ต้องการ */}
              <label className="form-control w-full max-w-[220px]">
                <span className="label-text mb-1 ">รายละเอียด</span>
                <input
                  type="text"
                  placeholder="สถานะการซ่อม"
                  className="input input-bordered w-full"
                  name="name"
                  value={input.name}
                  onChange={handleChange}
                />
              </label>
              <button type="submit" className="btn btn-primary">
                เพิ่มข้อมูล
              </button>
            </form>
          </div>
          {/* ปุ่มปิดโมดัลอยู่นอกแบบฟอร์ม */}
        </dialog>
      );
}
