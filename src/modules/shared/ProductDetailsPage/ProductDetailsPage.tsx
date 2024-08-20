import styles from './ProductDetailsPage.module.scss';
import * as actionProduct from '../../../features/ProductSlice';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RandomProducts } from '../RandomProducts';
import { ProductDetails } from '../ProductDatails/ProductDetails';
import { Loader } from '../Loader';

export const ProductDetailsPage = () => {
  const dispath = useAppDispatch();
  const { pathname, search } = useLocation();

  useEffect(() => {
    const value = pathname.split('/')[1];

    if (value === 'phones') {
      dispath(actionProduct.fetchDetailsPhone());
    } else if (value === 'tablets') {
      dispath(actionProduct.fetchDetailsTablet());
    } else if (value === 'accessories') {
      dispath(actionProduct.fetchDetailsAccessories());
    }
  }, [dispath, pathname]);

  const { deteils, productDetails } = useAppSelector(state => state.product);
  const findIdProduct = pathname.split('/')[2];
  const productCategory = pathname.split('/')[1];
  const navigate = useNavigate();
  const productCategoryTitle = productCategory.replace(
    productCategory[0],
    productCategory[0].toUpperCase(),
  );

  useEffect(() => {
    const findProduct = deteils.find(product => product.id === findIdProduct);

    if (findProduct) {
      dispath(actionProduct.productDetails(findProduct));
    }
  }, [dispath, findIdProduct, deteils]);

  const goBack = () => {
    navigate({
      pathname: '..',
      search,
    });
  };

  return (
    <div className={styles.details}>
      <div className={styles.location}>
        <Link className={styles.location__home} to="/"></Link>
        <span className={styles.location__arrow}></span>
        <a
          className={styles.location__category}
          onClick={e => {
            e.preventDefault();
            goBack();
          }}
        >
          {productCategoryTitle}
        </a>
        <span className={styles.location__arrow__product}></span>
        <span className={styles.location__product}>{productDetails?.name}</span>
      </div>
      <div className={styles.location__block__back}>
        <span
          className={`${styles.location__arrow} ${styles.location__arrow__left}`}
        ></span>
        <a
          onClick={e => {
            e.preventDefault();
            goBack();
          }}
          className={styles.location__back}
        >
          Back
        </a>
      </div>

      {productDetails ? (
        <>
          <ProductDetails />
          <RandomProducts />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
