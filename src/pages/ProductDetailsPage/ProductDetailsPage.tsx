import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { useCallback, useEffect, useState } from 'react';
import { getProductDetails } from '../../api/api';
import Loader from '../../components/Loader/Loader';
import styles from './ProductDetailsPage.module.scss';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { TypesOfProducts } from '../../types/TypesOfProducts';
import ProductControls from '../../components/ProductControls/ProductControls';
// eslint-disable-next-line max-len
import ProductDescription from '../../components/ProductDescription/ProductDescription';
import ProductSpec from '../../components/ProductSpec/ProductSpec';
import { getProductSpec } from '../../hooks/getProductSpec';
import { YouAlsoLike } from '../../components/YouAlsoLike/YouAlsoLike';
import ProductGallery from '../../components/ProductGallery/ProductGallery';
import classNames from 'classnames';

export const ProductDetailsPage = () => {
  // #region constant
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<TypesOfProducts | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [currentImage, setCurrentImage] = useState<string>('');
  const [currentColor, setCurrentColor] = useState<string>('');
  const [currentCapacity, setCurrentCapacity] = useState<string>('');
  // #endregion

  // #region Function and if
  const loadProductDetails = useCallback(() => {
    if (!productId) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    getProductDetails(productId)
      .then(product => {
        setCurrentProduct(product || null);
        setCurrentImage(product?.images[0] || '');
        setCurrentColor(product?.color || '');
        setCurrentCapacity(product?.capacity || '');
      })
      .catch(() => {
        setErrorMessage('Product was not found');
      })
      .finally(() => setIsLoading(false));
  }, [productId]);

  useEffect(() => {
    loadProductDetails();
  }, [loadProductDetails]);

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  if (!isLoading && errorMessage) {
    return (
      <ErrorMessage errorMessage={errorMessage} onReload={loadProductDetails} />
    );
  }

  if (!currentProduct) {
    return <div>Product dont found</div>;
  }
  // #endregion

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs product={currentProduct} />
      </div>
      <div className={styles.title}>{currentProduct?.name}</div>

      <div className={styles.topSection}>
        <ProductGallery
          currentImage={currentImage}
          currentProduct={currentProduct}
          setCurrentImage={setCurrentImage}
        />

        <div className={classNames(styles.sections, styles.controlSection)}>
          <ProductControls
            setCurrentColor={setCurrentColor}
            currentProduct={currentProduct}
            currentColor={currentColor}
            currentCapacity={currentCapacity}
          />
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.sections}>
          <ProductDescription currentProduct={currentProduct} />
        </div>

        <div className={styles.sections}>
          <div className={styles.titleSpecContainer}>
            <h3 className={styles.titleSpec}>Tech specs</h3>
          </div>
          <ProductSpec spec={getProductSpec(currentProduct)} />
        </div>
      </div>

      <div className={classNames(styles.sections, styles.alsoLike)}>
        <YouAlsoLike
          category={currentProduct.category}
          productId={currentProduct.id}
        />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
