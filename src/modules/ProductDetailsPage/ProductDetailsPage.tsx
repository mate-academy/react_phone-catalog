import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { useGlobalState } from '../../context/store';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ProductDetails } from '../../types/ProductDetails';
import { getProductDetails } from '../../services/productDetails.service';
import { BackButton } from '../shared/BackButton/BackButton';
import { PhotosSlider } from './components/PhotosSlider/PhotosSlider';
import cn from 'classnames';
import { ProductsSlider } from '../shared/ProductsSlider';
import { getSuggestedProducts } from '../../utils/getSuggestedProducts';
import { ProductDetailsPageSkeleton } from './ProductDetailsPageSkeleton';

export const ProductDetailsPage: FC = () => {
  const {
    products,
    errorMessage,
    setErrorMessage,
    addToCart,
    isInCart,
    toggleFavourites,
    isInFavourites,
  } = useGlobalState();
  const { productId } = useParams();
  const [productsDetails, setProductsDetails] = useState<ProductDetails[]>([]);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null,
  );
  const [detailsIsLoading, setDetailsIsLoading] = useState(false);

  const selectedProduct = useMemo(
    () => products.find(product => product.itemId === productId),
    [productId, products],
  );

  const selectedCategory = useLocation().pathname.split('/')[1];

  const getLink = useCallback(
    (option: string, value: string) => {
      const item = productsDetails.find(
        ({ color, capacity, namespaceId }) =>
          (option === 'color' &&
            color === value &&
            namespaceId === productDetails?.namespaceId &&
            capacity === productDetails.capacity) ||
          (option === 'capacity' &&
            capacity === value &&
            namespaceId === productDetails?.namespaceId &&
            color === productDetails.color),
      );

      return item?.id;
    },
    [productDetails, productsDetails],
  );

  const suggestedProducts = useMemo(
    () => getSuggestedProducts(products, selectedCategory, productId || ''),
    [productId, products, selectedCategory],
  );

  useEffect(() => {
    setErrorMessage('');

    /* const delayTimer = setTimeout(() => {
      setIsLoading(true);
    }, 200); */

    setDetailsIsLoading(true);

    getProductDetails(selectedCategory)
      .then(fetchedProductsDetails => {
        setProductsDetails(fetchedProductsDetails);

        const currentProductDetails = fetchedProductsDetails.find(
          prodDetails => prodDetails.id === productId,
        );

        if (currentProductDetails) {
          setProductDetails(currentProductDetails);
          setErrorMessage('');
        } else {
          setProductDetails(null);
          setErrorMessage('Product was not found');
        }
      })
      .catch(() => {
        setErrorMessage(`Failed to load ${selectedCategory} details`);
      })
      .finally(() => {
        // clearTimeout(delayTimer);

        setTimeout(() => {
          setDetailsIsLoading(false);
        }, 300);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, productId]);

  return (
    <div className={styles.pageBody}>
      {detailsIsLoading && <ProductDetailsPageSkeleton />}

      {!detailsIsLoading && errorMessage && (
        <p className={styles.errorMessage}>{errorMessage}</p>
      )}

      {!detailsIsLoading &&
        !errorMessage &&
        productDetails &&
        selectedProduct && (
          <>
            <div className={styles.breadcrumbs}>
              <Breadcrumbs />
            </div>

            <div className={styles.backButton}>
              <BackButton />
            </div>

            <h2 className={styles.pageTitle}>{productDetails.name}</h2>

            <div className={styles.imagesSlider}>
              <PhotosSlider images={productDetails.images} />
            </div>

            <div className={styles.mainControls}>
              <div className={styles.optionsWrapper}>
                <div className={styles.options}>
                  <div className={styles.optionsLabel}>
                    Available colors
                    <span className={styles.productId}>
                      {`ID: ${selectedProduct.id}`}
                    </span>
                  </div>

                  <ul className={styles.optionsList}>
                    {productDetails.colorsAvailable.map(color => (
                      <li key={color} className={styles.optionsListItem}>
                        <Link
                          to={`/${selectedCategory}/${getLink('color', color)}`}
                          className={cn(styles.optionsColorLink, {
                            [styles.optionsColorLinkActive]:
                              color === productDetails.color,
                          })}
                        >
                          <span
                            style={{ backgroundColor: color }}
                            className={styles.optionsIcon}
                          ></span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.options}>
                  <span className={styles.optionsLabel}>Select capacity</span>

                  <ul className={styles.optionsList}>
                    {productDetails.capacityAvailable.map(capacity => (
                      <li key={capacity} className={styles.optionsListItem}>
                        <Link
                          to={`/${selectedCategory}/${getLink('capacity', capacity)}`}
                          className={cn(styles.optionsCapacityLink, {
                            [styles.optionsCapacityLinkActive]:
                              capacity === productDetails.capacity,
                          })}
                        >
                          {capacity.split('GB').join(' GB')}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.priceWrapper}>
                <span
                  className={styles.priceRegular}
                >{`$${productDetails.priceRegular}`}</span>

                <span
                  className={styles.priceDiscount}
                >{`$${productDetails.priceDiscount}`}</span>
              </div>

              <div className={styles.buttons}>
                <button
                  onClick={() => addToCart(selectedProduct)}
                  className={cn(styles.btnAdd, {
                    [styles.btnAddActive]: isInCart(selectedProduct),
                  })}
                >
                  {isInCart(selectedProduct) ? 'Added' : 'Add to cart'}
                </button>

                <button
                  onClick={() => toggleFavourites(selectedProduct)}
                  className={styles.btnFav}
                >
                  <span
                    className={cn(styles.iconFav, {
                      [styles.iconFavActive]: isInFavourites(selectedProduct),
                    })}
                  ></span>
                </button>
              </div>

              <div className={styles.specs}>
                <span className={styles.specsItem}>
                  <span className={styles.specsItemProp}>Screen</span>

                  <span className={styles.specsItemValue}>
                    {productDetails.screen}
                  </span>
                </span>

                <span className={styles.specsItem}>
                  <span className={styles.specsItemProp}>Resolution</span>

                  <span className={styles.specsItemValue}>
                    {productDetails.resolution}
                  </span>
                </span>

                <span className={styles.specsItem}>
                  <span className={styles.specsItemProp}>Processor</span>

                  <span className={styles.specsItemValue}>
                    {productDetails.processor}
                  </span>
                </span>

                <span className={styles.specsItem}>
                  <span className={styles.specsItemProp}>RAM</span>

                  <span className={styles.specsItemValue}>
                    {productDetails.ram}
                  </span>
                </span>
              </div>
            </div>

            <section className={styles.about}>
              <h3 className={styles.aboutTitle}>About</h3>

              {productDetails.description.map(description => (
                <article key={description.title} className={styles.aboutItem}>
                  <h4 className={styles.aboutItemTitle}>{description.title}</h4>

                  <p className={styles.aboutItemText}>{description.text}</p>
                </article>
              ))}
            </section>

            <section className={styles.techSpecs}>
              <h3 className={styles.specsTitle}>Tech specs</h3>

              <div className={styles.specs}>
                <span className={styles.specsItem}>
                  <span className={styles.specsItemProp}>Screen</span>

                  <span className={styles.specsItemValue}>
                    {productDetails.screen}
                  </span>
                </span>

                <span className={styles.specsItem}>
                  <span className={styles.specsItemProp}>Resolution</span>

                  <span className={styles.specsItemValue}>
                    {productDetails.resolution}
                  </span>
                </span>

                <span className={styles.specsItem}>
                  <span className={styles.specsItemProp}>Processor</span>

                  <span className={styles.specsItemValue}>
                    {productDetails.processor}
                  </span>
                </span>

                <span className={styles.specsItem}>
                  <span className={styles.specsItemProp}>RAM</span>

                  <span className={styles.specsItemValue}>
                    {productDetails.ram}
                  </span>
                </span>

                <span className={styles.specsItem}>
                  <span className={styles.specsItemProp}>Built in memory</span>

                  <span className={styles.specsItemValue}>
                    {productDetails.capacity}
                  </span>
                </span>

                <span className={styles.specsItem}>
                  <span className={styles.specsItemProp}>Camera</span>

                  <span className={styles.specsItemValue}>
                    {productDetails.camera}
                  </span>
                </span>

                <span className={styles.specsItem}>
                  <span className={styles.specsItemProp}>Zoom</span>

                  <span className={styles.specsItemValue}>
                    {productDetails.zoom}
                  </span>
                </span>

                <span className={styles.specsItem}>
                  <span className={styles.specsItemProp}>Cell</span>

                  <span className={styles.specsItemValue}>
                    {productDetails.cell.join(', ')}
                  </span>
                </span>
              </div>
            </section>

            <div className={styles.suggestedProductsSlider}>
              <ProductsSlider
                title="You may also like"
                products={suggestedProducts}
                priceType="discount"
              />
            </div>
          </>
        )}
    </div>
  );
};
