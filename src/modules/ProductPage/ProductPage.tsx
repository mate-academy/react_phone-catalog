import styles from './ProductPage.module.scss';
import { Breadcrumb } from '../shared/components/Breadcrumb';
import { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getProductDetailsById,
  getProducts,
  getSuggestedProducts,
} from '../../services/product';
import { Product, ProductDetails } from '../shared/types/Product';
import classNames from 'classnames';
import { ProductGallery } from './components/ProductGallery';
import { ProductInfo } from './components/ProductInfo';
import { ProductAbout } from './components/ProductAbout';
import { ProductTechSpecs } from './components/ProductTechSpecs';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { BackButton } from '../shared/components/BackButton';
import { ErrorMessage } from '../shared/components/ErrorMessage';

type Props = {};

export const ProductPage: FC<Props> = () => {
  const categoryLabels = {
    phones: 'Phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
  };

  const { productId } = useParams();

  const [product, setProduct] = useState<Product>();
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null,
  );
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(false);
      setProduct(undefined);
      setProductDetails(null);

      if (!productId) {
        return;
      }

      const productsFromServer = await getProducts();

      const suggestions = getSuggestedProducts(productsFromServer, productId);

      setSuggestedProducts(suggestions);

      const foundProduct = productsFromServer.find(
        item => item.itemId === productId,
      );

      if (!foundProduct) {
        return;
      }

      const foundProductDetails = await getProductDetailsById(
        productId,
        foundProduct.category,
      );

      if (!foundProductDetails) {
        return;
      }

      setProduct(foundProduct);
      setProductDetails(foundProductDetails);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const isProductNotFound =
    !isLoading && !error && (!product || !productDetails);

  return (
    <div className={classNames(styles.productPage, 'container')}>
      {isLoading && (
        <div className={styles.productPage__state}>
          <span
            className={classNames('loader', styles.productPage__loader)}
            aria-hidden="true"
          />
        </div>
      )}

      {!isLoading && error && <ErrorMessage onRetry={loadProducts} />}

      {isProductNotFound && (
        <div className={styles.productPage__state}>
          <img
            src="img/product-not-found.png"
            alt=""
            className={styles.productPage__stateImage}
          />

          <h2 className={styles.productPage__stateTitle}>
            Product was not found
          </h2>
        </div>
      )}

      {!isLoading && !error && product && productDetails && (
        <>
          <Breadcrumb
            items={[
              {
                label: categoryLabels[product.category],
                to: `/${product.category}`,
              },
              {
                label: product.name,
              },
            ]}
          />

          <BackButton />
          <h2 className={styles.productPage__title}>{product.name}</h2>
          <div className={styles.productPage__content}>
            <div className={styles.productPage__main}>
              <div className={styles.productPage__gallery}>
                <ProductGallery
                  images={productDetails.images}
                  name={product.name}
                />
              </div>

              <div className={styles.productPage__info}>
                <ProductInfo
                  product={product}
                  productDetails={productDetails}
                />
              </div>
            </div>

            <div className={styles.productPage__details}>
              <div className={styles.productPage__about}>
                <ProductAbout description={productDetails.description} />
              </div>

              <div className={styles.productPage__techSpecs}>
                <ProductTechSpecs productDetails={productDetails} />
              </div>
            </div>

            <section className={styles.productPage__suggestions}>
              <ProductsSlider
                title="You may also like"
                products={suggestedProducts}
              />
            </section>
          </div>
        </>
      )}
    </div>
  );
};
