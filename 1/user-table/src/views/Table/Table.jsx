import React, { useRef, useState } from 'react';
import './Table.css';
import SortableHeader from './SortableHeader';
import Modal from '../Modal/Modal';
import { createResizer } from '../../utils/resizerUtils';

const Table = ({ users, sortConfig, onSort }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [columnWidths, setColumnWidths] = useState({
    name: 150,
    age: 80,
    gender: 80,
    phone: 100,
    address: 200,
  });
  const tableRef = useRef(null);

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const handleMouseDown = createResizer(tableRef, setColumnWidths);

  return (
    <div className="table-wrapper" ref={tableRef}>
      <table className="table">
        <thead>
          <tr>
            <SortableHeader
              label="ФИО"
              columnKey="name"
              sortConfig={sortConfig}
              handleSort={onSort}
              handleMouseDown={handleMouseDown}
              style={{ width: columnWidths.name }}
            />
            <SortableHeader
              label="Возраст"
              columnKey="age"
              sortConfig={sortConfig}
              handleSort={onSort}
              style={{ width: columnWidths.age }}
              handleMouseDown={handleMouseDown}
            />
            <SortableHeader
              label="Пол"
              columnKey="gender"
              sortConfig={sortConfig}
              handleSort={onSort}
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
              handleSort={onSort}
              style={{ width: columnWidths.address }}
              handleMouseDown={handleMouseDown}
            />
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} onClick={() => handleRowClick(user)}>
              <td>{user.fullName}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.phone}</td>
              <td>{user.fullAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && <Modal user={selectedUser} onClose={closeModal} />}
    </div>
  );
};

export default Table;
