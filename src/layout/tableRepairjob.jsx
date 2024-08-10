import React, { useState, useContext } from "react";
import axios from "axios";
import RepairContext from "../contexts/RepairContext";
import ModalEdit from "../components/ModalEdit";
import ModalAdd from "../components/ModalAdd";
import TeHome from "./TeHome";
import Swal from "sweetalert2";

export default function TableRepairJob() {
  const { adminData } = useContext(RepairContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("แจ้งซ่อม");
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const todosPerPage = 5;

  const openModal = (modalId) => {
    document.getElementById(modalId).showModal();
  };

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handleItemClick = async (item) => {
    console.log(item);
    try {
      const token = localStorage.getItem("token");
      // Example POST request
      const response = await axios.post(
        "http://localhost:8889/repair/teRecord",
        { id: item.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Success:", response.data);

      const response2 = await axios.put(
        `http://localhost:8889/repair/${item.id}`,
        {
          status: "กำลังดำเนินการ",
          EditRepairDate: new Date(),
          DatailEdit: "กำลังดำเนินการแก้ไข",
          TeEdit: "ช่างรับงานแล้ว",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Success:", response2.data);

      Swal.fire({
        icon: "success",
        title: "การยืนยันเสร็จสิ้น!",
        text: "ข้อมูลได้รับการอัปเดตเรียบร้อยแล้ว",
      }).then(() => {
        // Reload the page
        window.location.reload();
      });
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle error appropriately
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถทำรายการได้ในขณะนี้ โปรดลองใหม่อีกครั้ง",
      });
    }
  };

  const renderTodos = () =>
    (isFiltered ? filteredData : adminData)
      .slice((currentPage - 1) * todosPerPage, currentPage * todosPerPage)
      .map((el) => (
        <tr key={el.id}>
          <td className="border px-5 py-2 text-center">
            {new Date(el.requesDate).toLocaleDateString()}
          </td>
          <td className="border px-5 py-2 text-center">
            {new Date(el.requesDate).toLocaleTimeString()}
          </td>
          <td className="border px-4 py-2 text-center">{el?.user.username}</td>
          <td className="border px-4 py-2 text-center">
            {el?.userdata.usernamedata}
          </td>
          <td className="border px-4 py-2 text-center">{el?.device.type}</td>
          <td className="border px-4 py-2 text-center">{el?.buding}</td>
          <td className="border px-4 py-2 text-center">{el?.room}</td>
          <td className="border px-4 py-2 text-center">{el?.detailrepair}</td>
          <td className="border px-4 py-2 text-center">
            <span
              className={`font-semibold ${
                el.status === "แจ้งซ่อม"
                  ? "text-blue-700"
                  : el.status === "กำลังดำเนินการ"
                  ? "text-orange-700"
                  : el.status === "ซ่อมไม่ได้"
                  ? "text-red-700"
                  : el.status === "รอเบิกอะไหร่"
                  ? "text-yellow-500"
                  : el.status === "สำเร็จ"
                  ? "text-green-700"
                  : "text-lime-700"
              }`}
            >
              {el.status}
            </span>
          </td>
          <td className="border px-4 py-2 text-center">
            <button
              className="btn text-white bg-blue-700 px-4 py-2 rounded-md"
              onClick={() => handleItemClick(el)}
              disabled={
                el.status === "กำลังดำเนินการ" ||
                el.status === "เสร็จสิ้น" ||
                el.status === "รอเบิกอะไหร่" ||
                el.status === "ซ่อมไม่ได้"
              }
            >
              ยืนยัน
            </button>
          </td>
        </tr>
      ));

  const pageNumbers = Array.isArray(adminData)
    ? Array.from({ length: Math.ceil(adminData.length / todosPerPage) }, (_, i) => i + 1)
    : [];

  const countRepairStatus = () =>
    Array.isArray(adminData) ? adminData.filter((el) => el.status === "แจ้งซ่อม").length : 0;

  const handleFilterByStatus = () => {
    const filteredData = adminData.filter((el) => el.status === "แจ้งซ่อม");
    setFilteredData(filteredData);
    setIsFiltered(true);
  };

  const clearFilter = () => {
    setStatusFilter("แจ้งซ่อม");
    setFilteredData([]);
    setIsFiltered(false);
  };

  return (
    <div className="flex">
      <TeHome />
      {/* Main Content */}
      <div className="flex flex-col items-center gap-4 w-full">
        {/* Header */}
        <div className="bg-primary mt-20 p-4 w-full flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4">รายการที่แจ้งซ่อม</h1>
          <div className="flex justify-center items-center">
            <button
              className="btn bg-blue-700 text-white px-4 py-2 rounded-md"
              onClick={handleFilterByStatus}
            >
              แสดงรายการที่แจ้งซ่อม ({countRepairStatus()})
            </button>
            {/* Clear Filter Button */}
            <button
              className="btn bg-white  px-4 py-2 rounded-md ml-4"
              onClick={clearFilter}
            >
              ยกเลิกแสดงรายการ
            </button>
            {/* Pagination */}
            <ul className="flex  mx-10">
              {pageNumbers.map((number) => (
                <li
                  key={number}
                  id={number}
                  className={`px-4 py-2 cursor-pointer rounded-md ${
                    currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={handleClick}
                >
                  {number}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ModalEdit />
        <ModalAdd />
        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">วันที่แจ้ง</th>
                <th className="px-6 py-3 text-left">เวลาที่แจ้ง</th>
                <th className="px-6 py-3">ชื่อในระบบ</th>
                <th className="px-6 py-3">ชื่อผู้แจ้งซ่อม</th>
                <th className="px-6 py-3">ชื่ออุปกรณ์</th>
                <th className="px-6 py-3">สถานที่</th>
                <th className="px-6 py-3">ชั้น/ห้อง</th>
                <th className="px-6 py-3">อาการ</th>
                <th className="px-6 py-3">สถานะ</th>
                <th className="px-6 py-3">รับการแจ้งซ่อม</th>
              </tr>
            </thead>
            <tbody>{renderTodos()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}