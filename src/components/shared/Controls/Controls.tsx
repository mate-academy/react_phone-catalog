import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Product } from '../../../type/Product';
import styles from './Controls.module.scss';
import { GlobalContext } from '../GlobalContext/GlobalContext';
import { CustomSelectString } from '../CustomSelectString/CustomSelect';
// eslint-disable-next-line max-len
import { CustomSelectNumberOrAll } from '../CustomSelectNumberOrAll/CustomSelectNumberOrAll';
import { Option } from '../../../type/Option';

type Props = {
  products: Product[];
  setSortedProducts: Dispatch<SetStateAction<Product[]>>;
  setItemsPerPage: Dispatch<SetStateAction<number | 'all'>>;
  itemsPerPage: number | 'all';
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export const Controls: React.FC<Props> = ({
  products,
  setSortedProducts,
  setItemsPerPage,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const { isSunSelected } = useContext(GlobalContext);
  const [sortKey, setSortKey] = useState('newest');

  useEffect(() => {
    const sortItems = () => {
      let sortedArray = [];

      switch (sortKey) {
        case 'alphabetically':
          sortedArray = [...products].sort((a, b) =>
            a.name.localeCompare(b.name),
          );
          break;
        case 'cheapest':
          sortedArray = [...products].sort((a, b) => a.price - b.price);
          break;
        default:
          sortedArray = [...products].sort((a, b) => b.year - a.year);
      }

      setSortedProducts(sortedArray);
    };

    sortItems();
  }, [sortKey, products, setSortedProducts]);

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'alphabetically', label: 'Alphabetically' },
    { value: 'cheapest', label: 'Cheapest' },
  ];

  const itemsPerPageOptions: Option<number | 'all'>[] = [
    { value: 'all', label: 'All' },
    { value: 4, label: '4' },
    { value: 8, label: '8' },
    { value: 16, label: '16' },
  ];

  return (
    <div className={styles.controls}>
      <div className={styles.controls__container}>
        <CustomSelectString
          options={sortOptions}
          value={sortKey}
          onChange={setSortKey}
          label="Sort by"
          darkMode={!isSunSelected}
        />
        <CustomSelectNumberOrAll
          options={itemsPerPageOptions}
          value={itemsPerPage}
          onChange={setItemsPerPage}
          label="Items on page"
          darkMode={!isSunSelected}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
