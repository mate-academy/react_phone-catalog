import styles from './AddButtons.module.scss';

export const AddButtons = () => (
  <div className={styles.buttons}>
    <button className={styles.buttons__cart}>Add to cart</button>
    <div className={styles.buttons__fav}>
      <img src="public/img/icons/heart.svg" alt="Heart Icon" />
    </div>
  </div>
);

export default AddButtons;
