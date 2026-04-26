import { NavLink } from 'react-router-dom';
import { ProductsSlider } from '../ProductsSlider';
import styles from './HomePage.module.scss';
import phone from '../../../public/img/category-phones.webp';
import tablet from '../../../public/img/category-tablets.webp';
import accessories from '../../../public/img/category-accessories.webp';
import { ImageSlider } from './ImageSlider';
import { useContext } from 'react';
import { ProductsContext } from '../../contexts/products/ProductsStore';
import { prepereProducts } from '../../utils/prepereProducts';

export const HomePage: React.FC = () => {
  const { products } = useContext(ProductsContext);

  const phonesCount = prepereProducts(products, 'phones').length;
  const tabletsCount = prepereProducts(products, 'tablets').length;
  const accessesoriesCount = prepereProducts(products, 'accessories').length;

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      <ImageSlider />

      <ProductsSlider
        title={'Brand new models'}
        category={'phones'}
        sortBy={'year-desc'}
      />

      <section className={styles.categories}>
        <h2 className={styles.categories__title}>Shop by category</h2>
        <div className={styles.categories__container}>
          <div className={styles.categories__bunner}>
            <NavLink className={styles.categories__imgLinkPhone} to="phones">
              <img src={phone} alt="" />
            </NavLink>

            <NavLink className={styles.categories__lable} to="phones">
              <h4>Mobile phones</h4>
            </NavLink>
            <p className={styles.categories__counter}>{phonesCount} models</p>
          </div>
          <div className={styles.categories__bunner}>
            <NavLink className={styles.categories__imgLinkTablet} to="tablets">
              <img src={tablet} alt="" />
            </NavLink>

            <NavLink className={styles.categories__lable} to="tablets">
              <h4>Tablets</h4>
            </NavLink>
            <p className={styles.categories__counter}>{tabletsCount} models</p>
          </div>
          <div className={styles.categories__bunner}>
            <NavLink className={styles.categories__imgLinkAcc} to="accessories">
              <img src={accessories} alt="" />
            </NavLink>

            <NavLink className={styles.categories__lable} to="accessories">
              <h4>Accessories</h4>
            </NavLink>
            <p className={styles.categories__counter}>
              {accessesoriesCount} models
            </p>
          </div>
        </div>
      </section>

      <ProductsSlider
        title={'Hot prices'}
        category={'phones'}
        sortBy={'price-desc'}
      />
    </div>
  );
};
