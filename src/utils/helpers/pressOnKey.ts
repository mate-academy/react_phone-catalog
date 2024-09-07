export const onKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  onAdd: () => void,
  onDelete: () => void,
) => {
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    onAdd();
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    onDelete();
  }
};
