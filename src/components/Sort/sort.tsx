import { SortType } from '../../Types/type';
import './sort.scss';

interface SortProps {
  sortNumber: number,
  setSortNumber: (x: number) => void;
  onSortChange: (x: SortType) => void
}

export const Sort = ({ setSortNumber, onSortChange }: SortProps) => {

  const sortByNumber = (number: number) => {
    setSortNumber(number);
  }

  return (
    <div className="sort">
      <div className="sort__container">
        <label htmlFor="query" className="sort__container__label">
          Sort by
        </label>
        <select
          name="sort by query"
          id="query"
          className="sort__container__select--by"
          defaultValue={''}
          onChange={(e) => onSortChange(e.target.value as SortType)}
        >
          <option value="expensive">Expensive</option>
          <option value="cheaper">Cheaper</option>
          <option value="discount">Discount</option>
        </select>
      </div>

      <div className="sort__container">
        <label htmlFor="number" className="sort__container__label">
          Items on page
        </label>
        <select
          name="sort by number"
          id="number"
          className="sort__container__select--number"
          onChange={(e) => sortByNumber(Number(e.target.value))}
          defaultValue={'16'}
        >
          <option
          value="8"
          >
            8
          </option>
          <option
          value="16"
          >
            16
          </option>
          <option
          value="32"
          >
            32
          </option>
        </select>
      </div>
    </div>
  );
};
