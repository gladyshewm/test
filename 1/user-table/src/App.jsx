import { useEffect, useState } from 'react';
import './App.css';
import Search from './views/Search/Search';
import Table from './views/Table/Table';
import { UserService } from './services/UserService';
import { sortUsers } from './utils/sortingUtils';

const App = () => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await UserService.fetchUsers();
      setUsers(fetchedUsers);
      setSortedUsers(fetchedUsers);
    } catch (error) {
      console.error('Ошибка при получении пользователей: ', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = async (query) => {
    try {
      if (!query.trim()) {
        setSortedUsers(users);
      } else {
        const searchResult = await UserService.searchUsers(query);
        setSortedUsers(searchResult);
      }
    } catch (error) {
      console.error('Ошибка при поиске пользователей: ', error);
      setError(error.message);
    }
  };

  const handleSort = (key) => {
    let direction = 'ASC';

    if (sortConfig.key === key && sortConfig.direction === 'ASC') {
      direction = 'DESC';
    } else if (sortConfig.key === key && sortConfig.direction === 'DESC') {
      direction = '';
    }

    setSortConfig({ key, direction });
    setSortedUsers(sortUsers(users, key, direction));
  };

  return (
    <div className="App">
      <div className="searching-block">
        {error && <div className="error">Error: {error}</div>}
        <Search onSearch={handleSearch} />
        <Table
          users={sortedUsers}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      </div>
    </div>
  );
};

export default App;
