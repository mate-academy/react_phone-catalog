import { getAssetUrl } from '../../../../shared/asset';

import styles from './CategoryGrid.module.scss';

type Props = {
  navigate: (to: string) => void;
};

const categories = [
  {
    title: 'Phones',
    count: '6 products',
    image: '/img/category-phones.png',
    path: '/phones',
  },
  {
    title: 'Tablets',
    count: '4 products',
    image: '/img/category-tablets.png',
    path: '/tablets',
  },
  {
    title: 'Accessories',
    count: '4 products',
    image: '/img/category-accessories.png',
    path: '/accessories',
  },
];

export default function CategoryGrid({ navigate }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <span>CATEGORIES</span>

        <h2>Shop by category</h2>
      </div>

      <div className={styles.grid}>
        {categories.map(category => (
          <button
            type="button"
            key={category.path}
            className={styles.card}
            onClick={() => navigate(category.path)}
          >
            <div className={styles.image}>
              <img src={getAssetUrl(category.image)} alt={category.title} />
            </div>

            <h3>{category.title}</h3>

            <span>{category.count} →</span>
          </button>
        ))}
      </div>
    </section>
  );
}
