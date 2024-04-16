import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import styles from './ProductDetailsPage.module.scss';
import { BackBtn } from '../../components/BackBtn/BackBtn';
import { useParams } from 'react-router-dom';
import { ProductInfo } from '../../types/ProductInfo';
import { fetchProducts } from '../../features/productsSlice';
import { Loader } from '../../components/Loader';
import { ImgsSlider } from './components/ImgsSlider';
import { VariableChars } from './components/VariableChars';
import { ProductAction } from './components/ProductAction';
import { TechCharsShort } from './components/TechCharsShort';
import { TechCharsFull } from './components/TechCharsFull';
import classNames from 'classnames';
import { getRandomProducts } from '../../helpers/getRandomProducts';
import { ProductSlider } from '../HomePage/components/ProductSlider';

export const ProductDetailsPage = () => {
  const { productId = '' } = useParams();
  const dispatch = useAppDispatch();
  const { phones, tablets, accessories, loading, error } = useAppSelector(
    state => state.products,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const getProduct = (itemId: string, products: ProductInfo[]) => {
    return products.find(product => product.id === itemId);
  };

  const selectedProduct = getProduct(productId, [
    ...phones,
    ...tablets,
    ...accessories,
  ]);

  return (
    <div className={styles.productPage}>
      <BackBtn />

      {loading && <Loader />}

      <h2 className={styles.name}>
        {!loading && error ? 'Product was not found' : selectedProduct?.name}
      </h2>

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
              loading={loading}
            />
          </div>
        </div>
      )}
    </div>
  );
};
