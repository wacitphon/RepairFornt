import axios from "axios";
import { useEffect, useState } from "react";
import { MdFileOpen } from "react-icons/md";
import ModalEdit from "../components/ModalEditSta";
import TeHome from "./TeHome";
import Swal from "sweetalert2";

export default function Table() {
  const [todos, setTodos] = useState([]);
  const [showIdx, setShowIdx] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 3; // Number of todos per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8889/repair/terecord",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchData();
  }, [showIdx]); // Reload data when showIdx changes (e.g., after modal closes)

  const openModal = (id) => {
    const idx = todos.findIndex((el) => el.id === id);
    setShowIdx(idx);
    document.getElementById("my_modal_0").showModal();
  };

  const handleModalClose = () => {
    setShowIdx(-1); // Reset showIdx when modal is closed
    document.getElementById("my_modal_0").close();
    fetchData(); // Fetch data again after modal is closed
  };

  // Logic for displaying todos
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const renderTodos = currentTodos.map((el) => (
    <div
      key={el.id}
      className="card bg-white shadow-md rounded-lg  w-full md:w-1/3 lg:w-1/4 mx-2"
    >
      <div className="card-body p-2">
        <h2 className="card-title text-lg font-bold mb-2">
          วันที่แจ้ง: {new Date(el.repair.requesDate).toLocaleDateString()}
        </h2>
        <h2 className="card-title text-lg font-bold mb-2">
          วันที่แจ้ง: {new Date(el.repair.requesDate).toLocaleTimeString()}
        </h2>
        <p className="mb-1">อุปกรณ์: {el.repair.device.type}</p>
        <p className="mb-1">รายละเอียด: {el.repair.detailrepair}</p>
        <p className="mb-1">ชื่อผู้แจ้ง: {el.repair.userdata.usernamedata}</p>
        <p className="mb-1">สถานที่ที่แจ้ง : {el.repair.userdata.usernamedata}</p>
        <p className="mb-1">แผนก: {el.repair.userdata.appointment}</p>
        <p
          className={`font-semibold mb-1 ${
            el.repair.status === "ส่งซ่อม"
              ? "text-blue-700"
              : el.repair.status === "รอเบิกอะไหร่"
              ? "text-yellow-500"
              : el.repair.status === "ซ่อมไม่ได้"
              ? "text-red-500"
              : el.repair.status === "เสร็จสิ้น"
              ? "text-green-500"
              : el.repair.status === "กำลังดำเนินการ"
              ? "text-orange-500"
              : "text-black"
          }`}
        >
          สถานะการซ่อม: {el.repair.status}
          {el.repair.status === "กำลังดำเนินการ" && (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-ml-2 text-white animate-spin"
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
        <p className="mb-1">สถานะผู้ใช้: {el.repair.statusUser}</p>
        <p className="mb-1">รห้สผู้ดำเนินการ: {el.user.username}</p>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary flex items-center" onClick={() => openModal(el.id)}>
            <MdFileOpen className="mr-2" /> เพิ่มรายละเอียด
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
    <div className="flex ">
      <TeHome />
      <div className="flex flex-col items-start gap-8  mx-2 w-full">
        <div className="text-2xl font-semibold mt-20">รายการที่รับแจ้งซ่อม </div>
        <div className="w-full overflow-x-auto">
          <div className="flex flex-wrap gap-4 ">
            {renderTodos}
          </div>
          <ul id="page-numbers" className="flex gap-2">
            {renderPageNumbers}
          </ul>
        </div>
        <ModalEdit el={todos[showIdx]} onClose={handleModalClose} />
      </div>
    </div>
  );
}