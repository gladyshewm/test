import React from 'react';
import './TaskList.css';
import Task from '../Task/Task';

const TaskList = ({
  tasks,
  onEdit,
  onDelete,
  onToggleCompletion,
  tasksToRemove,
}) => {
  return (
    <div className="task-list">
      {tasks.length === 0 && <span className="no-tasks">Задач не найдено</span>}
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleCompletion={onToggleCompletion}
          isRemoving={tasksToRemove.includes(task.id)}
        />
      ))}
    </div>
  );
};

export default TaskList;
