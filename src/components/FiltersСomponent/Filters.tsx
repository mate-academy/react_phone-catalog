import DropDownMenu from '../DropDownMenu/DropDownMenu';
import styles from './Filters.module.scss';

const sortOptions = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const pages = [
  { value: 'all', label: 'All' },
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
];

type Props = {
  sort: string;
  perPage: string;
  updateParams: (key: string, value: string) => void;
};

export const Filters: React.FC<Props> = ({ sort, updateParams, perPage }) => {
  return (
    <>
      <div className={styles.dropDownContainer}>
        <DropDownMenu
          title="Sort by:"
          variant="sortBy"
          sortVariables={sortOptions}
          updateParams={updateParams}
          selectedValue={sort}
        />
      </div>

      <div className={styles.dropDownContainer}>
        <DropDownMenu
          title="Items per page:"
          variant="perPage"
          sortVariables={pages}
          updateParams={updateParams}
          selectedValue={perPage}
        />
      </div>
    </>
  );
};

export default Filters;
