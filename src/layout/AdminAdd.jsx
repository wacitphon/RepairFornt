import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import React from "react";
import Adminhome from "./Adminhome";

export default function AdminAdd() {
  const [input, setInput] = useState({
    ///////////
    usernamedata: "",
    surname: "",
    phone: "",
    appointment: "",
    /////////////////
    requesDate : new Date().toISOString().split("T")[0],  //วันที่แจ้งซ่อม
    detailrepair: "",  //รายละเอียดการแจ้งซ่อม
    status: "แจ้งซ่อม", //สถานะการซ่อม
    statusUser: "แจ้งซ่อมด้วยตัวเอง", //ผู้แจ้งซ่อม
    finishrepair: "ไม่ทราบ", //วันที่ซ่อมเสร็จ
    Equipmentnumber : "",
    other : "",
    buding : "",
    room : "" ,
    //////////////////
    type: "",
    brand: "",
    optionnal : "",
    // loginuser : "",
    // userdata : "",
    // device : "",
  });
  console.log(input);
  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      const output = { ...input, requesDate: new Date(input.requesDate) };
      const token = localStorage.getItem("token");

      const rs1 = await axios.post("http://localhost:8889/repair/user", output, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const rs = await axios.post("http://localhost:8889/repair/device", output, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const rs3 = await axios.post("http://localhost:8889/repair/repaircre", output, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(rs)
      console.log(rs1)
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
          <Adminhome/>
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
                  name="usernamedata"
                  value={input.usernamedata}
                  onChange={hdlChange}
                  placeholder="กรุณาระบุชื่อของคุณ"
                />
              </div>

              <div className="mr-2">
                <label className="label-text mb-2 mt-4 mr-2">นามสกุล :</label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="surname"
                  value={input.surname}
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
                  name="phone"
                  value={input.phone}
                  onChange={hdlChange}
                  className="input input-bordered"
                  placeholder="กรุณาระบุเบอร์โทร"
                />
              </div>
            </div>


            <div className="flex mt-10">
              <div className="mr-2">
                <label className="label-text mb-2 mt-4 mr-2">ตำแหน่ง :</label>
                <input
                  type="text"
                  name="appointment"
                  value={input.appointment}
                  onChange={hdlChange}
                  className="input input-bordered"
                  placeholder="ตำแหน่ง"
                />
              </div>
            </div>
            <div className="mt-10">
              <span>ผู้รับแจ้ง :</span>
            </div>

            <hr className="mt-5 "></hr>

            {/* repair device  */}
            <div className="mt-5">
              <span>รายละเอียดอุปกร์ที่แจ้งซ่อม</span>
            </div>
            
            <div className="flex mt-5">
              <div className="mr-2 ">
                <label className="label-text mb-2 mt-4 mr-2">
                  ประเภทอุปกร์ :
                </label>
                <input
                  type="text"
                  name="type"
                  value={input.type}
                  onChange={hdlChange}
                  className="input input-bordered"
                  placeholder="ประเภทอุปกร์ที่ส่งซ่อม"
                />
              </div>
              <div className="mr-2 ">
                <label className="label-text mb-2 mt-4 mr-2">
                  หมายเลขครุภัณฑ์ :
                </label>
                <input
                  type="text"
                  name="Equipmentnumber"
                  value={input.Equipmentnumber}
                  onChange={hdlChange}
                  className="input input-bordered"
                  placeholder="หมายเลขครุภัณฑ์ "
                />
              </div>
              <div className="mr-2">
                <label className="label-text mb-2 mt-4 mr-2">
                  อุปกร์ที่ชำรุด :
                </label>
                <input
                  type="text"
                  name="optionnal"
                  value={input.optionnal}
                  onChange={hdlChange}
                  className="input input-bordered"
                  placeholder="รายละเอียด"
                />
              </div>

              <div>
                <div className="mr-2">
                  <span className="label-text1">รุ่นของอุปกร์</span>
                </div>
                <textarea
                  name="brand"
                  value={input.brand}
                  onChange={hdlChange}
                  className="textarea textarea-bordered h-24"
                  placeholder="รุ่นของอุปกร์"
                ></textarea>
              </div>
            </div>

            <hr className="mt-5 "></hr>

            {/* detail repair */}
            <div className="mt-5">
              <span>รายละเอียดการแจ้งซ่อม</span>
            </div>
            {/*  */}
            <div className="flex mt-10">
              <div className="mr-2">
                <label className="label-text mb-2 mt-4 mr-2">
                  วันที่แจ้ง :
                </label>
                <input
                  type="date"
                  name="requesDate "
                  value={input.requesDate }
                  onChange={hdlChange}
                />
              </div>

              <div>
                <label className="label-text mb-2 mt-4">สถานที่ที่แจ้ง</label>
                <input
                  type= "text"
                  name= "buding"
                  value={input.buding}
                  onChange={hdlChange}
                  className="input input-bordered"
                  placeholder="รหัสของอุปกรณ์"
                />
              </div>

              <div>
                <label className="label-text mb-2 mt-4">ห้อง/ชั้น</label>
                <input
                  type="text"
                  name="room"
                  value={input.room}
                  onChange={hdlChange}
                  className="input input-bordered"
                  placeholder="รหัสของอุปกรณ์"
                />
              </div>
              <div>
                <label className="label-text mb-2 mt-4">อาการที่พบ</label>
                <input
                  type="text"
                  name="detailrepair"
                  value={input.detailrepair}
                  onChange={hdlChange}
                  className="input input-bordered"
                  placeholder="รหัสของอุปกรณ์"
                />
              </div>
            </div>

            <div className="mr-2">
              <div>
                <span className="label-text1">หมายเหตุ :</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24"
                  name="other"
                  value={input.other}
                  onChange={hdlChange}
                  placeholder="other"
              ></textarea>
            </div>
            <p>อาการที่พบเจอเบื่องต้นหรือหมายเหตุเพิ่มเติม</p>

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
