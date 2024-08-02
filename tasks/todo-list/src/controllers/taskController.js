import { loadTasks, saveTasks } from '../models/taskModel';

export const getTasks = () => {
  return loadTasks();
};

export const addTask = (task) => {
  const tasks = loadTasks();
  tasks.push({ ...task, id: Date.now(), completed: false });
  saveTasks(tasks);

  return tasks;
};

export const updateTask = (updatedTask) => {
  const tasks = loadTasks();
  const idx = tasks.findIndex((task) => task.id === updatedTask.id);

  if (idx !== -1) {
    tasks[idx] = updatedTask;
    saveTasks(tasks);
  }

  return tasks;
};

export const deleteTask = (taskId) => {
  const tasks = loadTasks();
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  saveTasks(updatedTasks);

  return updatedTasks;
};

export const toggleTaskCompletion = (taskId) => {
  const tasks = loadTasks();
  const idx = tasks.findIndex((task) => task.id === taskId);

  if (idx !== -1) {
    tasks[idx].completed = !tasks[idx].completed;
    saveTasks(tasks);
  }

  return tasks;
};

export const countTasks = (tasks) => {
  return {
    all: tasks.length,
    open: tasks.filter((task) => !task.completed).length,
    closed: tasks.filter((task) => task.completed).length,
  };
};
