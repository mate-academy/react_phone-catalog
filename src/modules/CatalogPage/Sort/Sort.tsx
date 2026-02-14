import { Phone, SortType } from '../../../Types/type';
import style from'./Sort.module.scss';

interface SortProps {
  sortNumber: number,
  products: Phone[]
  setSortNumber: (x: number) => void;
  onSortChange: (x: SortType) => void
}

export const Sort = ({ setSortNumber, onSortChange, products }: SortProps) => {

  const sortByNumber = (query: string) => {
    if (query === 'all') {
      setSortNumber(products.length)
    } else {
      setSortNumber(Number(query));
    }
  }

  return (
    <div className={style.sort}>
      <div className={style.sort__container}>
        <label htmlFor="query" className={style.sort__container__label}>
          Sort by
        </label>
        <select
          name="sort by query"
          id="query"
          className={style[`sort__container__select--by`]}
          defaultValue={''}
          onChange={(e) => onSortChange(e.target.value as SortType)}
        >
          <option value="expensive">Expensive</option>
          <option value="cheaper">Cheaper</option>
          <option value="discount">Discount</option>
        </select>
      </div>

      <div className={style.sort__container}>
        <label htmlFor="number" className={style.sort__container__label}>
          Items on page
        </label>
        <select
          name="sort by number"
          id="number"
          className={style[`sort__container__select--number`]}
          onChange={(e) => sortByNumber(e.target.value)}
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
          <option
          value="all"
          >
            all
          </option>
        </select>
      </div>
    </div>
  );
};
