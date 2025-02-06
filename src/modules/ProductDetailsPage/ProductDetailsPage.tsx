import { useLocation, useParams } from 'react-router-dom';
import { useContext, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import { getProductById } from '../../api/products';
import { ProductCategory } from '../../types/ProductGeneral';
import { ErrorMessage } from '../../types/ErrorMessage';
import { Product } from '../../types/Product';
import { ThemeContext } from '../../store/ThemeProvider';

import { ProductDescription } from './components/ProductDescription';
import { RecomendedProducts } from './components/RecomendedProducts';
import { PhotosSlider } from './components/PhotosSlider';
import { Selectors } from './components/Selectors';
import { ProductButtons } from '../shared/ProductButtons';
import { ProductDetails } from '../shared/ProductDetails';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { Loader } from '../shared/Loader';
import { Price } from '../shared/Price';
import { Error } from '../shared/Error';
import { BackButton } from '../shared/BackButton';

import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const { isThemeDark } = useContext(ThemeContext);
  const { pathname } = useLocation();

  const category: ProductCategory = useMemo(
    () => pathname.split('/')[1] as ProductCategory,
    [pathname],
  );

  const { productId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const [product, setProduct] = useState<Product>();

  const handleLoadData = () => {
    if (!productId) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    getProductById(category, productId)
      .then(productFromServer => {
        if (!productFromServer) {
          setErrorMessage(ErrorMessage.NotFoundProduct);
        } else {
          setProduct(productFromServer);
        }
      })
      .catch(() => setErrorMessage(ErrorMessage.Default))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    handleLoadData();
  }, [category, productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <Error errorMessage={errorMessage} onReload={handleLoadData} />;
  }

  return (
    <div className={styles.ProductDetailsPage}>
      {product && (
        <div className={styles.ProductDetailsPage__content}>
          <Breadcrumbs />

          <BackButton otherClass={styles.ProductDetailsPage__btnBack} />

          <h2 className={styles.ProductDetailsPage__title}>{product.name}</h2>

          <div
            className={classNames(
              styles.ProductDetailsPage__mainInfo,
              styles.mainInfo,
            )}
          >
            <div className={styles.mainInfo__slider}>
              <PhotosSlider photos={product.images} alt={product.name} />
            </div>

            <div className={styles.mainInfo__content}>
              <span className={styles.mainInfo__pageId}>ID: 802390</span>

              <Selectors product={product} />

              <Price
                price={product.priceDiscount}
                fullPrice={product.priceRegular}
                isBigTextSize={true}
                otherClass={styles.mainInfo__price}
              />

              <ProductButtons
                productId={product.id}
                otherClass={styles.mainInfo__btns}
              />

              <ProductDetails
                values={{
                  screen: product.screen,
                  resolution: product.resolution,
                  processor: product.processor,
                  ram: product.ram,
                }}
                otherClass={styles.mainInfo__details}
              />
            </div>
          </div>

          <div
            className={classNames(
              styles.ProductDetailsPage__secondaryInfo,
              styles.secondaryInfo,
            )}
          >
            <div className={styles.secondaryInfo__left}>
              <h3
                className={classNames(styles.secondaryInfo__blockTitle, {
                  [styles.secondaryInfo__blockTitle_darkTheme]: isThemeDark,
                })}
              >
                About
              </h3>

              <ProductDescription descriptions={product.description} />
            </div>

            <div className={styles.secondaryInfo__rigth}>
              <h3
                className={classNames(styles.secondaryInfo__blockTitle, {
                  [styles.secondaryInfo__blockTitle_darkTheme]: isThemeDark,
                })}
              >
                Tech specs
              </h3>

              <ProductDetails
                values={{
                  screen: product.screen,
                  resolution: product.resolution,
                  processor: product.processor,
                  ram: product.ram,
                  'built in memory': product.capacity,
                  camera: product.camera,
                  zoom: product.zoom,
                  ceil: product.cell,
                }}
                otherClass={styles.secondaryInfo__details}
              />
            </div>
          </div>
        </div>
      )}

      {product && <RecomendedProducts />}
    </div>
  );
};
