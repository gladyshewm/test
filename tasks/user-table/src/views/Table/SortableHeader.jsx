import React from 'react';
import ChevronUpDownIcon from '../../icons/ChevronUpDownIcon';
import ChevronDownIcon from '../../icons/ChevronDownIcon';

const SortableHeader = ({
  label,
  columnKey,
  sortConfig,
  handleSort,
  style,
  handleMouseDown,
}) => {
  const isSorted = sortConfig.key === columnKey;
  let icon = <ChevronUpDownIcon />;

  if (isSorted) {
    if (sortConfig.direction === 'ASC') {
      icon = <ChevronDownIcon className="up" />;
    } else if (sortConfig.direction === 'DESC') {
      icon = <ChevronDownIcon className="down" />;
    }
  }

  return (
    <th
      onClick={() => handleSort(columnKey)}
      style={style}
      className="th-resizable"
    >
      <div className="th-content">
        <span>{label}</span>
        {icon}
      </div>
      <div
        className="resizer"
        onMouseDown={(e) => handleMouseDown(e, columnKey)}
      />
    </th>
  );
};

export default SortableHeader;
