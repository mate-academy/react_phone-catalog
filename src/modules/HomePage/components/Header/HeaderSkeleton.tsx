import styles from './Header.module.scss';
import classNames from 'classnames';

export const HeaderSkelton = () => {
  return (
    <header className={styles.container}>
      <div className={styles.skeleton}>
        <h1
          className={classNames(styles.header__title, styles.skeleton__title)}
        />
      </div>
      <div
        className={classNames(styles.header__slider, styles.skeleton__slider)}
      >
        <div className={styles.skeleton__button} />
        <div className={styles.skeleton__image} />
        <div className={styles.skeleton__button} />
      </div>
    </header>
  );
};
