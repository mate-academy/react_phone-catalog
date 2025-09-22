import { useState } from 'react';

enum Status {
  LOADING = 'Loading...',
  ERROR = 'Error',
}

const useLoadItems = <T>(loadFn: () => Promise<T | Status>) => {
  const [items, setItems] = useState<T | Status>(Status.LOADING);

  const load = async () => {
    setItems(Status.LOADING);
    const data = await loadFn();

    if (!data || (data as T[]).length === 0) {
      setItems(Status.ERROR);

      return;
    }

    setItems(data);
  };

  const loadItems = async () => {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await load();

        return;
      } catch (e) {
        if (attempt === 2) {
          setItems(Status.ERROR);
        } else {
          await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        }
      }
    }
  };

  return { items, loadItems };
};

export { Status, useLoadItems };
