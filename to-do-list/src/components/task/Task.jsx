import React, { useState } from 'react'
import './Task.css'
import {FaTrash, FaPen, FaCalendar} from 'react-icons/fa'
import {HiX} from 'react-icons/hi'


const Task = ({id, title,date, checked, deleteTask, updateTask, openCalendar}) => {
  const [readOnly, setReadOnly] = useState(true)
  const titleDate = title + " " + date;
  return (
    <div className='task' key={id}>
      <input type='checkbox' defaultChecked={checked}></input>
      <input type='text' onChange={(event) => updateTask(id, event.target.value, checked)} defaultValue={title} readOnly={readOnly}></input>
      <p>{date}</p>
      <FaCalendar onClick={() => openCalendar(id)}/>
      {readOnly 
      ? <FaPen onClick={() => setReadOnly(false)}/> : 
      <HiX onClick={() => setReadOnly(true)}/>}
      <FaTrash id="icon-trash" onClick={() => deleteTask(id)}/>
    </div>
  )
}

export default Task