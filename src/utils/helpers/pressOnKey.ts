export const onKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  quantity: number,
  onAdd: () => void,
  onDelete: () => void,
) => {
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    onAdd();
  }

  if (e.key === 'ArrowDown') {
    if (quantity <= 1) return;
    e.preventDefault();
    onDelete();
  }
};
