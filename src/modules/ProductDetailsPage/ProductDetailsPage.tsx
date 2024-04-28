import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { useLocation, useParams } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import classNames from 'classnames';
import { BackBtn } from '../../components/BackBtn/BackBtn';
import { Loader } from '../../components/Loader';
import { ImgsSlider } from './components/ImgsSlider';
import { VariableChars } from './components/VariableChars';
import { ProductAction } from './components/ProductAction';
import { TechCharsShort } from './components/TechCharsShort';
import { TechCharsFull } from './components/TechCharsFull';
import { getRandomProducts } from '../../helpers/getRandomProducts';
import { ProductSlider } from '../HomePage/components/ProductSlider';
import { fetchProductById } from '../../features/productInfoSlice';
import { ProductCategory } from '../../types/ProductCategory';

export const ProductDetailsPage = () => {
  const { productId = '' } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { phones, tablets, accessories, loading, error } = useAppSelector(
    state => state.products,
  );
  const { selectedProduct } = useAppSelector(state => state.selectedProduct);

  const getProductCategory = (pathname: string): ProductCategory => {
    const parts = pathname.split('/');

    const categorySegment = parts.find(
      part => part === 'phones' || part === 'tablets' || part === 'accessories',
    );

    switch (categorySegment) {
      case 'phones':
        return ProductCategory.PHONES;
      case 'tablets':
        return ProductCategory.TABLETS;
      case 'accessories':
        return ProductCategory.ACCESSORIES;
      default:
        return ProductCategory.PHONES;
    }
  };

  useEffect(() => {
    if (productId) {
      const category = getProductCategory(location.pathname);

      dispatch(fetchProductById({ productId, category }));
    }
  }, [dispatch, productId, location.pathname]);

  return (
    <div className={styles.productPage}>
      <BackBtn />

      <h2 className={styles.name}>
        {!loading && error ? 'Product was not found' : selectedProduct?.name}
      </h2>

      {loading && <Loader />}

      {!loading && !error && selectedProduct && (
        <div className={styles.content}>
          <ImgsSlider product={selectedProduct} />

          <div className={styles.infoGridRight}>
            <VariableChars product={selectedProduct} productId={productId} />

            <ProductAction product={selectedProduct} />

            <TechCharsShort product={selectedProduct} />
          </div>

          <div className={styles.descriptionWrap}>
            <h3>About</h3>
            <div className={styles.divider}></div>

            {selectedProduct.description.map(description => (
              <div
                className={styles.descriptionDetails}
                key={description.title}
              >
                <h4>{description.title}</h4>
                {description.text.map(text => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            ))}
          </div>

          <div
            className={classNames(
              styles.descriptionWrap,
              styles.descriptionWrapDesckRight,
            )}
          >
            <h3>Tech specs</h3>
            <div className={styles.divider}></div>

            <TechCharsFull product={selectedProduct} />
          </div>

          <div className={styles.descriptionWrapSlider}>
            <ProductSlider
              title="You may also like"
              type="You may also like"
              products={getRandomProducts(selectedProduct.category, 16, [
                ...phones,
                ...tablets,
                ...accessories,
              ])}
            />
          </div>
        </div>
      )}
    </div>
  );
};
