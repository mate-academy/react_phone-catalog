import styles from './SecondaryButton.module.scss';

export const SecondaryButton = () => {
  return (
    <button type="button" className={styles.secondaryButton}>
      <img src="../../img/icons/favourite.svg" />
    </button>
  );
};
