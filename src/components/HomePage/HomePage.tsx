import { NavLink } from 'react-router-dom';
import styles from './HomePage.module.scss';
import { ProductSlider } from '../ProductsSlider';
import { ModelsSlider } from '../ModelsSlider';
import { useEffect, useState } from 'react';
import { getProducts } from '../../utils/fetchClient';
import { Product } from '../../types/Product';
import { Category } from '../../types/Category';

const categories: {
  title: string;
  path: string;
  img: string;
  name: Category;
}[] = [
  {
    title: 'Mobile phones',
    path: '/phones',
    img: '/img/category-mobilephones.png',
    name: 'phones',
  },

  {
    title: 'Tablets',
    path: '/tablets',
    img: '/img/category-tablets.png',
    name: 'tablets',
  },

  {
    title: 'Accessories',
    path: '/accessories',
    img: '/img/category-accessories.png',
    name: 'accessories',
  },
];

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const numberOfModels: Record<Category, number> = {
    phones: products.filter(p => p.category === 'phones').length,
    tablets: products.filter(p => p.category === 'tablets').length,
    accessories: products.filter(p => p.category === 'accessories').length,
  };

  const newModelsProducts = products
    .sort((p1, p2) => p2.year - p1.year)
    .slice(0, 15);

  const hotPriceProducts = products
    .sort((p1, p2) => {
      const discount1 = p1.fullPrice - p1.price;
      const discount2 = p2.fullPrice - p2.price;

      return discount2 - discount1;
    })
    .slice(0, 15);

  return (
    <main className={styles.page}>
      <section className={styles.pageContent}>
        <h1 className={styles.pageTitle}> Welcome to Nice Gadgets store!</h1>
        <ProductSlider />
      </section>
      <section className={styles.pageContent}>
        <h2 className={styles.sectionTitle}>Brand new models</h2>
        <ModelsSlider
          products={newModelsProducts}
          arrowClassName="modelsSliderArrow"
        />
      </section>
      <section className={styles.pageContent}>
        <h2 className={styles.sectionTitle}>Shop by category</h2>
        <div className={styles.categoryCards}>
          {categories.map(category => (
            <NavLink
              className={styles.categoryLink}
              to={category.path}
              key={category.name}
            >
              <img
                src={category.img}
                alt={category.name}
                className={styles.categoryImg}
              />
              <div className={styles.categoryInfo}>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
                <span
                  className={styles.categoryCounter}
                >{`${numberOfModels[category.name]} models`}</span>
              </div>
            </NavLink>
          ))}
        </div>
      </section>
      <section className={styles.pageContent}>
        <h2 className={styles.sectionTitle}>Hot prices</h2>
        <ModelsSlider
          products={hotPriceProducts}
          arrowClassName="modelsSliderArrow"
        />
      </section>
    </main>
  );
};
