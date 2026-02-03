import PathCategory from '../PathCategory/PathCategory';
import styles from './style.module.scss';

interface CatalogueOptionsProps {
  totalProducts: number;
  sortBy: 'age' | 'title' | 'price';
  itemsPerPage: number;
  onSortChange: (sort: 'age' | 'title' | 'price') => void;
  onItemsPerPageChange: (value: number | string) => void;
}

const CatalogueOptions = ({
  totalProducts,
  sortBy,
  itemsPerPage,
  onSortChange,
  onItemsPerPageChange,
}: CatalogueOptionsProps) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as 'age' | 'title' | 'price');
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;

    if (value === 'all') {
      onItemsPerPageChange('all');
    } else {
      onItemsPerPageChange(Number(value));
    }
  };

  return (
    <div className={styles.options}>
      <PathCategory totalProducts={totalProducts} />
      <div className={styles.options_select}>
        <div className={styles.options_select_block}>
          <span className="text_small gray">Sort by</span>
          <select
            name="sort"
            id="sort"
            className={styles.options_select_block_variants}
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </div>

        <div className={styles.options_select_block}>
          <span className="text_small gray">Items on page</span>
          <select
            name="itemsPerPage"
            id="itemsPerPage"
            className={styles.options_select_block_variants}
            value={itemsPerPage >= totalProducts ? 'all' : itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CatalogueOptions;
