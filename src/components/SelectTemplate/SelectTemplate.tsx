import { ItemsPerPage } from '../../types/ItemsPerPage';
import { SortOption } from '../../types/SortOption';
import './SelectTemplate.scss';

type Props = {
  category: string,
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  value: SortOption | ItemsPerPage,
  sortBy: string,
};

export const SelectTemplate: React.FC<Props> = ({
  category, onChange, value, sortBy,
}) => {
  if (sortBy === 'age') {
    return (
      <div className={`${category}-page__sort-by`}>
        <label className={`${category}-page__label`} htmlFor="sort-by">Sort by:</label>
        <select
          className={`${category}-page__select`}
          id="sort-by"
          name="sort-by"
          onChange={onChange}
          value={value}
        >
          <option value="age">Newest</option>
          <option value="price">Cheapest</option>
          <option value="name">Alphabetically</option>
        </select>
      </div>
    );
  }

  return (
    <div className={`${category}-page__items-per-page`}>
      <label className={`${category}-page__label`} htmlFor="items-per-page">Items per page:</label>
      <select
        className={`${category}-page__select`}
        id="items-per-page"
        name="items-per-page"
        onChange={onChange}
        value={value}
      >
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="16">16</option>
        <option value="All">All</option>
      </select>
    </div>
  );
};
