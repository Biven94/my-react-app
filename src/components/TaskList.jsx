import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import './styles/TaskList.css'

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTaskText.trim() === '') {
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: newTaskText, completed: false }]);
    setNewTaskText('');
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const filterTasks = (completed) => {
    return tasks.filter((task) => task.completed === completed);
  };

  return (
    <div className="task-list">
      <h2>Список задач</h2>
      <form
        className="form-container"
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <input
          type="text"
          name="taskInput"
          placeholder="Введите новую задачу"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button type="submit">Добавить задачу</button>
      </form>
      <div className="tasks">
        <h3>Невыполненные задачи</h3>
        {filterTasks(false).map((task) => (
          <TaskItem key={task.id} task={task} onDelete={deleteTask} onToggle={toggleTaskCompletion} />
        ))}
        <h3>Выполненные задачи</h3>
        {filterTasks(true).map((task) => (
          <TaskItem key={task.id} task={task} onDelete={deleteTask} onToggle={toggleTaskCompletion} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;


