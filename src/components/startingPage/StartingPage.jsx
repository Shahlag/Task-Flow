import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';


const StartingPage = ({ tasks, setTasks }) => {

  const [task , setTask]=useState({
    // required for dragging and dropiing
    id: "",
    name:"",
    status:"todo" ,
  });
  console.log(task);

  console.log(task);
  const handleSubmit = (e)=>{
    e.preventDefault();
    
    if(task.name.length < 3){
      toast.error("Less than 3 characters!");
    }
    if(task.name.length > 100){
      toast.error("More than 100 characters!");
    }

    setTasks((prev)=>{
      const list = [...(prev || []), task];

      // save this to localStorage
      localStorage.setItem("tasks",JSON.stringify(list));
      return list;
      // this updates tasks 
    });

    toast.success("Task Created!");

    setTask({
      id: "",
    name:"",
    status:"todo" ,
    });
  }


  return (
    <form onSubmit={handleSubmit}>
    <input type="text" className='border-2 rounded-md mr-4 h-10 w-64 px-1'
    value={task.name}
    onChange={(e)=> setTask({...task,id: uuidv4(), name:e.target.value})}/>

    <button className='bg-green-400 rounded-md px-4 h-12 text-white'>Create</button>
    </form>
  );
};

export default StartingPage;