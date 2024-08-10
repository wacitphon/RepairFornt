import axios from "axios";
import React, { useState, createContext, useContext, useEffect } from 'react';

// สร้าง Context
const RepairContext = createContext({
  adminData: [], // ค่าเริ่มต้นเป็นอาร์เรย์ว่าง
});

// Provider สำหรับ Context
function RepairContextProvider(props) {
  const [adminData, setAdminData] = useState([]);

  useEffect(() => {
    const showRepair = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return; // หากไม่มี token ให้หยุดการดำเนินการ

        const rs = await axios.get("http://localhost:8889/repair/adminShow", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setAdminData(rs.data || []); // เซ็ตค่าเริ่มต้นเป็นอาร์เรย์ว่างหาก rs.data เป็น undefined

      } catch (error) {
        console.error('Failed to fetch data:', error); // ใช้ console.error แทน alert
      }
    };

    showRepair();
  }, []); // ใช้ empty dependency array เพื่อเรียกใช้ useEffect แค่ครั้งเดียวเมื่อ component mount

  return (
    <RepairContext.Provider value={{ adminData }}>
      {props.children}
    </RepairContext.Provider>
  );
}

export default RepairContext;
export { RepairContextProvider };