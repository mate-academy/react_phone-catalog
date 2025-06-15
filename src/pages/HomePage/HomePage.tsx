import classNames from 'classnames';
import styles from './HomePage.module.scss';
import { useEffect, useState, useCallback } from 'react';

import { Product } from '../../types/Product';
import { getData } from '../../utils/fetchClients';

import { ProductsSlider } from '../../components/ProductsSlider';
import { Category } from '../../components/Category';
import { PicturesSlider } from '../../components/PicturesSlider';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getData<Product[]>(`api/products.json`).then(setProducts);
  }, []);

  const getCountItems = useCallback(
    (category: string) => {
      return products.filter(product => product.category === category).length;
    },
    [products],
  );

  const getDataCategory = useCallback(
    (category: string) => {
      const data = {
        title: '',
        countItems: getCountItems(category),
        link: category,
        img: 'img/product-not-found.png',
        modeficator: category,
      };

      switch (category) {
        case 'phones':
          data.title = 'Mobile phones';
          data.img = 'img/category-phones.webp';
          break;
        case 'tablets':
          data.title = 'Tablets';
          data.img = 'img/category-tablets.webp';
          break;
        case 'accessories':
          data.title = 'Accessories';
          data.img = 'img/category-accessories.png';
          break;
      }

      return data;
    },
    [getCountItems],
  );

  return (
    <>
      <section className={classNames('section', styles.welcome)}>
        <h1 className={classNames('title', styles['title--hidden'])}>
          Product Catalog
        </h1>

        <h2 className={classNames('title', styles.title)}>
          Welcome to Nice Gadgets store!
        </h2>

        <PicturesSlider />
      </section>

      <section className={classNames('section', styles['brand-new-models'])}>
        <h2
          className={classNames(
            'sub-title',
            styles['sub-title'],
            styles['sub-title--short'],
          )}
        >
          Brand new models
        </h2>

        <ProductsSlider products={products} />
      </section>

      <section className="section">
        <h2 className={classNames('sub-title', styles['sub-title'])}>
          Shop by category
        </h2>

        <div className={styles.categories}>
          <Category
            data={getDataCategory('phones')}
            className={styles.categories__category}
          />
          <Category
            data={getDataCategory('tablets')}
            className={styles.categories__category}
          />
          <Category
            data={getDataCategory('accessories')}
            className={styles.categories__category}
          />
        </div>
      </section>

      <section className={classNames('section', styles['brand-new-models'])}>
        <h2
          className={classNames(
            'sub-title',
            styles['sub-title'],
            styles['subTitle--short'],
          )}
        >
          Hot prices
        </h2>

        <ProductsSlider products={products} />
      </section>
    </>
  );
};
