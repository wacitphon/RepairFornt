import React from 'react'
import {useState} from "react";
import axios from "axios";

export default function ModalTa() {
    const [input, setInput] = useState({
        name : "",
        phon : '',
        
      })
    
      const hdlChange = e => {
        setInput( prv => ( {...prv, [e.target.name] : e.target.value} ))
      }
    
      const hdlSubmit = async e => {
        try{
          e.preventDefault()
          // setInput(prv => ({...prv, dueDate: new Date(prv.dueDate) }))
        //   const output = { ...input, requesDate: new Date(input.requesDate) }
          const token = localStorage.getItem('token')
          const rs = await axios.post('http://localhost:8889/todos/te',  {
            headers : { Authorization : `Bearer ${token}`}
          });
      
        }catch(err) {
          alert(err.message)
        }
      }
    
    
      return (
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">เพิ่มช่าง</h3>
            <form className="flex flex-col min-w-[200px] border rounded w-3/6 mx-auto p-4 gap-6"
            onSubmit={hdlSubmit}
            style={{ marginTop: '90px' }}
        >
          <label className="form-control w-full max-w-[220px] ">
            <div className="label">
              <span className="label-text">ชื่อช่าง</span>
            </div>
            <input
              type="text"
              placeholder="ชื่อช่าง"
              className="input input-bordered w-full "
              name="name"
              value={input.name}
              onChange={hdlChange}
            />
          </label>
    
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">เบอร์โทร</span>
            </div>
            <input
              type="text"
              placeholder="ช่องทางการติดต่อ"
              className="input input-bordered w-full "
              name="phon"
              value={input.phon}
              onChange={hdlChange}
            />
          </label>
          <button type="submit" className="btn btn-primary">เพิ่มข้อมูล</button>
        </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      );
    }
    