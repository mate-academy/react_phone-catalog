import styles from './ItemsOnPageDropDown.module.scss';

export const ItemsOnPageDropDown = () => {
  return (
    <>
      <div className={styles['drop-down']}>
        <label className={styles['drop-down__label']} htmlFor="sort">
          Items on page
        </label>
        <select className={styles['drop-down__select']} name="sort" id="sort">
          <button></button>
          <option className={styles['drop-down__option']} value="age">
            4
          </option>

          <option className={styles['drop-down__option']} value="title">
            8
          </option>

          <option className={styles['drop-down__option']} value="price">
            16
          </option>

          <option className={styles['drop-down__option']} value="price">
            All
          </option>
        </select>
      </div>
    </>
  );
};
