import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const TaskDetail = ({ tasks, setTasks }) => {
  const navigate = useNavigate();
  const taskId = window.location.pathname.split('/').pop(); // Get task ID from URL

  const [editedTask, setEditedTask] = useState({}); // State to hold edited task details

  // Find the task with the matching ID
  const task = tasks.find(task => task.id === taskId);

  if (!task) {
    // If task is not found, display error message and redirect to starting page
    toast.error("Task not found!");
    navigate('/');
    return null;
  }

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  // Function to save changes to the task
  const handleSave = () => {
    const updatedTasks = tasks.map(t => {
      if (t.id === taskId) {
        return { ...t, ...editedTask };
      }
      return t;
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    toast.success("Task updated successfully!");
    navigate('/'); // Redirect to main project board after saving changes
  };

  // Function to delete the task
  const handleDelete = () => {
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    toast.success("Task deleted successfully!");
    navigate('/'); // Redirect to main project board after deleting task

  };

  return (
    <div className="mx-auto max-w-md p-6 bg-white shadow-md rounded-md mt-20">
      <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
      <label className="block mb-2">Title:</label>
      <input
        type="text"
        name="name"
        value={editedTask.name || task.name}
        onChange={handleInputChange}
        className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
      />
      <label className="block mb-2">Status:</label>
      <select
        name="status"
        value={editedTask.status || task.status}
        onChange={handleInputChange}
        className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
      >
        <option value="todo">To Do</option>
        <option value="inProgress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
      <label className="block mb-2">Description:</label>
      <textarea
        name="description"
        value={editedTask.description || task.description}
        onChange={handleInputChange}
        className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
      ></textarea>
      <button
        onClick={handleSave}
        className="w-full py-2 mb-2 bg-blue-500 text-white rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none"
      >
        Save
      </button>
      <button
        onClick={handleDelete}
        className="w-full py-2 bg-red-500 text-white rounded-md transition duration-300 hover:bg-red-600 focus:outline-none"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskDetail;
