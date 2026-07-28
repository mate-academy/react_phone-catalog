import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../../utils/routes';
import { CATEGORY_IMAGES } from '../../../../constants';
import styles from './ShopByCategory.module.scss';

interface ProductCounts {
  phones: number;
  tablets: number;
  accessories: number;
}

type Props = {
  counts: ProductCounts;
};

const CATEGORIES = [
  {
    title: 'Mobile phones',
    route: AppRoutes.PHONES,
    image: CATEGORY_IMAGES.PHONES,
    countKey: 'phones' as const,
  },
  {
    title: 'Tablets',
    route: AppRoutes.TABLETS,
    image: CATEGORY_IMAGES.TABLETS,
    countKey: 'tablets' as const,
  },
  {
    title: 'Accessories',
    route: AppRoutes.ACCESSORIES,
    image: CATEGORY_IMAGES.ACCESSORIES,
    countKey: 'accessories' as const,
  },
];

export const ShopByCategory = ({ counts }: Props) => {
  return (
    <ul className={styles.list}>
      {CATEGORIES.map(({ title, route, image, countKey }) => (
        <li key={route} className={styles.item}>
          <Link to={route} className={styles.link}>
            <div className={styles.imageWrapper}>
              <img
                src={image}
                alt={title}
                className={styles.image}
                loading="lazy"
              />
            </div>
            <p className={styles.title}>{title}</p>
            <p className={styles.count}>{counts[countKey]} models</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
