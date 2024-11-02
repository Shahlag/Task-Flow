import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Toaster } from 'react-hot-toast';
import StartingPage from './components/startingPage/StartingPage';
import ProjectBoard from './components/projectBoard/ProjectBoard';
import TaskDetail from './components/taskDetail/TaskDetail'; // Import TaskDetail component
import React, { useEffect, useState } from 'react';
function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    setTasks(JSON.parse(localStorage.getItem("tasks")))
  },[])

  const Layout=()=>{
    return(
      <div className='w-screen h-screen flex flex-col items-center p-3 gap-16 pt-20'>
        <StartingPage tasks={tasks} setTasks={setTasks}/>
        <ProjectBoard tasks={tasks} setTasks={setTasks} />
      </div>
    )
  }
  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <Toaster />
        <div>
          <Routes>
            <Route path="/" element={<Layout/>} />
            <Route path="/taskDetail/:id" element={<TaskDetail tasks={tasks} setTasks={setTasks} />} />
          </Routes>
        </div>
      </DndProvider>
    </Router>
  );
}

export default App;
