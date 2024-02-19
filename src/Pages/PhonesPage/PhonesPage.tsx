import { useCallback, useState } from 'react';
import { PhonesPageView } from './PhonePageView';
import { PhonesPageProps } from './types';

export const PhonesPage: React.FC<PhonesPageProps> = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsOnPage, setItemsOnPage] = useState(16);
  const [sortedItems, setSortedItems] = useState(items);

  const lastItemIndex = currentPage * itemsOnPage;
  const firstItemIndex = lastItemIndex - itemsOnPage;
  const currentItems = sortedItems.slice(firstItemIndex, lastItemIndex);

  const changeItemsPerPage = useCallback((option: string) => {
    if (option === 'All') {
      setItemsOnPage(items.length);

      return;
    }

    setItemsOnPage(+option);
  }, [items]);

  const sortItems = useCallback((option: string) => {
    const newItems = [...sortedItems].sort((a, b) => {
      switch (option) {
        case 'Newest':
          return b.year - a.year;
        case 'Alphabetically':
          return a.name.localeCompare(b.name);
        case 'Cheapest':
          return a.price - b.price;
        default:
          return 0;
      }
    });

    setSortedItems(newItems);
  }, [sortedItems]);

  return (
    <PhonesPageView
      totalItems={items.length}
      itemsOnPage={itemsOnPage}
      changeItemsPerPage={changeItemsPerPage}
      currentItems={currentItems}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      sortItems={sortItems}
    />
  );
};
