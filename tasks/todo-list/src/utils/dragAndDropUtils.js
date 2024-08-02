export const mouseDown = (e, position, setIsDragging, setDragStart) => {
  setIsDragging(true);
  setDragStart({
    x: e.clientX - position.x,
    y: e.clientY - position.y,
  });
};

export const mouseMove = (e, isDragging, dragStart, setPosition) => {
  if (isDragging) {
    const appWidth = 320;
    const appHeight = 600;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let newX = e.clientX - dragStart.x;
    let newY = e.clientY - dragStart.y;
    newX = Math.max(0, newX);
    newY = Math.max(0, newY);
    newX = Math.min(newX, windowWidth - appWidth - 180);
    newY = Math.min(newY, windowHeight - appHeight);

    setPosition({ x: newX, y: newY });
  }
};

export const mouseUp = (setIsDragging) => {
  setIsDragging(false);
};
