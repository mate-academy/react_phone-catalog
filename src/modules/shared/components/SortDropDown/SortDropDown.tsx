import styles from './SortDropDown.module.scss';

export const SortDrowDown = () => {
  return (
    <>
      <div>
        <label className={styles['drop-down']} htmlFor="sort">
          Sort by
          <select name="sort" id="sort">
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </label>
      </div>
    </>
  );
};
