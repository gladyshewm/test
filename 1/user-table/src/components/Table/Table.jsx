import React, { useEffect, useRef, useState } from 'react';
import './Table.css';
import SortableHeader from './SortableHeader';
import Modal from '../Modal/Modal';

const Table = ({ users }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState(null);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [columnWidths, setColumnWidths] = useState({
    name: 150,
    age: 80,
    gender: 80,
    phone: 100,
    address: 200,
  });
  const tableRef = useRef(null);

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then((response) => response.json())
      .then((data) => {
        setAllUsers(data.users);
        setSortedUsers(data.users);
      })
      .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    setSortedUsers(users?.length > 0 ? users : allUsers);
  }, [users, allUsers]);

  const getSortedValue = (user, key) => {
    if (key === 'name') {
      return `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`;
    } else if (key === 'address') {
      return `${user.address.city.toLowerCase()} ${user.address.address.toLowerCase()}`;
    } else {
      return user[key];
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

    if (direction === '') {
      setSortedUsers(users?.length > 0 ? users : allUsers);
    } else {
      const sorted = [...sortedUsers].sort((a, b) => {
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

      setSortedUsers(sorted);
    }
  };

  const handleMouseDown = (e, columnKey) => {
    e.preventDefault();
    const startX = e.pageX;
    const thElement = e.target.closest('th');
    const startWidth = thElement.offsetWidth;
    const table = tableRef.current;
    const tableWidth = table.offsetWidth;

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.pageX - startX;
      const newWidth = Math.max(startWidth + deltaX, 50);
      const maxWidth = tableWidth - (table.childElementCount - 1) * 50;
      const clampedWidth = Math.min(newWidth, maxWidth);

      setColumnWidths((prev) => ({ ...prev, [columnKey]: clampedWidth }));
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  if (error) {
    console.error(error);
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="table-wrapper" ref={tableRef}>
      <table className="table">
        <thead>
          <tr>
            <SortableHeader
              label="ФИО"
              columnKey="name"
              sortConfig={sortConfig}
              handleSort={handleSort}
              handleMouseDown={handleMouseDown}
              style={{ width: columnWidths.name }}
            />
            <SortableHeader
              label="Возраст"
              columnKey="age"
              sortConfig={sortConfig}
              handleSort={handleSort}
              style={{ width: columnWidths.age }}
              handleMouseDown={handleMouseDown}
            />
            <SortableHeader
              label="Пол"
              columnKey="gender"
              sortConfig={sortConfig}
              handleSort={handleSort}
              style={{ width: columnWidths.gender }}
              handleMouseDown={handleMouseDown}
            />
            <th className="th-resizable" style={{ width: columnWidths.phone }}>
              <div className="th-content">
                <span>Номер телефона</span>
                <div
                  className="resizer"
                  onMouseDown={(e) => handleMouseDown(e, 'phone')}
                />
              </div>
            </th>
            <SortableHeader
              label="Адрес"
              columnKey="address"
              sortConfig={sortConfig}
              handleSort={handleSort}
              style={{ width: columnWidths.address }}
              handleMouseDown={handleMouseDown}
            />
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id} onClick={() => handleRowClick(user)}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.phone}</td>
              <td>
                {user.address.city}, {user.address.address}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && <Modal user={selectedUser} onClose={closeModal} />}
    </div>
  );
};

export default Table;
