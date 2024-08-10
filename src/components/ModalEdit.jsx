import React, { useState } from "react";
import axios from "axios";

export default function ModalEdit({ id, initialStatus, setTrigger }) {
  const [input, setInput] = useState({
    status: "", 
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
      const output = { ...input };

      await axios.put(`http://localhost:8889/repair/${id}`, output, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("การอัปเดตข้อมูลเสร็จสมบูรณ์");
      setTrigger((prev) => !prev); // เรียกใช้ฟังก์ชันเพื่อปิดโมดัลหรืออัพเดทข้อมูลเพื่อแสดงผลใหม่
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <button
          className="modal-close mr-auto"
          onClick={() => document.getElementById("my_modal_2").close()}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </button>
        <h3 className="font-bold text-lg text-center mb-5 ">เลือกช่าง</h3>
        <form
          className="flex flex-col min-w-[200px] border rounded w-3/6 mx-auto p-5 gap-6 mb-8"
          onSubmit={handleSubmit}
        >
          <label className="form-control w-full max-w-[220px]">
            <span className="label-text mb-1">รายชื่อช่าง</span>
            <select
              className="select select-bordered w-full"
              name="status"
              value={input.status}
              onChange={handleChange}
            >
              <option value="">เลือกสถานะการซ่อม</option>
              <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
              <option value="เสร็จสิ้น">เสร็จสิ้น</option>
              <option value="ยกเลิก">ยกเลิก</option>
            </select>
          </label>
          <button type="submit" className="btn btn-primary">
            ยืนยัน
          </button>
        </form>
      </div>
    </dialog>
  );
}
