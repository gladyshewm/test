import React, { useState } from 'react';
import './Search.css';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  return (
    <div className="search">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch(query)}
        placeholder="Поиск"
        type="text"
      />
      <button onClick={() => onSearch(query)}>Поиск</button>
    </div>
  );
};

export default Search;
