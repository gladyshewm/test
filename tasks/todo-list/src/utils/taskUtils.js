export const filterTasks = (tasks, filter) => {
  return tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'open') return !task.completed;
    if (filter === 'closed') return task.completed;
    return true;
  });
};

export const sortTasks = (tasks, sortOrder) => {
  return [...tasks].sort((a, b) => {
    if (sortOrder === 'asc') return new Date(a.deadline) - new Date(b.deadline);
    return new Date(b.deadline) - new Date(a.deadline);
  });
};
