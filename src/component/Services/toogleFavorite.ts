export function toggleItemStorage(
  key: string,
  itemId: string,
  setState: React.Dispatch<React.SetStateAction<string[]>>,
  e: React.MouseEvent,
) {
  e.preventDefault();
  const items = JSON.parse(localStorage.getItem(key) || '[]');
  const updatedItems = items.includes(itemId)
    ? items.filter((id: string) => id !== itemId)
    : [...items, itemId];

  localStorage.setItem(key, JSON.stringify(updatedItems));
  setState(updatedItems);

  if (key === 'favorite') {
    window.dispatchEvent(new Event('favoritesChanged'));
  } else {
    window.dispatchEvent(new Event('cartChanged'));
  }
}
