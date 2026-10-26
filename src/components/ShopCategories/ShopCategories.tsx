import { Link } from 'react-router-dom';
import styles from './ShopCategories.module.scss';

type Props = {
  title: string;
  categoriesData: {
    title: string;
    quantity: number;
    to: string;
    src: string;
  }[];
};

export const ShopCategories: React.FC<Props> = ({ title, categoriesData }) => {
  return (
    <article className={styles.categories}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {categoriesData.map(cat => (
          <li key={cat.title} className={styles.item}>
            <Link className={styles.link} to={cat.to}>
              <img className={styles.image} src={cat.src} alt="" />
            </Link>
            <div className={styles.info}>
              <span className={styles.category}>{cat.title}</span>
              <span
                className={styles.quantity}
              >{`${cat.quantity} models`}</span>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
};
