import { Link, useSearchParams } from 'react-router-dom';
import styles from './SortDropDown.module.scss';

export const SortDropDown = () => {
  const [searechParams, setSearchParams] = useSearchParams();

  return (
    <>
      <div className={styles['drop-down']}>
        <label className={styles['drop-down__label']} htmlFor="sort">
          Sort by
        </label>
        <select
          onChange={event => {
            if (event.target.value === 'age') {
              setSearchParams(prev => {
                const param = prev.get('sort');

                if (param === null) {
                  prev.append('sort', 'age');
                } else {
                  prev.set('sort', 'age');
                }

                return prev;
              });
            } else if (event.target.value === 'price') {
              setSearchParams(prev => {
                const param = prev.get('sort');

                if (param === null) {
                  prev.append('sort', 'price');
                } else {
                  prev.set('sort', 'price');
                }

                return prev;
              });
            } else if (event.target.value === 'title') {
              setSearchParams(prev => {
                const param = prev.get('sort');

                if (param === null) {
                  prev.append('sort', 'title');
                } else {
                  prev.set('sort', 'title');
                }

                return prev;
              });
            }
          }}
          className={styles['drop-down__select']}
          name="sort"
          id="sort"
        >
          <button></button>
          <option className={styles['drop-down__option']} value="age">
            <Link to={`/phones?${searechParams.toString()}`}>Newest</Link>
          </option>

          <option className={styles['drop-down__option']} value="title">
            Alphabetically
          </option>

          <option className={styles['drop-down__option']} value="price">
            Cheapest
          </option>
        </select>
      </div>
    </>
  );
};
