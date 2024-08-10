import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ImWrench } from "react-icons/im";
import Swal from "sweetalert2";

export default function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
  
      // Check if username or password is empty
      if (!input.username || !input.password) {
        Swal.fire({
          icon: 'error',
          title: 'กรุณากรอกข้อมูล',
          text: 'กรุณากรอก Username และ Password ให้ครบถ้วน',
        });
        return;
      }
  
      const rs = await axios.post("http://localhost:8889/auth/login", input);
      console.log(rs.data.token);
      localStorage.setItem("token", rs.data.token);
  
      const rs1 = await axios.get("http://localhost:8889/auth/me", {
        headers: { Authorization: `Bearer ${rs.data.token}` },
      });
  
      // Check if response from /auth/me is empty or undefined
      if (!rs1.data) {
        Swal.fire({
          icon: 'error',
          title: 'ไม่พบผู้ใช้',
          text: 'กรุณาตรวจสอบ Username หรือ Password อีกครั้ง',
        });
        return;
      }
  
      setUser(rs1.data);
      navigate("/home");
      
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
    } catch (err) {
      Swal.fire({
         icon: "question",
        title: 'ไม่พบผู้ใช้',
        text: 'กรุณาตรวจสอบ Username หรือ Password อีกครั้งหรือติดต่อผู้ดูแลระบบถ้ายังไม่มีบัญชี',
      });
    }
  };
  return (
    <div
      className="hero min-h-screen bg-gray-100 flex justify-center items-center"
      style={{ backgroundImage: "url(../image/im1.jpg)" }}
    >
      <div className="mt-14 card-container bg-white bg-opacity-5 backdrop-blur-md p-8 rounded-lg shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        <form
          className="card-body p-8 flex flex-col justify-center items-center  "
          onSubmit={hdlSubmit}
        >
          <div className="flex justify-center items-center mb-6">
            <div className="bg-blue-400 rounded-full h-full w-full flex justify-center items-center hover:bg-blue-500 transform hover:scale-105 transition-transform duration-300">
              <div class="w-full h-36 rounded-md overflow-hidden">
                <img
                  src="image/Take2.png"
                  alt="Logo"
                  class="w-full h-full object-cover "
                ></img>
              </div>
            </div>
          </div>
          <div className="form-control relative mb-4">
            <label className="label">
              <span className=" font-semibold">Username </span>
            </label>
            <div className="relative">
              <input
                type="username"
                placeholder="Username"
                className="input input-info  pl-12"
                name="username"
                value={input.username}
                onChange={hdlChange}
              />
              <FaUserCircle className="absolute left-3 top-3 text-blue-400 text-xl" />
            </div>
          </div>
          <div className="form-control relative mb-4">
            <label className="label">
              <span className=" font-semibold">Password</span>
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="input input-info pl-12"
                name="password"
                value={input.password}
                onChange={hdlChange}
              />
              <FaKey className="absolute left-3 top-3 text-blue-400 text-xl" />
            </div>
          </div>
          <div className="form-control">
            <button type="submit" className="btn btn-info w-full">
              เข้าสู่ระบบ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
