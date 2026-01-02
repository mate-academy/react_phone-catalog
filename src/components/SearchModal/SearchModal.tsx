import { FC, useState } from 'react';
import { Modal } from '../Modal';

import styles from './SearchModal.module.scss';
import { Search } from './components/Search';
import { IoClose } from 'react-icons/io5';
import { SearchList } from './components/SearchList';
import { useFetch } from '@/modules/shared/hooks/useFetch';
import { Product } from '@/types/Product';
import { getProductsByQuery } from '@/api/product.service';
import { Options } from '@/types/FetchOptions';
import { useDebounce } from '@/hooks/useDebounce';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: FC<Props> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  const debouncedValue = useDebounce<string>(query, 1000);

  const { data, loading } = useFetch<Product[]>(
    (options: Options) => {
      if (debouncedValue === '') {
        return Promise.resolve([]);
      }

      return getProductsByQuery(debouncedValue, 10, options);
    },
    {
      initialValue: [],
      dependency: [debouncedValue],
    },
  );

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className={styles.modal}>
      <div className={styles.searchBar}>
        <Search
          className={styles.searchInput}
          value={query}
          onChange={setQuery}
        />
        <button className={styles.cancelBtn} onClick={handleClose}>
          <IoClose size={16} />
          <span>Cancel</span>
        </button>
      </div>
      <div className={styles.contentWrapper}>
        <SearchList products={data} isLoading={loading} itemsToLoad={10} />
      </div>
    </Modal>
  );
};
