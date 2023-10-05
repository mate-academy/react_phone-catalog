import { Link } from 'react-router-dom';
import {
  sortDiscount,
  sortByYear,
  filterByPhones,
  filterByTablets,
  filterByAccessories,
} from '../../utils/filterHelper';
import styles from './HomePage.module.scss';
import { Carousel } from '../../components/Carousel';
import { ProductsSlider } from '../../components/ProductsSlider';
import { useProducts } from '../../Store';

export const HomePage = () => {
  const { products } = useProducts();

  return (
    <>
      <Carousel />
      <ProductsSlider title="Hot prices" products={sortDiscount(products)} />
      <div className={styles.categories}>
        <h1>Shop by category</h1>
        <div className={styles.categoriesBlock}>
          <div className={styles.categoriesProduct}>
            <Link
              to="catalog/phones"
              className={`${styles.categoriesProductImgBlock} ${styles.phones}`}
            >
              <img src="./_new/img/category-phones.png" alt="phones" />
            </Link>
            <h3>Mobile phones</h3>
            <p className="bodyText">{`${filterByPhones(products).length} models`}</p>
          </div>
          <div className={styles.categoriesProduct}>
            <Link
              to="catalog/tablets"
              className={`${styles.categoriesProductImgBlock} ${styles.tablets}`}
            >
              <img src="./_new/img/category-tablets.png" alt="phones" />
            </Link>
            <h3>Tablets</h3>
            <p className="bodyText">{`${filterByTablets(products).length} models`}</p>
          </div>
          <div className={styles.categoriesProduct}>
            <Link
              to="catalog/accessories"
              className={`${styles.categoriesProductImgBlock} ${styles.accessories}`}
            >
              <img src="./_new/img/category-accessories.png" alt="phones" />
            </Link>
            <h3>Accessories</h3>
            <p className="bodyText">{`${filterByAccessories(products).length} models`}</p>
          </div>
        </div>
      </div>
      <ProductsSlider
        title="Brand new models"
        products={sortByYear(products)}
      />
    </>
  );
};
