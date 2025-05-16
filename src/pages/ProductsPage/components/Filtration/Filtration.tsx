import styles from './Filtration.module.scss';
import { DropDown } from '../DropDown';
import { useSearchParams } from 'react-router-dom';
import { DefaultParams } from '../../../../types/DefaultParams';

type Props = {
  defaultParams: DefaultParams;
  sortField: string;
  count: string;
};

export const Filtration = ({
  defaultParams,
  sortField,
  count,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOptions = {
    [defaultParams.sortField]: 'Newest',
    name: 'Alphabetically',
    price: 'Cheapest',
  };

  const itemsOptions = {
    [defaultParams.count]: 'All',
    '16': '16',
    '8': '8',
    '4': '4',
  };

  const handleSortChange = (option: string) => {
    const updatedParams = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...updatedParams, sortField: option, page: '1' });
  };

  const handleItemsChange = (option: string) => {
    const updatedParams = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...updatedParams, count: option, page: '1' });
  };

  return (
    <>
      <div className={styles.filters}>
        <div className={styles.filters__filter}>
          <p className={styles.filters__name}>Sort by</p>
          <DropDown
            options={sortOptions}
            value={sortOptions[sortField]}
            onOptionSelect={handleSortChange}
          />
        </div>

        <div className={styles.filters__filter}>
          <p className={styles.filters__name}>Items on page</p>
          <DropDown
            options={itemsOptions}
            value={itemsOptions[count]}
            onOptionSelect={handleItemsChange}
          />
        </div>
      </div>
    </>
  );
};