import styles from './Categories.module.scss';
import { NavLink } from 'react-router-dom';

export const Categories = () => {
  return (
    <section className={styles.categories}>
      <h1 className={styles.categories__title}>Shop by category</h1>

      <article className={styles.categories__card}>
        <NavLink
          to={'/phones'}
          className={`${styles.categories__photo} ${styles.categories__photo_phones}`}
        ></NavLink>
        <NavLink to={'/phones'} className={styles.categories__linkTitle}>
          Mobile phones
        </NavLink>
        <p className={styles.categories__count}>95 models</p>
      </article>

      <article className={styles.categories__card}>
        <NavLink
          to={'/tablets'}
          className={`${styles.categories__photo} ${styles.categories__photo_tablets}`}
        ></NavLink>
        <NavLink to={'/tablets'} className={styles.categories__linkTitle}>
          Tablets
        </NavLink>
        <p className={styles.categories__count}>24 models</p>
      </article>

      <article className={styles.categories__card}>
        <NavLink
          to={'/accessories'}
          className={`${styles.categories__photo} ${styles.categories__photo_accessories}`}
        ></NavLink>
        <NavLink to={'/accessories'} className={styles.categories__linkTitle}>
          Accessories
        </NavLink>
        <p className={styles.categories__count}>100 models</p>
      </article>
    </section>
  );
};
