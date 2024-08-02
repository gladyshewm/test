export const formatDate = (date) => {
  const options = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  return new Intl.DateTimeFormat('ru-RU', options).format(date);
};
