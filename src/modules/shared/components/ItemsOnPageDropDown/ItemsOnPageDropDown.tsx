import { useSearchParams } from 'react-router-dom';
import styles from './ItemsOnPageDropDown.module.scss';

export const ItemsOnPageDropDown = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultValue = searchParams.get('perPage');

  return (
    <>
      <div className={styles['drop-down']}>
        <label className={styles['drop-down__label']} htmlFor="sort">
          Items on page
        </label>
        <select
          defaultValue={defaultValue ?? 'all'}
          onChange={event => {
            setSearchParams(prev => {
              const perPage = prev.get('perPage');

              if (!perPage) {
                prev.append('perPage', event.target.value);
              } else {
                prev.set('perPage', event.target.value);
              }

              return prev;
            });
          }}
          className={styles['drop-down__select']}
          name="sort"
          id="sort"
        >
          <option className={styles['drop-down__option']} value="4">
            4
          </option>

          <option className={styles['drop-down__option']} value="8">
            8
          </option>

          <option className={styles['drop-down__option']} value="16">
            16
          </option>

          <option className={styles['drop-down__option']} value="all">
            All
          </option>
        </select>
      </div>
    </>
  );
};
