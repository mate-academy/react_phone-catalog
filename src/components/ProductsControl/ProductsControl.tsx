import { DropDown } from '../DropDown';
import './ProductsControl.scss';

type Props = {
  sortType: string;
  perPage: string;
  onSortChange: (value: string) => void;
  onPerPageChange: (value: string) => void;
};

export const ProductsControls = ({
  sortType,
  perPage,
  onSortChange,
  onPerPageChange,
}: Props) => {
  return (
    <div className="products-controls">
      <div className="products-controls__field">
        <span className="products-controls__label">Sort by</span>
        <DropDown
          value={sortType}
          onChange={onSortChange}
          options={[
            { value: 'newest', label: 'Newest' },
            { value: 'alphabetically', label: 'Alphabetically' },
            { value: 'cheapest', label: 'Cheapest' },
          ]}
        />
      </div>

      <div className="products-controls__field">
        <span className="products-controls__label">Items on page</span>
        <DropDown
          value={perPage}
          onChange={onPerPageChange}
          options={[
            { value: '4', label: '4' },
            { value: '8', label: '8' },
            { value: '16', label: '16' },
            { value: 'all', label: 'All' },
          ]}
        />
      </div>
    </div>
  );
};
