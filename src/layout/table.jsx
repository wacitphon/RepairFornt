import axios from "axios";
import { useEffect, useState } from "react";
import { MdFileOpen, MdOutlineCancelPresentation } from "react-icons/md";
import Modalshow from "../components/Modalshow";
import Swal from "sweetalert2";
import React from "react";
import UserHome from "./UserHome";

export default function Table() {
  const [todos, setTodos] = useState([]);
  const [showIdx, setShowIdx] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 3; // Number of todos per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetching data from the first endpoint
        const response1 = await axios.get("http://localhost:8889/repair", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTodos(response1.data.todos);
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
        title: "ยกเลิกรายการสำเร็จ!",
        text: "ได้ยกเลิกรายการของคุณเรียบร้อยแล้ว.",
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
    <div
      key={el.id}
      className="card bg-base-100 shadow-xl mb-4 flex flex-col max-w-[300px] min-w-[300px]"
    >
      <div className="card-body flex-1">
        <h2 className="text-xl font-semibold">
          วันที่แจ้ง: {new Date(el.requesDate).toLocaleDateString()}
        </h2>
        <h3 className="text-lg font-semibold">
          เวลาที่แจ้ง: {new Date(el.requesDate).toLocaleTimeString()}
        </h3>
        <p>อุปกรณ์: {el.device.type}</p>
        <p>รายละเอียด: {el.detailrepair}</p>
        <p>สถานที่แจ้ง: {el.buding}</p>
        <p>ชั้น: {el.room}</p>
        <p>แผนก: {el.userdata.appointment}</p>
        <p
          className={`font-semibold ${
            el.status === "แจ้งซ่อม"
              ? "text-sky-700"
              : el.status === "ซ่อมไม่ได้"
              ? "text-red-500"
              : el.status === "กำลังดำเนินการ"
              ? "text-orange-500"
              : el.status === "รอเบิกอะไหร่"
              ? "text-yellow-500"
              : "text-lime-700"
          }`}
        >
          สถานะการซ่อม: {el.status}
          {el.status === "กำลังดำเนินการ" && (
            <svg
              aria-hidden="true"
              role="status"
              className="inline mx-2 w-4 h-4 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          )}
        </p>
        <p>สถานะผู้ใช้: {el.statusUser}</p>
        <p>สถานะผู้ใช้การรับงาน: {el.TeEdit}</p>
      </div>
      <div className="card-actions flex justify-end mt-4">
        <button
          className="btn btn-primary"
          onClick={() => openModal(el.id)}
          style={{ display: el.status === "แจ้งซ่อม" ? "none" : "block" }}
        >
          <MdFileOpen className="mr-2" /> รายละเอียด
        </button>
        {el.status === "แจ้งซ่อม" && (
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(el.id)}
          >
            <MdOutlineCancelPresentation className="mr-2 " /> ยกเลิก
          </button>
        )}
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
      <UserHome />
      <div className="flex flex-col items-start gap-8 mt-5 mx-10">
        <div className="text-xl font-semibold mt-2"></div>
        <div className="w-full overflow-x-auto">
          {todos.length === 0 ? (
            <p className="bg-white text-gray-600 p-6 rounded-lg shadow-lg text-lg">
              คุณยังไม่มีรายการแจ้งซ่อม
            </p>
          ) : (
            <>
              <div className="flex gap-4 py-2">
                {renderTodos}
              </div>
              <ul id="page-numbers" className="flex gap-2 mt-4">
                {renderPageNumbers}
              </ul>
            </>
          )}
        </div>
        <Modalshow el={todos[showIdx]} />
      </div>
    </div>
  );
}
