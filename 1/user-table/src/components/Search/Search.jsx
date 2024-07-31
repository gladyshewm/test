import React, { useState } from 'react';
import './Search.css';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      onSearch([]);
      return;
    }

    try {
      const searchFields = [
        'firstName',
        'lastName',
        'age',
        'gender',
        'phone',
        'address.city',
        'address.address',
      ];

      const searchPromises = searchFields.map((field) =>
        fetch(
          `https://dummyjson.com/users/filter?key=${field}&value=${encodeURIComponent(
            query,
          )}`,
        )
          .then((res) => res.json())
          .catch((error) => setError(error)),
      );
      const results = await Promise.all(searchPromises);

      const uniqueUsers = results.reduce((acc, { users }) => {
        if (users) {
          users.forEach((user) => {
            if (!acc.some((u) => u.id === user.id)) {
              acc.push(user);
            }
          });
        }
        return acc;
      }, []);

      onSearch(uniqueUsers);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (error) {
    console.error('Error:', error);
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="search">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        placeholder="Поиск"
        type="text"
      />
      <button onClick={handleSearch}>Поиск</button>
    </div>
  );
};

export default Search;
