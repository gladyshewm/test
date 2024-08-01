export const getSortedValue = (user, key) => {
  if (key === 'name') {
    return `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`;
  } else if (key === 'address') {
    return `${user.address.city.toLowerCase()} ${user.address.address.toLowerCase()}`;
  } else {
    return user[key];
  }
};

export const sortUsers = (users, key, direction) => {
  if (direction === '') {
    return [...users];
  } else {
    return [...users].sort((a, b) => {
      const aValue = getSortedValue(a, key);
      const bValue = getSortedValue(b, key);

      if (aValue < bValue) {
        return direction === 'ASC' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'ASC' ? 1 : -1;
      }
      return 0;
    });
  }
};
