import React, { useEffect, useMemo } from 'react';
import styles from './ProductPage.module.scss';
import '../../styles/App.scss';
import NavLinks from '../NavLinks';
import SecondaryTitle from '../SecondaryTitle';
import NavButton from '../NavButton';
import ProductChoice from '../ProductChoice';
import ProductDescription from '../ProductDescription';
import ProductSlider from '../ProductSlider';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchProduct } from '../../store/slices/productSlice';
import { useParams } from 'react-router-dom';
import Loader from '../Loader';
import ProductNotFound from '../ProductsNotFound';

const ProductPage: React.FC = () => {
  const { product, shortProductInfo, shortProductsInfo, loading, error } =
    useSelector((state: RootState) => state.product);

  const dispatch = useDispatch<AppDispatch>();

  const { productId } = useParams() as { productId: string };

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  const categoryName = useMemo(() => {
    return product
      ? product.category[0].toUpperCase() +
          product.category.slice(1).toLowerCase()
      : '';
  }, [product]);

  return (
    <main className={styles['product-page']} key={product?.id}>
      {loading && !error && <Loader />}

      {error && !loading && <ProductNotFound />}

      {!loading && !error && (
        <>
          <div
            className={`${styles['product-page__top']} page__wrapper-center`}
          >
            <div className={styles['product-page__links']}>
              {product?.category && product.category !== null && (
                <NavLinks
                  text={categoryName}
                  notActive={false}
                  linkTo={`/${product?.category}`}
                />
              )}
              <NavButton
                right={true}
                linkTo={`/${product?.category}/${product?.namespaceId}`}
                notActive={true}
              >
                {product?.name}
              </NavButton>
            </div>

            <div className={styles['product-page__title-wrapper']}>
              <NavButton right={false}>Back</NavButton>

              {product !== null && (
                <SecondaryTitle>{product.name}</SecondaryTitle>
              )}
            </div>
          </div>

          <div className="page__wrapper-center">
            {product !== null && shortProductInfo !== null && (
              <ProductChoice
                product={product}
                currentProduct={shortProductInfo}
              />
            )}
          </div>

          <div className="page__wrapper-center page__product">
            {product !== null && shortProductInfo !== null && (
              <ProductDescription product={product} />
            )}
          </div>

          <div className="page__product">
            {shortProductsInfo !== null && (
              <ProductSlider
                title="You may also like"
                products={shortProductsInfo}
              />
            )}
          </div>
        </>
      )}
    </main>
  );
};

export default ProductPage;
