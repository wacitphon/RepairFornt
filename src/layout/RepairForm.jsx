import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import UserHome from "./UserHome";

export default function RepairForm() {
  const initialInputState = {
    usernamedata: "",
    surname: "",
    phone: "",
    appointment: "",
    requesDate: new Date().toISOString().split("T")[0], // Format for date input
    detailrepair: "",
    status: "แจ้งซ่อม",
    statusUser: "แจ้งซ่อมด้วยตัวเอง",
    finishrepair: "ไม่ทราบ",
    Equipmentnumber: "",
    other: "",
    buding: "",
    room: "",
    type: "",
    brand: "",
    EditRepairDate: new Date(),
    DatailEdit: "รอช่างตรวจสอบ",
    tecdnicianc: "ยังไม่มีช่างรับงาน",
    TeEdit: "ยังไม่มีช่างรับงาน",
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
        !input.phone ||
        !input.requesDate ||
        !input.detailrepair ||
        !input.type ||
        !input.Equipmentnumber
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

      await axios.post("http://localhost:8889/repair/device", output, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await axios.post("http://localhost:8889/repair/repaircre", output, {
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
        <UserHome />
      </div>
      <div className="mr-20">
        <form
          className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-lg mt-20 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl"
          onSubmit={hdlSubmit}
        >
          {/* Section: รายละเอียดอุปกรณ์ที่แจ้งซ่อม */}
          <p className="mb-2 text-lg font-semibold">
            รายละเอียดอุปกรณ์ที่แจ้งซ่อม
          </p>
          <div className="flex mb-4">
            <div className="w-full mr-4">
              <label className="label-text">ประเภทอุปกรณ์ :</label>
              <select
                name="type"
                value={input.type}
                onChange={hdlChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">เลือกประเภทอุปกรณ์ที่ส่งซ่อม</option>
                <option value="Desktop Computer">Desktop Computer</option>
                <option value="Laptop">Laptop</option>
                <option value="อุปกรณ์สำรองไฟ">อุปกรณ์สำรองไฟ</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="w-full">
              <label className="label-text">หมายเลขครุภัณฑ์ : </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="Equipmentnumber"
                value={input.Equipmentnumber}
                onChange={hdlChange}
                placeholder="รายละเอียด"
              />
            </div>
          </div>

          {/* Section: รายละเอียดการแจ้งซ่อม */}
          <p className="mb-2 text-lg font-semibold">รายละเอียดการแจ้งซ่อม</p>
          <div className="flex mb-4">
            <div className="w-full mr-4">
              <label className="label-text">วันที่และเวลาแจ้ง :</label>
              <input
                type="datetime-local"
                name="requesDate"
                value={input.requesDate}
                onChange={hdlChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full mr-4">
              <label className="label-text">สถานที่ที่แจ้ง :</label>
              <select
                name="buding"
                value={input.buding}
                onChange={hdlChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">กรุณาเลือกสถานที่</option>
                <option value="ตึก A">ตึก A</option>
                <option value="ตึก B">ตึก B</option>
                <option value="ตึก C">ตึก C</option>
                {/* เพิ่มตัวเลือกตามสถานที่ที่มีอยู่ */}
              </select>
            </div>
            <div className="w-full mr-4">
              <label className="label-text">ห้อง/ชั้น :</label>
              <select
                name="room"
                value={input.room}
                onChange={hdlChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">กรุณาเลือกห้อง/ชั้น</option>
                <option value="ชั้น 1 / ห้อง 101">ชั้น 1 / ห้อง 101</option>
                <option value="ชั้น 1 / ห้อง 102">ชั้น 1 / ห้อง 102</option>
                <option value="ชั้น 2 / ห้อง 201">ชั้น 2 / ห้อง 201</option>
                {/* เพิ่มตัวเลือกตามห้อง/ชั้นที่มีอยู่ */}
              </select>
            </div>
            <div className="w-full">
              <label className="label-text">อาการที่พบ :</label>
              <input
                type="text"
                name="detailrepair"
                value={input.detailrepair}
                onChange={hdlChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="สาเหตุที่ขัดข้อง"
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div className="mb-4">
            <label className="label-text block">หมายเหตุ :</label>
            <textarea
              className="textarea textarea-bordered h-24 block w-full rounded-md px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="other"
              value={input.other}
              onChange={hdlChange}
              placeholder="รายละเอียดเพิ่มเติม เช่น ความถี่ของปัญหา,ระดับความเร่งด่วน"
            ></textarea>
          </div>
          {/* Submit Button */}
          
          {/* Section: รายละเอียดผู้แจ้ง */}
          <p className="mb-2 text-lg font-semibold">รายละเอียดผู้แจ้ง</p>
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
            <div className="w-full ">
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
            <div className="w-full ml-5">
              <label className="label-text">แผนก:</label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="appointment"
                value={input.appointment}
                onChange={hdlChange}
              >
                <option value="">เลือกแผนก</option>
                <option value="แผนก A">แผนก A</option>
                <option value="แผนก B">แผนก B</option>
                <option value="แผนก C">แผนก C</option>
                {/* เพิ่มตัวเลือกเพิ่มเติมตามต้องการ */}
              </select>
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-outline btn-info">
              แจ้งซ่อม
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
