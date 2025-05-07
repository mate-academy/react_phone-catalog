import React from 'react';
import { SortType } from '../../utils/types';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './SortProducts.module.scss';
import './dropdown.scss';

type Props = {
  selectedSortType: string;
  searchParams: URLSearchParams;
  setSearchParams: (value: URLSearchParams) => void;
  itemsOnPage: string;
};
export const SortProducts: React.FC<Props> = ({
  selectedSortType,
  searchParams,
  setSearchParams,
  itemsOnPage,
}) => {
  const handleSortTypeChange = (sortType: string | null) => {
    if (sortType !== null) {
      const params = new URLSearchParams(searchParams);

      params.set('sort', sortType);
      setSearchParams(params);
    }
  };

  const handlePagesChange = (selectedItemsOnPage: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (selectedItemsOnPage) {
      params.set('perPage', selectedItemsOnPage);
      setSearchParams(params);
    }
  };

  return (
    <div className={styles.selects}>
      <div className={styles.selects__select}>
        <label htmlFor="sortField" className={styles.selects__label}>
          Sort by
        </label>

        <Dropdown onSelect={handleSortTypeChange}>
          <Dropdown.Toggle>
            {selectedSortType === SortType.newest
              ? 'Newest'
              : selectedSortType === SortType.alpha
                ? 'Alphabetically'
                : 'Cheapest'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey={SortType.newest}>Newest</Dropdown.Item>
            <Dropdown.Item eventKey={SortType.alpha}>
              Alphabetically
            </Dropdown.Item>
            <Dropdown.Item eventKey={SortType.cheapest}>Cheapest</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className={styles.selects__select}>
        <label htmlFor="itemsOnPage" className={styles.selects__label}>
          Items on page
        </label>

        <Dropdown onSelect={handlePagesChange}>
          <Dropdown.Toggle>
            {itemsOnPage === 'all' ? 'All' : itemsOnPage}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="all">all</Dropdown.Item>
            <Dropdown.Item eventKey="4">4</Dropdown.Item>
            <Dropdown.Item eventKey="8">8</Dropdown.Item>
            <Dropdown.Item eventKey="16">16</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};
