import styles from './Menu.module.scss';

export const Menu = () => {
  return (
    <div className={styles.burger}>
      <img className={styles.image} src="img/icons/burger.svg" alt="menu" />
    </div>
  );
};
