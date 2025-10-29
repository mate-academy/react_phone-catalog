import styles from './Categories.module.scss';
import { useTabs } from '../../../../ProductsContext/TabsContext';
import { Link } from 'react-router-dom';

export const Categories = () => {
  const { productsList } = useTabs();

  const categoriesList = [
    {
      title: 'Mobile phones',
      src: './img/image/Categories/Phones.svg',
      color: '#4A4D58',
      category: 'phones',
    },
    {
      title: 'Tablets',
      src: './img/image/Categories/Tablets.svg',
      color: '#75767F',
      category: 'tablets',
    },
    {
      title: 'Accessories',
      src: './img/image/Categories/Accessories.svg',
      color: '#EB5757',
      category: 'accessories',
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.categories}>
        {categoriesList.map(cat => {
          const count = productsList.filter(
            p => p.category === cat.category,
          ).length;

          return (
            <Link
              key={cat.title}
              to={`${cat.category}`}
              className={styles.block}
            >
              <div className={styles.blockImg}>
                <img className={styles.img} src={cat.src} alt={cat.title} />
              </div>

              <div className={styles.links}>
                <h2 className={styles.titleLink}>{cat.title}</h2>
                <div className={styles.titleCount}>{count} models</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
