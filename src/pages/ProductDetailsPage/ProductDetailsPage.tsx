import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { useCallback, useEffect, useState } from 'react';
import { getProductDetails, getProductDetailsAll } from '../../api/api';
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
import { Options } from '../../types/Options';

export const ProductDetailsPage = () => {
  // #region constant
  const { productId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<TypesOfProducts | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [currentImage, setCurrentImage] = useState<string>('');
  // #endregion

  // #region Function and if
  const handleProductOptionChange = (option: Options) => {
    const newColor = option.color ?? currentProduct?.color;
    const newCapacity = option.capacity ?? currentProduct?.capacity;
    const newNameSpeced = currentProduct?.namespaceId;

    getProductDetailsAll().then(products => {
      const newProd = products.find(
        product =>
          product.color === newColor &&
          product.capacity === newCapacity &&
          newNameSpeced === product.namespaceId,
      );

      if (newProd) {
        navigate(`/product/${newProd?.id}`);
      }
    });
  };

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
            optionsChange={handleProductOptionChange}
            currentProduct={currentProduct}
            currentColor={currentProduct.color}
            currentCapacity={currentProduct.capacity}
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
