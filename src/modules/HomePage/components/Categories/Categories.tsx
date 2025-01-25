// import { useContext } from 'react';

import styles from './Categories.module.scss';

// import { ProductsContext } from '@store/ProductsStore';

type Category = {
  bgColor: string;
  title: string;
  img: string;
};

export const Categories = () => {
  // const products = useContext(ProductsContext);

  const categories: Category[] = [
    {
      bgColor: '#6D6474',
      title: 'Mobile phones',
      img: './img/category-phones.webp',
    },
    {
      bgColor: '#8D8D92',
      title: 'Tablets',
      img: './img/category-tablets.png',
    },
    {
      bgColor: '#D53C51',
      title: 'Accessories',
      img: './img/category-accessories.png',
    },
  ];

  return (
    <section className={styles.categories}>
      <div className={styles.categories__header}>
        <h2>Shop by category</h2>
      </div>

      <div className={styles.categories__categories}>
        {categories.map(category => (
          <div key={category.title} className={styles.categories__category}>
            <article className={styles.category}>
              <img src={category.img} className={styles.category__image} />

              <div>{category.title}</div>
              <div> models</div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};
