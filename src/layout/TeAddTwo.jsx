import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import React from "react";
import Tenichend from "../layout/tenichend" ;

export default function TeAddTwo() {
  const [input, setInput] = useState({
    ///////////
    name : "",
    phone : "",
    skill: "",

  });
  console.log(input);
  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      const output = { ...input};
      const token = localStorage.getItem("token");

           const rs3 = await axios.post("http://localhost:8889/repair/te", output, {
           headers: { Authorization: `Bearer ${token}` },
           });

      console.log(rs3)
      Swal.fire({
        icon: "success",
        title: "สำเร็จ!",
        text: "คุณได้ทำการแจ้งซ่อมเรียบร้อยแล้ว",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "ข้อผิดพลาด!",
        text: err.message,
      });
    }
  };


  return (
    <>
       <div className="flex">
        <div className="w-1/3">
          <Tenichend/>
        </div>
        <div className="mr-20">
          <form
            className="max-w-md mx-auto p-8 bg-gray-100 rounded-lg shadow-lg mt-28 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl"
            onSubmit={hdlSubmit}
          >
            {/* repairUser */}
            <p className="size-100">รายละเอียดผู้แจ้ง</p>
            <div className="flex">
              <div className="mr-2">
                <label className="label-text mb-2 mt-4 mr-2">ชื่อ :</label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="name"
                  value={input.name}
                  onChange={hdlChange}
                  placeholder="กรุณาระบุชื่อของคุณ"
                />
              </div>

              <div className="mr-2">
                <label className="label-text mb-2 mt-4 mr-2">นามสกุล :</label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="phone"
                  value={input.phone}
                  onChange={hdlChange}
                  placeholder="กรุณาระบุนามสกุล"
                />
              </div>

              <div className="mr-2">
                <label className="label-text mb-2 mt-4 mr-2">
                  เบอร์โทรศัพท์ :
                </label>
                <input
                  type="text"
                  name="skill"
                  value={input.skill}
                  onChange={hdlChange}
                  className="input input-bordered"
                  placeholder="กรุณาระบุเบอร์โทร"
                />
              </div>
            </div>
            <hr className="mt-5 "></hr>
            {/*  */}
            <div className="mt-3">
              <button className="btn btn-outline btn-info"> แจ้งซ่อม </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

{
  /* <>
<div>
  <UserHome/>
  <form
    className="flex flex-col  mr-64  max-w-md mx-auto p-2 space-y-4 bg-gray-100 rounded-lg shadow-lg"
    onSubmit={hdlSubmit}
    style={{ marginTop: "-580px" }}
  >
    <h2 className="text-2xl font-bold text-center">แบบฟอร์มแจ้งซ่อม</h2>
    <div>
      <label className="block">
        <span className="text-gray-700">วันที่แจ้งซ่อม</span>
        <input
          type="text"
          placeholder="อุปกรณ์ที่แจ้งซ่อม"
          // type="datetime-local"
          name="type"
          value={input.type}
          onChange={hdlChange}
          className="mt-1 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </label>
    </div>
    <div>
      <label className="block">
        <span className="text-gray-700">อุปกรณ์</span>
        <input
          type="text"
          placeholder="อุปกรณ์ที่แจ้งซ่อม"
          name="brand"
          value={input.brand}
          onChange={hdlChange}
          className="mt-1 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </label>
    </div>
    <div>
      <label className="block">
        <span className="text-gray-700">รายละเอียด</span>
        <input
          type="text"
          placeholder="รายละเอียด"
          name="Detail"
          value={input.Detail}
          onChange={hdlChange}
          className="mt-1 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </label>
    </div>
    <div>
      <label className="block">
        <span className="text-gray-700">รายละเอียด</span>
        <input
          type="text"
          placeholder="รายละเอียด"
          name="serialnumber"
          value={input.serialnumber}
          onChange={hdlChange}
          className="mt-1 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </label>
    </div>
    <button
      type="submit"
      className="inline-block w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:bg-blue-700"
    >
      แจ้งซ่อม
    </button>
  </form>
</div>
</> */
}
