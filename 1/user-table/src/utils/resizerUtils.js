export const createResizer = (tableRef, setColumnWidths) => {
  return (e, columnKey) => {
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
};
