import styles from './ProductsSkeleton.module.scss';

type Props = {
  count?: number;
};

export const ProductsSkeleton: React.FC<Props> = ({ count = 8 }) => (
  <ul className={styles.grid} aria-hidden="true">
    {Array.from({ length: count }).map((_, index) => (
      <li key={index} className={styles.card}>
        <div className={`${styles.block} ${styles.card__image}`} />
        <div className={`${styles.block} ${styles.card__line}`} />
        <div
          className={`${styles.block} ${styles.card__line} ${styles['card__line--short']}`}
        />
        <div className={`${styles.block} ${styles.card__price}`} />
        <div className={`${styles.block} ${styles.card__button}`} />
      </li>
    ))}
  </ul>
);
