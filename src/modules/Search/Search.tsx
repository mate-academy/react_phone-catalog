import { useDebounce } from '@/hooks/useDebounce';
import { FC, useEffect, useState } from 'react';
import { useFetch } from '../shared/hooks/useFetch';
import { Product } from '@/types/Product';
import { FetchOptions } from '@/types/FetchOptions';
import { getProductsByQuery } from '@/api/product.service';
import { Modal } from '@/modules/shared/components/Modal';

import styles from './Search.module.scss';
import { IoClose } from 'react-icons/io5';
import { SearchInput } from './components/SearchInput';
import { SearchList } from './components/SearchList';
import { Message } from '../shared/components/Message';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ITEMS_TO_SHOW = 10;

export const Search: FC<Props> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce<string>(query, 1000);

  const { data, loading } = useFetch<Product[]>(
    (options: FetchOptions) => {
      if (debouncedQuery === '') {
        return Promise.resolve([]);
      }

      return getProductsByQuery(debouncedQuery, ITEMS_TO_SHOW, options);
    },
    {
      initialValue: [],
      dependency: [debouncedQuery],
    },
  );

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.modal}>
      <Modal.Body className={styles.modalContent}>
        <div className={styles.searchBar}>
          <SearchInput
            className={styles.searchInput}
            value={query}
            onChange={setQuery}
          />
          <button className={styles.cancelBtn} onClick={onClose}>
            <IoClose size={16} />
            <span>Cancel</span>
          </button>
        </div>
        {debouncedQuery !== '' && (
          <div className={styles.mainContent}>
            {data.length === 0 && !loading ? (
              <Message>
                <Message.Description className={styles.notFoundMessage}>
                  No products founds
                </Message.Description>
              </Message>
            ) : (
              <SearchList
                products={data}
                isLoading={loading}
                itemsToLoad={ITEMS_TO_SHOW}
                className={styles.itemsList}
              />
            )}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};
