import { useEffect, useState } from 'react';
import './App.css';
import TaskList from './components/TaskList/TaskList';
import {
  addTask,
  countTasks,
  deleteTask,
  getTasks,
  toggleTaskCompletion,
  updateTask,
} from './controllers/taskController';
import TaskForm from './components/TaskForm/TaskForm';
import PlusIcon from './icons/PlusIcon';
import XmarkIcon from './icons/XmarkIcon';
import ConfirmModal from './components/ConfirmModal/ConfirmModal';
import ChevronDownIcon from './icons/ChevronDownIcon';
import { formatDate } from './utils/dateUtils';
import { filterTasks, sortTasks } from './utils/taskUtils';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all'); // all, open, closed
  const [sortOrder, setSortOrder] = useState('asc'); // asc, desc
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToToggle, setTaskToToggle] = useState(null);
  const [tasksToRemove, setTasksToRemove] = useState([]);
  const [taskCounts, setTaskCounts] = useState({ all: 0, open: 0, closed: 0 });

  useEffect(() => {
    const loadedTasks = getTasks();
    setTasks(loadedTasks);
    const countedTasks = countTasks(loadedTasks);
    setTaskCounts(countedTasks);
  }, []);

  useEffect(() => {
    setTaskCounts(countTasks(tasks));
  }, [tasks]);

  const handleSaveTask = (task) => {
    if (task.id) {
      setTasks(updateTask(task));
    } else {
      setTasks(addTask(task));
    }

    setCurrentTask(null);
    setShowForm(false);
  };

  const handleEditTask = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setCurrentTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = (taskId) => {
    setTasksToRemove([...tasksToRemove, taskId]);
    setShowDeleteModal(true);
    setTaskToToggle(taskId);
  };

  const confirmDeleteTask = () => {
    if (taskToToggle !== null) {
      const taskElement = document.getElementById(`task-${taskToToggle}`);
      if (taskElement) {
        taskElement.classList.add('removing');
      }

      setTimeout(() => {
        setTasks(deleteTask(taskToToggle));
        setTasksToRemove(tasksToRemove.filter((id) => id !== taskToToggle));
      }, 300);

      setTaskToToggle(null);
      setShowDeleteModal(false);
    }
  };

  const cancelDeleteTask = () => {
    setTaskToToggle(null);
    setShowDeleteModal(false);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

  const handleToggleCompletion = (taskId) => {
    setTaskToToggle(taskId);
    setShowConfirmModal(true);
  };

  const confirmToggleCompletion = () => {
    if (taskToToggle !== null) {
      setTasks(toggleTaskCompletion(taskToToggle));
      setTaskToToggle(null);
      setShowConfirmModal(false);
    }
  };

  const cancelToggleCompletion = () => {
    setTaskToToggle(null);
    setShowConfirmModal(false);
  };

  const handleAddTaskButton = () => {
    setShowForm(!showForm);
    setCurrentTask(null);
  };

  const displayedTasks = filterTasks(sortTasks(tasks, sortOrder), filter);

  return (
    <div className="App">
      <div className="todo-app">
        <div className="todo-app__header">
          <div className="title">
            <span>To-Do List</span>
            <span>{formatDate(Date.now())}</span>
          </div>
          <button
            className="add-task-button"
            onClick={() => handleAddTaskButton()}
          >
            {showForm ? <XmarkIcon /> : <PlusIcon />}
          </button>
          <hr className="divider" />
        </div>
        {!showForm && (
          <div className="filters">
            <button onClick={() => handleFilterChange('all')}>
              <span>Все</span>
              <div className="count">{taskCounts.all}</div>
            </button>
            <button onClick={() => handleFilterChange('open')}>
              <span>Незавершённые</span>
              <div className="count">{taskCounts.open}</div>
            </button>
            <button onClick={() => handleFilterChange('closed')}>
              <span>Завершённые</span>
              <div className="count">{taskCounts.closed}</div>
            </button>
            <button
              onClick={() =>
                handleSortChange(sortOrder === 'asc' ? 'desc' : 'asc')
              }
            >
              {sortOrder === 'asc' ? (
                <ChevronDownIcon className="up" />
              ) : (
                <ChevronDownIcon className="down" />
              )}
            </button>
          </div>
        )}

        <div className="todo-app__content">
          {showForm ? (
            <TaskForm onSave={handleSaveTask} currentTask={currentTask} />
          ) : (
            <TaskList
              tasks={displayedTasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onToggleCompletion={handleToggleCompletion}
              tasksToRemove={tasksToRemove}
            />
          )}
        </div>
        <ConfirmModal
          label={
            showConfirmModal
              ? `Отметить задачу как завершённую?`
              : 'Удалить задачу?'
          }
          show={showConfirmModal || showDeleteModal}
          onConfirm={
            showConfirmModal ? confirmToggleCompletion : confirmDeleteTask
          }
          onCancel={
            showConfirmModal ? cancelToggleCompletion : cancelDeleteTask
          }
        />
      </div>
    </div>
  );
};

export default App;
