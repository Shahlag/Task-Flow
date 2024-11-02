import React, { useEffect, useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi'; // Import the meatballs icon
import { FaPlus } from 'react-icons/fa'; // Import the plus icon
import toast from 'react-hot-toast';
import { useDrag, useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';


const ProjectBoard = ({ tasks, setTasks }) => {

  const [todos, setTodos] = useState ([]);
  const [inProgress, setInProgress] = useState ([]);
  const [closed, setClosed] = useState ([]);

  useEffect(()=>{
    if(tasks){
    const fTodos = tasks.filter(task=>task.status==='todo');
    const fInProgress = tasks.filter(task=>task.status==='inProgress');
    const fClosed = tasks.filter(task=>task.status==='closed');


    setTodos(fTodos);
    setInProgress(fInProgress);
    setClosed(fClosed);
    }
  }, [tasks]);

  const statuses = ['todo', 'inProgress','closed']
  return (
    <div className='flex gap-16'>
      {statuses.map((status,index)=> 
      <Section key={index}
       status={status}
        tasks={tasks} 
        setTasks = {setTasks} 
        todos={todos}
         inProgress = {inProgress} 
         closed={closed}
         />
         )}
    </div>
  );
};

export default ProjectBoard;

const Section = ({ status, tasks, setTasks, todos, inProgress,closed })=>{

  
  const [{ isOver }, drop]= useDrop(()=>({
    accept: "task",
    drop : (item)=> addItemToSelection(item.id),
    collect: (monitor)=>({
      isOver : !!monitor.isOver(),
    })
  }))



  let text="Not Started";
  let bg="bg-red-100";
  let tasksToMap =todos;


  if(status === 'inProgress'){
    text="In Progress"
    bg="bg-yellow-100"
    tasksToMap = inProgress;
  }
  if(status === 'closed'){
    text="Completed"
    bg="bg-blue-100"
    tasksToMap = closed;
  }

  const addItemToSelection = (id)=>{
    setTasks(prev=>{
      const mTasks = prev.map(t => {
        if(t.id == id){
          return {...t, status:status};
        }
        return t;
      });
      localStorage.setItem("tasks",JSON.stringify(mTasks));
      toast("Task status changed!!")
      return mTasks;
    })
  }

  return(
    <div ref={drop} className={`w-64 rounded-md p-2 ${isOver ? "bg-slate-200" : ""}`}>
    <div className='flex justify-between items-center'>
      <Header text={text} bg={bg} count={tasksToMap.length}/>
      <div className="flex gap-3">
        <HiDotsHorizontal className='text-gray-500 hover:text-gray-700 cursor-pointer' />
        <FaPlus style={{ marginRight: '0' }} className=' text-gray-500 hover:text-gray-700 cursor-pointer' />
      </div>
    </div>
    <div className="flex flex-col">
      {tasksToMap.length > 0 && tasksToMap.map((task) => (
        <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks}/>
      ))}
    </div>
  </div>
  
  );
};

const Header = ({ text, bg, count })=>{
  return(
  <div>
   <h2 className="text-lg font-semibold mb-2 md:mb-0">
    <span className={`${bg}`}>{text}</span> {count}
    </h2>
  
  </div>
  );
};

const Task = ({ task, tasks, setTasks })=>{

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item:{id:task.id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
console.log(isDragging);

const handleRemove = (id)=>{
  console.log(id);

  const fTasks = tasks.filter(t => t.id !== id);

  localStorage.setItem("tasks",JSON.stringify(fTasks));
  setTasks(fTasks);
  toast("Task removed!")
}

  return(
  <div ref={drag} className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab flex flex-col ${isDragging ? "opacity-25":"opacity-100"}`}>
     <Link to={`/taskDetail/${task.id}`}>
      <p>{task.name}</p>
    </Link>
   <button className='absolute bottom-1 right-1 text-slate-400' onClick={()=>handleRemove(task.id)}>

   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

   </button>
  </div>
  );
};