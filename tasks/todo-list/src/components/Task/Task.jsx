import React from 'react';
import './Task.css';
import { formatDate } from '../../utils/dateUtils';
import PencilSquareIcon from '../../icons/PencilSquareIcon';
import TrashIcon from '../../icons/TrashIcon';
import ClockIcon from '../../icons/ClockIcon';
import XCircleIcon from '../../icons/XCircleIcon';
import CheckCircleIcon from '../../icons/CheckCircleIcon';

const Task = ({ task, onEdit, onDelete, onToggleCompletion, isRemoving }) => {
  const isExpired = new Date(task.deadline) < new Date();

  return (
    <div
      id={`task-${task.id}`}
      className={`task ${isRemoving ? 'removing' : ''}`}
    >
      <div className="title">
        <span>{task.title}</span>
        <button
          className="complete-button"
          onClick={() => onToggleCompletion(task.id)}
        >
          {task.completed ? (
            <CheckCircleIcon stroke="var(--success-color)" />
          ) : isExpired ? (
            <XCircleIcon stroke="var(--error-color)" />
          ) : (
            <ClockIcon stroke="var(--pending-color)" />
          )}
        </button>
      </div>
      <span className="description">{task.description}</span>
      <div className="footer">
        <span className="deadline">
          {task.deadline && formatDate(new Date(task.deadline))}
        </span>
        <div className="task__buttons">
          <button onClick={() => onEdit(task.id)}>
            <PencilSquareIcon />
          </button>
          <button onClick={() => onDelete(task.id)}>
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
