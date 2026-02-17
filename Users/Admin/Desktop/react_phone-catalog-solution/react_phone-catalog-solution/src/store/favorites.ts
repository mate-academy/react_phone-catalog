export type FavoriteItem = {
  id: string;
  color: string;
  capacity: string;
};

const KEY = 'favorites';

function read(): FavoriteItem[] {
  return JSON.parse(localStorage.getItem(KEY) || '[]');
}

function write(items: FavoriteItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('storage-update'));
}

export function getFavorites(): FavoriteItem[] {
  return read();
}

export function getFavoritesCount(): number {
  return read().length;
}

export function isFavorite(
  id: string,
  color: string,
  capacity: string
): boolean {
  return read().some(
    item =>
      item.id === id &&
      item.color === color &&
      item.capacity === capacity
  );
}

export function toggleFavorite(
  id: string,
  color: string,
  capacity: string
) {
  const items = read();

  const index = items.findIndex(
    item =>
      item.id === id &&
      item.color === color &&
      item.capacity === capacity
  );

  if (index >= 0) {
    items.splice(index, 1);
  } else {
    items.push({ id, color, capacity });
  }

  write(items);
}

export function removeFromFavorites(
  id: string,
  color: string,
  capacity: string
) {
  const items = read().filter(
    item =>
      !(
        item.id === id &&
        item.color === color &&
        item.capacity === capacity
      )
  );

  write(items);
}