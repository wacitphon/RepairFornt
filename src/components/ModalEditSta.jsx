import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ModalEditSta(props) {
  const { el } = props;

  const [formData, setFormData] = useState({
    DatailEdit: "",
    status: "",
    tecdnicianRepair: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseModal = () => {
    props.closeModal();
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const output = { ...formData };
      await axios.put(`http://localhost:8889/repair/${el.id}`, output, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire({
        icon: "success",
        title: "การยืนยันเสร็จสิ้น!",
        text: "ข้อมูลได้รับการอัปเดตเรียบร้อยแล้ว",
      }).then(() => {
        // Reload the page
        window.location.reload();
      }); // Toggle to trigger re-render of the main list
      handleCloseModal(); // Close the modal after successful submission
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <dialog id="my_modal_0" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h1 className="text-3xl font-bold mb-4">รายละเอียดการแจ้งซ่อม</h1>
        <table className="w-full border border-collapse">
          <tbody>
            <tr className="bg-gray-200">
              <td className="w-1/3 font-bold border border-black border-opacity-100 px-4 py-2">
                วันที่แจ้งซ่อม
              </td>
              <td className="w-2/3 border border-black border-opacity-100 px-4 py-2">
                {new Date(el?.repair.requesDate).toLocaleDateString()}
              </td>
            </tr>
            <tr className="bg-gray-100">
              <td className="font-bold border border-black border-opacity-100 px-4 py-2">
                ชื่อผู้แจ้ง
              </td>
              <td className="border border-black border-opacity-100 px-4 py-2">
                {el?.repair.userdata.usernamedata}
              </td>
            </tr>
            <tr className="bg-gray-200">
              <td className="font-bold border border-black border-opacity-100 px-4 py-2">
                อุปกรณ์ที่แจ้งซ่อม
              </td>
              <td className="border border-black border-opacity-100 px-4 py-2">
                {el?.repair.device.type}
              </td>
            </tr>
            <tr className="bg-gray-100">
              <td className="font-bold border border-black border-opacity-100 px-4 py-2">
                รายละเอียด
              </td>
              <td className="border border-black border-opacity-100 px-4 py-2">
                {el?.repair.detailrepair}
              </td>
            </tr>
            <tr className="bg-gray-100">
              <td className="font-bold border border-black border-opacity-100 px-4 py-2">
                สถานะ
              </td>
              <td className="border border-black border-opacity-100 px-4 py-2">
                {el?.repair.status}
              </td>
            </tr>
            <tr className="bg-gray-100">
              <td className="font-bold border border-black border-opacity-100 px-4 py-2">
                วัที่ดำเนินการ
              </td>
              <td className="border border-black border-opacity-100 px-4 py-2">
                {new Date(el?.repair. EditRepairDate).toLocaleDateString()}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Second Table */}
        <h1 className="text-3xl font-bold mb-4 mt-10">รายละเอียดเพิ่มเติม</h1>
        <form className="w-full max-w-sm mx-auto" onSubmit={handleSubmit}>
          <table className="w-full border border-collapse">
            <tbody>
              <tr className="bg-gray-100">
                <td className="font-bold border border-gray-200 px-4 py-2">
                  รายละเอียดการซ่อม
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <input
                    type="text"
                    name="DatailEdit"
                    className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.DatailEdit}
                    onChange={handleChange}
                    placeholder="รายละเอียดการซ่อม"
                  />
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="font-bold border border-gray-200 px-4 py-2">
                  ผู้ดำเนินกาาร
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <input
                    type="text"
                    name="tecdnicianRepair"
                    className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.tecdnicianRepair}
                    onChange={handleChange}
                    placeholder="ระบุชื่อผู้ดำเนินการ"
                  />
                </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="font-bold border border-gray-200 px-4 py-2">
                  สถานะการซ่อม
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <select
                    className="select select-bordered w-full"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="">เลือกสถานะการซ่อม</option>
                    <option value="เสร็จสิ้น">เสร็จสิ้น</option>
                    <option value="รอเบิกอะไหร่">รอเบิกอะไหร่</option>
                    <option value="ซ่อมไม่ได้">ซ่อมไม่ได้</option>
                    {/* เพิ่มตัวเลือกเพิ่มเติมตามต้องการ */}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleCloseModal}
              type="submit"
              className="btn btn-primary px-4 py-2"
            >
              ยืนยัน
            </button>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </form>
      </div>
    </dialog>
  );
}
