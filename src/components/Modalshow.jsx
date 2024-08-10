import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Modalshow(props) {
  const { el } = props;
  const [terepair, setTerepair] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        // Fetching data from the second endpoint
        const response = await axios.get("http://localhost:8889/repair/terepair", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTerepair(response.data.terepair); // assuming response2.data contains the entire terepair object
        console.log(response)
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle ">
      <div className="modal-box">
        <h1 className="text-3xl font-bold mb-4">รายละเอียดการแจ้งซ่อม</h1>
        <table className="w-full border border-collapse">
          <tbody>
            <tr className="bg-gray-200">
              <td className="w-1/3 font-bold border border-black border-opacity-100 px-4 py-2">
                วันที่แจ้งซ่อม
              </td>
              <td className="w-2/3 border border-black border-opacity-100 px-4 py-2">
                {new Date(el?.requesDate).toLocaleDateString()}
              </td>
              
            </tr>
            <tr className="bg-gray-200">
              <td className="w-1/3 font-bold border border-black border-opacity-100 px-4 py-2">
                เวลาที่แจ้ง
              </td>
              <td className="w-2/3 border border-black border-opacity-100 px-4 py-2">
                {new Date(el?.requesDate).toLocaleTimeString()}
              </td>
              
            </tr>
            <tr className="bg-gray-100">
              <td className="font-bold border border-black border-opacity-100 px-4 py-2">
                ชื่อผู้แจ้ง
              </td>
              <td className="border border-black border-opacity-100 px-4 py-2">
                {el?.userdata.usernamedata}
              </td>
            </tr>
            <tr className="bg-gray-200">
              <td className="font-bold border border-black border-opacity-100 px-4 py-2">
                อุปกรณ์ที่แจ้งซ่อม
              </td>
              <td className="border border-black border-opacity-100 px-4 py-2">
                {el?.device.type}
              </td>
            </tr>
            <tr className="bg-gray-100">
              <td className="font-bold border border-black border-opacity-100 px-4 py-2">
                รายละเอียด
              </td>
              <td className="border border-black border-opacity-100 px-4 py-2">
                {el?.detailrepair}
              </td>
            </tr>
            <tr className="bg-gray-200">
              <td className="font-bold border border-black border-opacity-100 px-4 py-2">
                สถานะ
              </td>
              <td
                className="border border-black border-opacity-100 px-4 py-2"
                style={{
                  color:
                    el?.status === "แจ้งซ่อม"
                      ? "blue"
                      : el?.status === "รอดำเนินการ"
                      ? "orange"
                      : el?.status === "รอเบิกอะไหร่"
                      ? "yellow"
                      : el?.status === "สำเร็จ"
                      ? "green"
                      : "black",
                }}
              >
                {el?.status}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Second Table */}
        <h1 className="text-3xl font-bold mb-4 mt-10">รายละเอียดเพิ่มเติม</h1>
        <tr className="bg-gray-100">
          <td className="w-1/3 font-bold border border-gray-200 px-4 py-2">
            วันที่ดำเนินการแก้ไข
          </td>
          <td className="w-2/3 border border-gray-200 px-4 py-2">
            {new Date(el?.EditRepairDate).toLocaleDateString()} 
          </td>
        </tr>
        <tr className="bg-gray-100">
          <td className="w-1/3 font-bold border border-gray-200 px-4 py-2">
            เวลาที่ดำเนินการ
          </td>
          <td className="w-2/3 border border-gray-200 px-4 py-2">
            {new Date(el?.EditRepairDate).toLocaleTimeString()} 
          </td>
        </tr>
        <tr className="bg-gray-100">
          <td className="font-bold border border-gray-200 px-4 py-2">
            รายละเอียด
          </td>
          <td className="border border-gray-200 px-4 py-2"> {el?.DatailEdit}</td>
        </tr>
        <tr className="bg-gray-200">
          <td className="font-bold border border-gray-200 px-4 py-2">
            สถานะการรับงาน
          </td>
          <td className="border border-gray-200 px-4 py-2">{el?.TeEdit }</td>
        </tr>
        <tr className="bg-gray-200">
          <td className="font-bold border border-gray-200 px-4 py-2">
            สถานะ
          </td>
          <td className="border border-gray-200 px-4 py-2">{el?.tecdnicianRepair }</td>
        </tr>
        

        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
