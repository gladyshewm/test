import React, { useEffect, useState } from 'react';
import './TaskForm.css';
import FormInput from '../FormInput/FormInput';
import PlusIcon from '../../icons/PlusIcon';
import CheckIcon from '../../icons/CheckIcon';

const TaskForm = ({ onSave, currentTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setDeadline(currentTask.deadline);
    } else {
      setTitle('');
      setDescription('');
      setDeadline('');
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !deadline) {
      alert('Title and deadline date are required.');
      return;
    }

    onSave({ id: currentTask?.id, title, description, deadline });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <FormInput
        type="text"
        label="Заголовок"
        placeholder=" "
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <FormInput
        type="text"
        label="Описание"
        placeholder=" "
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <FormInput
        type="date"
        placeholder=" "
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
      <button type="submit">
        {currentTask ? (
          <>
            <span>Сохранить</span>
            <CheckIcon />
          </>
        ) : (
          <>
            <span>Добавить</span>
            <PlusIcon />
          </>
        )}
      </button>
    </form>
  );
};

export default TaskForm;
