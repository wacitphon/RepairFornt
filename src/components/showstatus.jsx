import axios from "axios";
import React,{ createContext, useEffect, useState} from "react";

const  RepairContext = createContext();
function RepairContextProvider(props){
    const [adminData, setAdminData] = useState(null)

   useEffect(()=>{
        const showRepair = async () =>{
            try {
                const token = localStorage.getItem('token')
                if (!token) {return}
                const rs = await axios.get("http://localhost:8889/todos/adminShow",{
                    headers: {Authorization: `Bearer ${token}`}
                });
                
                setAdminData(rs.data)
                // console.log(adminData);
                
            } catch (error) {
                alert(error);
            }
        };
        showRepair();
    }, []);

  return(
     <RepairContext.Provider value={{adminData,}}>
         {props.children}
     </RepairContext.Provider>
  );  
}

export default RepairContext ;
export {RepairContextProvider} ;