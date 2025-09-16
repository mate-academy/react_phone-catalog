import { useState } from 'react';

enum LoadingStates {
  LOADING = 'Loading...',
  ERROR = 'Error',
}

const useLoadItems = <T>(loadFn: () => Promise<T>) => {
  const [items, setItems] = useState<T | LoadingStates>(LoadingStates.LOADING);

  const load = async () => {
    const data = await loadFn();

    setItems(data);
  };

  const loadItems = async () => {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await load();

        return;
      } catch (e) {
        if (attempt === 2) {
          setItems(LoadingStates.ERROR);
        } else {
          await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        }
      }
    }
  };

  return { items, loadItems };
};

export { LoadingStates, useLoadItems };
