import classNames from 'classnames';
import styles from './HomePage.module.scss';
import { PicturesSlider } from '../../components/PicturesSlider';
import { useCallback, useEffect, useState } from 'react';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { Category } from '../../components/Category';
import { CategoryData } from '../../types/CategoryData';
import { CategoryType } from '../../types/CategoryType';
import { ProductsSlider } from '../../components/ProductsSlider';

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
        img: 'img/product-not-found.png',
        amountItems: getCountItems(category),
      };

      switch (category) {
        case CategoryType.PHONES:
          data.title = 'Mobile phones';
          data.img = 'img/category-phones.png';
          break;
        case CategoryType.TABLETS:
          data.title = 'Tablets';
          data.img = 'img/category-tablets.png';
          break;
        case CategoryType.ACCESSORIES:
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
