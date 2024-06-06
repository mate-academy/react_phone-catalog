import { useContext, useEffect, useState } from 'react';
import styles from './ProductDetail.module.scss';
import classNames from 'classnames';
import { useLocation, useParams } from 'react-router-dom';
import { DispatchContext, StateContext } from '../../Store';
import { PhoneSlider } from '../components/PhoneSlider';
import { getSelectedItem } from '../../api';
import { Gallery } from './components/Gallery';
import { Colors } from './components/Colors';
import { Capacity } from './components/Capacity';
import { Buttons } from '../components/Buttons';
import { Description } from './components/Description';
import { Navigation } from '../components/Navigation';
import { getId } from '../../utils/getId';
import { DetailSkeleton } from './components/DetailSkeleton';
import { ErrorPage } from '../components/ErrorPage';

export const ProductDetail = () => {
  const { productId } = useParams();
  const location = useLocation().pathname.split('/')[1];

  const { selectedProduct, products, isLoading } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    dispatch({ type: 'setIsLoading', value: true });
    if (productId) {
      getSelectedItem(location, productId)
        .then(payload => {
          if (payload) {
            dispatch({ type: 'addSelectedProduct', payload });
          }
        })
        .catch(() => setHasError(true))
        .finally(() => {
          dispatch({ type: 'setIsLoading', value: false });
        });
    }
  }, [productId, dispatch, location]);

  if (!selectedProduct || isLoading) {
    return <DetailSkeleton />;
  }

  const {
    name,
    category,
    priceRegular,
    priceDiscount,
    id,
    screen,
    ram,
    resolution,
    processor,
  } = selectedProduct;

  const productForSlider = () => {
    switch (category) {
      case 'tablets':
        return products.filter(item => item.category === 'tablets');

      case 'accessories':
        return products.filter(item => item.category === 'accessories');

      default:
        return products.filter(item => item.category === 'phones');
    }
  };

  return (
    <>
      {hasError && !isLoading && <ErrorPage />}

      {!hasError && !isLoading && (
        <>
          <Navigation category={category} name={name} back />

          {selectedProduct ? (
            <div className={classNames(styles.container, styles.product)}>
              <h2 className={styles.product__header}>{name}</h2>

              <div className={styles.product__gallery}>
                <Gallery images={selectedProduct.images} />
              </div>

              <div className={styles.product__mainInfo}>
                <Colors selectedProduct={selectedProduct} />

                <Capacity selectedProduct={selectedProduct} />

                <div
                  className={classNames(styles.product__prices, styles.prices)}
                >
                  <span
                    className={classNames(
                      styles.prices__price,
                      styles['prices__price-discount'],
                    )}
                  >
                    {`$${priceDiscount}`}
                  </span>
                  <span
                    className={classNames(
                      styles.prices__price,
                      styles['prices__price-regular'],
                    )}
                  >
                    {`$${priceRegular}`}
                  </span>
                </div>

                <Buttons category={category} id={id} />

                <section
                  className={classNames(
                    styles.product__shortInfo,
                    styles.shortInfo,
                  )}
                >
                  <article className={styles.shortInfo__block}>
                    <span className={styles.shortInfo__param}>Screen</span>
                    <span className={styles.shortInfo__info}>{screen}</span>
                  </article>
                  <article className={styles.shortInfo__block}>
                    <span className={styles.shortInfo__param}>Resolution</span>
                    <span className={styles.shortInfo__info}>{resolution}</span>
                  </article>
                  <article className={styles.shortInfo__block}>
                    <span className={styles.shortInfo__param}>Processor</span>
                    <span className={styles.shortInfo__info}>{processor}</span>
                  </article>
                  <article className={styles.shortInfo__block}>
                    <span className={styles.shortInfo__param}>RAM</span>
                    <span className={styles.shortInfo__info}>{ram}</span>
                  </article>
                </section>
              </div>

              <span
                className={styles.product__id}
              >{`ID: ${getId(category, products, id)}`}</span>

              <div className={styles.product__description}>
                <Description selectedProduct={selectedProduct} />
              </div>
            </div>
          ) : (
            <span className={styles.product__empty}>Product was not found</span>
          )}

          <section className={styles.product__slider}>
            <PhoneSlider
              blockName={'You may also like'}
              models={productForSlider()}
            />
          </section>
        </>
      )}
    </>
  );
};
