import styles from './Category.module.scss';

export interface CategoryType {
  title: string;
  desc: string;
  img: string;
}

export const Category: React.FC<CategoryType> = ({ title, desc, img }) => {
  return (
    <div className={styles.category}>
      <div className={styles['category__image-wrapper']}>
        <img className={styles['category__image-src']} src={img} />
      </div>

      <h1 className={styles.category__title}>{title}</h1>

      <p className={styles.category__description}>{desc}</p>
    </div>
  );
};
