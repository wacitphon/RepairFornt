import { useState, useContext } from "react";
import React from "react";
import RepairContext from "../contexts/RepairContext";
import ModalEdit from "../components/ModalEdit";
import ModalAdd from "../components/ModalAdd";
import Adminhome from "./Adminhome";

export default function TableAd() {
  const { adminData } = useContext(RepairContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState(null);
  const todosPerPage = 2;

  const getStatusButtonColor = (status) => {
    switch (status) {
      case "แจ้งซ่อม":
        return "bg-blue-500";
      case "กำลังดำเนินการ":
        return "bg-orange-500";
      case "ซ่อมไม่ได้":
        return "bg-red-500";
      case "รอเบิกอะไหร่":
        return "bg-yellow-500";
      case "เสร็จสิ้น":
        return "bg-green-700";
      default:
        return "bg-gray-200";
    }
  };

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handleStatusClick = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  if (!adminData) {
    return null;
  }

  const filteredData = filterStatus
    ? adminData.filter((el) => el.status === filterStatus)
    : adminData;

  const renderTodos =
    filteredData.length > 0
      ? filteredData
          .slice((currentPage - 1) * todosPerPage, currentPage * todosPerPage)
          .map((el) => (
            <tr key={el.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2 text-center">
                {new Date(el.requesDate).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2 text-center">
                {new Date(el.requesDate).toLocaleTimeString()}
              </td>
              <td className="border px-4 py-2 text-center">
                {el?.user.username}
              </td>
              <td className="border px-4 py-2 text-center">
                {el?.userdata.usernamedata}
              </td>
              <td className="border px-4 py-2 text-center">
                {el?.device.type}
              </td>
              <td className="border px-4 py-2 text-center">{el?.buding}</td>
              <td className="border px-4 py-2 text-center">{el?.room}</td>
              <td className="border px-4 py-2 text-center">
                {el?.detailrepair}
              </td>
              <td className="border px-4 py-2 text-center">
                <span
                  className={`font-semibold ${getStatusButtonColor(
                    el.status
                  )} text-white px-2 py-1 rounded`}
                >
                  {el.status}
                </span>
              </td>
              <td className="border px-4 py-2 text-center">{el?.DatailEdit}</td>
              <td className="border px-4 py-2 text-center">{el?.TeEdit}</td>
              <td className="border px-4 py-2 text-center">
                {el?.tecdnicianRepair}
              </td>
            </tr>
          ))
      : null;

  const pageNumbers = Array.isArray(filteredData)
    ? Array.from(
        { length: Math.ceil(filteredData.length / todosPerPage) },
        (_, i) => i + 1
      )
    : [];

  const statusCounts = adminData.reduce((acc, el) => {
    acc[el.status] = (acc[el.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex flex-col md:flex-row">
      <Adminhome />
      <div className="flex flex-col items-center gap-4 p-4 w-full">
        <h1 className="text-3xl font-bold mt-14 mb-4">รายการแจ้งซ่อมทั้งหมด</h1>
        <ModalEdit />
        <ModalAdd />

        <div className="flex gap-4 mb-4">
          {Object.keys(statusCounts).map((status) => (
            <button
              key={status}
              className={`px-4 py-2 rounded text-white ${getStatusButtonColor(
                status
              )} ${filterStatus === status ? "" : "hover:bg-gray-300"}`}
              onClick={() => handleStatusClick(status)}
            >
              {status} ({statusCounts[status]})
            </button>
          ))}
          {filterStatus && (
            <button
              className="px-4 py-2 rounded bg-gray-500 text-white"
              onClick={() => handleStatusClick(null)}
            >
              ยกเลิกแสดงรายการ
            </button>
          )}
        </div>

        <div className="relative overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left text-gray-500 bg-white">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr className="text-center">
                <th className="px-4 py-2 border-b">วันที่แจ้ง</th>
                <th className="px-4 py-2 border-b">เวลาที่แจ้ง</th>
                <th className="px-4 py-2 border-b">รหัสพนักงาน</th>
                <th className="px-4 py-2 border-b">ชื่อผู้แจ้งซ่อม</th>
                <th className="px-4 py-2 border-b">ชื่ออุปกรณ์</th>
                <th className="px-4 py-2 border-b">สถานที่ที่แจ้ง</th>
                <th className="px-4 py-2 border-b">ชั้น/ห้อง</th>
                <th className="px-4 py-2 border-b">อาการ</th>
                <th className="px-4 py-2 border-b">สถานะ</th>
                <th className="px-4 py-2 border-b">รายละเอียดการซ่อม</th>
                <th className="px-4 py-2 border-b">รายละเอียดการซ่อม</th>
                <th className="px-4 py-2 border-b">ผู้ดำเนินการ</th>
              </tr>
            </thead>
            <tbody className="text-center">{renderTodos}</tbody>
          </table>
        </div>

        <ul className="flex justify-center mt-4 space-x-2">
          {pageNumbers.map((number) => (
            <li
              key={number}
              id={number}
              className={`px-4 py-2 cursor-pointer rounded ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } transition-colors`}
              onClick={handleClick}
            >
              {number}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
