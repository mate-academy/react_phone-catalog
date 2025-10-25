import classNames from 'classnames';
import styles from './HomePage.module.scss';

import { useCallback, useEffect, useState } from 'react';
import { getProducts } from '../../api/api';
import { Product } from '../../types/Product';
import { Category } from '../../components/Category';
import { CategoryData } from '../../types/CategoryData';
import { CategoryType } from '../../types/CategoryType';
import { ProductsSlider } from '../../components/ProductsSlider';

// eslint-disable-next-line max-len
import categoryAccessories from '../../assets/categories/category-accessories.png';
import categoryPhones from '../../assets/categories/category-phones.png';
import categoryTablets from '../../assets/categories/category-tablets.png';
import productNotFound from '../../assets/product-not-found.png';
import { PicturesSlider } from '../../components/PicturesSlider';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const getCountItems = useCallback(
    (category: CategoryType) => {
      return products.filter(product => product.category === category).length;
    },
    [products],
  );

  const getDataCategory = useCallback(
    (category: CategoryType) => {
      const data: CategoryData = {
        title: '',
        link: category,
        img: productNotFound,
        amountItems: getCountItems(category),
      };

      switch (category) {
        case CategoryType.PHONES:
          data.title = 'Mobile phones';
          data.img = categoryPhones;
          break;
        case CategoryType.TABLETS:
          data.title = 'Tablets';
          data.img = categoryTablets;
          break;
        case CategoryType.ACCESSORIES:
          data.title = 'Accessories';
          data.img = categoryAccessories;
          break;
      }

      return data;
    },
    [getCountItems],
  );

  return (
    <>
      <section className="section">
        <h1 className={classNames('title', styles['title--hidden'])}>
          Product Catalog
        </h1>

        <h2 className={classNames('title', styles.title)}>
          Welcome to Nice Gadgets store!
        </h2>
        <PicturesSlider />
      </section>
      <section className={classNames('section', styles['brand-section'])}>
        <h2 className={classNames('sub-title', 'sub-title--short')}>
          Brand new models
        </h2>
        <ProductsSlider products={products} mode="newest" />
      </section>
      <section className="section">
        <h2 className={classNames('sub-title')}>Shop by category</h2>
        <div className={styles.categories}>
          <Category
            data={getDataCategory(CategoryType.PHONES)}
            className={styles.categories__category}
          />
          <Category
            data={getDataCategory(CategoryType.TABLETS)}
            className={styles.categories__category}
          />
          <Category
            data={getDataCategory(CategoryType.ACCESSORIES)}
            className={styles.categories__category}
          />
        </div>
      </section>
      <section className={classNames('section', styles['brand-section'])}>
        <h2 className={classNames('sub-title', 'sub-title--short')}>
          Hot prices
        </h2>
        <ProductsSlider products={products} mode="discount" />
      </section>
    </>
  );
};
