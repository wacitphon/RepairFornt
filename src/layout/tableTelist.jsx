import axios from "axios";
import { useEffect, useState } from "react";
import { MdFileOpen, MdOutlineCancelPresentation } from "react-icons/md";
import Modalshow from "../components/Modalshow";
import Swal from "sweetalert2";
import React from "react";
import { Link } from "react-router-dom";
import Tenichend  from "./tenichend";

export default function tabletelist() {

  const [todos, setTodos] = useState([]);
  const [showIdx, setShowIdx] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 3 ; // Number of todos per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8889/repair", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTodos(response.data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchData();
  }, []);

  const openModal = (id) => {
    const idx = todos.findIndex((el) => el.id === id);
    setShowIdx(idx);
    document.getElementById("my_modal_5").showModal();
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8889/repair/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      Swal.fire({
        title: "ลบรายการสำเร็จ!",
        text: "ได้ลบรายการของคุณเรียบร้อยแล้ว.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Logic for displaying todos
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const renderTodos = currentTodos.map((el) => (
    <div key={el.id} className="card bg-base-100 w-64 shadow-xl mb-4 flex-shrink-0">
      <div className="card-body">
        <h2 className="card-title">วันที่แจ้ง: {new Date(el.requesDate).toLocaleDateString()}</h2>
        <h2 className="card-title">วันที่แจ้ง: {new Date(el.requesDate).toLocaleTimeString()}</h2>
        <p>อุปกรณ์: {el.equiment}</p>
        <p>รายละเอียด: {el.detailrepair}</p>
        <p className={`font-semibold ${
            el.status === "ส่งซ่อม"
              ? "text-blue-700"
              : el.status === "รอดำเนินการ"
              ? "text-orange-700"
              : el.status === "สำเร็จ"
              ? "text-green-700"
              : "text-lime-700"
          }`}>สถานะการซ่อม: {el.status}</p>
          <p>วันที่ซ่อมเสร็จ: {el.finishrepair}</p>
          <p>สถานะผู้ใช้: {el.status}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={() => openModal(el.id)}>
            <MdFileOpen className="mr-2" /> รายละเอียด
          </button>
          <button className="btn btn-danger" onClick={() => handleDelete(el.id)}>
            <MdOutlineCancelPresentation className="mr-2" /> ยกเลิก
          </button>
        </div>
      </div>
    </div>
  ));

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <li
      key={number}
      onClick={() => setCurrentPage(number)}
      className={`${
        currentPage === number
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      } border border-gray-300 px-4 py-2 cursor-pointer rounded-md`}
    >
      {number}
    </li>
  ));

  return (
    <div className="flex">
      <Tenichend/>
      <div className="flex flex-col items-start gap-8 mt-20 mx-52 w-full">
        <div className="text-xl font-semibold mt-2">ข้อมูลช่าง</div>
        <div className="w-full overflow-x-auto">
          <div className="flex gap-4 py-4 whitespace-nowrap overflow-x-scroll">
            {renderTodos}
          </div>
          <ul id="page-numbers" className="flex gap-2 mt-4">
            {renderPageNumbers}
          </ul>
        </div>
        <Modalshow el={todos[showIdx]} />
      </div>
    </div>
  );
}