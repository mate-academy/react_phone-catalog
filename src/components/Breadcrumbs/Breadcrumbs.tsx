import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs = () => {
  return (
    <div className={styles.breadcrumbs}>
      <ul className={styles.breadcrumbs__list}>
        <li className={styles.breadcrumbs__item}>
          <a className={styles.breadcrumbs__link} href="#">
            <img
              className="breadcrumbs__img"
              src="/img/icons/home.svg"
              alt="Home icon"
            />
          </a>
        </li>
        <li className={styles.breadcrumbs__item}>
          <a className={styles.breadcrumbs__link} href="#">
            Phones
          </a>
        </li>
      </ul>
    </div>
  );
};
