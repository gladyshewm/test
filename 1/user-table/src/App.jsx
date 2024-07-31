import { useState } from 'react';
import './App.css';
import Search from './components/Search/Search';
import Table from './components/Table/Table';

const App = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSearch = (users) => {
    setFilteredUsers(users);
  };

  return (
    <div className="App">
      <div className="searching-block">
        <Search onSearch={handleSearch} />
        <Table users={filteredUsers} />
      </div>
    </div>
  );
};

export default App;
