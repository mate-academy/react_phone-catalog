import styles from './SortDropDown.module.scss';

export const SortDropDown = () => {
  return (
    <>
      <div className={styles['drop-down']}>
        <label className={styles['drop-down__label']} htmlFor="sort">
          Sort by
        </label>
        <select className={styles['drop-down__select']} name="sort" id="sort">
          <button></button>
          <option className={styles['drop-down__option']} value="age">
            Newest
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
