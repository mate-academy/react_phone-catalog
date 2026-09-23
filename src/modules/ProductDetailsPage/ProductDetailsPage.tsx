import { withBase } from '../../utils/withBase';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { ProductDetails } from '../../types';
import { getProductDetails, getProducts } from '../../api';
import { IconHeart, IconHeartFilled } from '../../components/Icons';
import { Loader } from '../../components/Loader';
import { ErrorBlock } from '../../components/ErrorBlock';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BackButton } from '../../components/BackButton';
import { ProductGallery } from '../../components/ProductGallery';
import { ProductOptions } from '../../components/ProductOptions';
import { ProductTechSpecs } from '../../components/ProductTechSpecs';
import { ProductAbout } from '../../components/ProductAbout';
import { useShop } from '../../context/ShopContext';
import type { Product } from '../../types';
import cn from 'classnames';
import styles from './ProductDetailsPage.module.scss';
import { ProductsSlider } from '../../components/ProductsSlider';

const CATEGORY_TITLES = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [fullProductDetails, setFullProductDetails] =
    useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  const navigate = useNavigate();
  const {
    addToCart,
    isInCart,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  } = useShop();

  const inCart = currentProduct ? isInCart(currentProduct.id) : false;
  const favorite = currentProduct ? isFavorite(currentProduct.id) : false;

  const normalizeCapacity = (capacity: string) => capacity.toLowerCase();

  const normalizeColor = (color: string) =>
    color.replaceAll(' ', '-').toLowerCase();

  const handleCapacityChange = (capacity: string) => {
    if (!fullProductDetails) {
      return;
    }

    const newProductId = `${fullProductDetails.namespaceId}-${normalizeCapacity(
      capacity,
    )}-${normalizeColor(fullProductDetails.color)}`;

    navigate(`/product/${newProductId}`);
  };

  const handleColorChange = (color: string) => {
    if (!fullProductDetails) {
      return;
    }

    const newProductId = `${fullProductDetails.namespaceId}-${normalizeCapacity(
      fullProductDetails.capacity,
    )}-${normalizeColor(color)}`;

    navigate(`/product/${newProductId}`);
  };

  const loadProductDetails = useCallback(() => {
    if (!productId) {
      setIsLoading(false);

      return;
    }

    setIsLoading(true);
    setIsError(false);
    setFullProductDetails(null);
    setCurrentProduct(null);
    setRecommendedProducts([]);
    setSelectedImageIndex(0);

    Promise.all([getProductDetails(productId), getProducts()])
      .then(([details, products]) => {
        setFullProductDetails(details ?? null);
        const product = products.find(item => item.itemId === productId);

        setCurrentProduct(product ?? null);

        const recommendations = [...products]
          .filter(item => item.itemId !== productId)
          .sort(() => Math.random() - 0.5)
          .slice(0, 12);

        setRecommendedProducts(recommendations);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [productId]);

  const handleAddToCart = () => {
    if (!currentProduct || inCart) {
      return;
    }

    addToCart(currentProduct);
  };

  const handleToggleFavorite = () => {
    if (!currentProduct) {
      return;
    }

    if (favorite) {
      removeFromFavorites(currentProduct.id);
    } else {
      addToFavorites(currentProduct);
    }
  };

  const shouldShowRecommendations =
    !isLoading &&
    !isError &&
    fullProductDetails &&
    recommendedProducts.length > 0;

  useEffect(() => {
    loadProductDetails();
  }, [loadProductDetails]);

  return (
    <div className={styles.page}>
      {isLoading && <Loader />}

      {!isLoading && isError && (
        <ErrorBlock buttonText="Try again" onRetry={loadProductDetails} />
      )}

      {!isLoading && !isError && fullProductDetails === null && (
        <div className={styles.notFound}>
          <h1 className={styles.notFoundTitle}>Product was not found</h1>

          <p className={styles.notFoundText}>
            Looks like this product does not exist in our store
          </p>

          <img
            src={withBase('/img/product-not-found.webp')}
            alt="Product was not found"
            className={styles.notFoundImage}
          />

          <Link to="/" className={styles.notFoundLink}>
            Go Home
          </Link>
        </div>
      )}

      {!isLoading && !isError && fullProductDetails && (
        <>
          <Breadcrumbs
            items={[
              {
                title: CATEGORY_TITLES[fullProductDetails.category],
                to: `/${fullProductDetails.category}`,
              },
              { title: fullProductDetails.name },
            ]}
          />

          <div className={styles.back}>
            <BackButton />
          </div>

          <h1 className={styles.title}>{fullProductDetails.name}</h1>

          <div className={styles.top}>
            <ProductGallery
              productName={fullProductDetails.name}
              productImages={fullProductDetails.images}
              onSelectImage={setSelectedImageIndex}
              imageIndex={selectedImageIndex}
            />

            <div className={styles.options}>
              <ProductOptions
                colorsAvailable={fullProductDetails.colorsAvailable}
                capacityAvailable={fullProductDetails.capacityAvailable}
                color={fullProductDetails.color}
                capacity={fullProductDetails.capacity}
                onColorChange={handleColorChange}
                onCapacityChange={handleCapacityChange}
              />

              <div className={styles.prices}>
                <span className={styles.price}>
                  {`$${fullProductDetails.priceDiscount}`}
                </span>

                {fullProductDetails.priceRegular >
                  fullProductDetails.priceDiscount && (
                  <del className={styles.fullPrice}>
                    {`$${fullProductDetails.priceRegular}`}
                  </del>
                )}
              </div>

              {currentProduct && (
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={cn(styles.addToCart, {
                      [styles.addToCartAdded]: inCart,
                    })}
                    onClick={handleAddToCart}
                    disabled={inCart}
                  >
                    {inCart ? 'Added to cart' : 'Add to cart'}
                  </button>

                  <button
                    type="button"
                    className={cn(styles.favButton, {
                      [styles.favButtonActive]: favorite,
                    })}
                    onClick={handleToggleFavorite}
                    aria-label={
                      favorite ? 'Remove from favorites' : 'Add to favorites'
                    }
                  >
                    {favorite ? <IconHeartFilled /> : <IconHeart />}
                  </button>
                </div>
              )}

              <div className={styles.shortSpecs}>
                <div className={styles.specRow}>
                  <span className={styles.specName}>Screen</span>
                  <span className={styles.specValue}>
                    {fullProductDetails.screen}
                  </span>
                </div>

                <div className={styles.specRow}>
                  <span className={styles.specName}>Resolution</span>
                  <span className={styles.specValue}>
                    {fullProductDetails.resolution}
                  </span>
                </div>

                <div className={styles.specRow}>
                  <span className={styles.specName}>Processor</span>
                  <span className={styles.specValue}>
                    {fullProductDetails.processor}
                  </span>
                </div>

                <div className={styles.specRow}>
                  <span className={styles.specName}>RAM</span>
                  <span className={styles.specValue}>
                    {fullProductDetails.ram}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.sections}>
            <ProductAbout description={fullProductDetails.description} />

            <ProductTechSpecs
              screen={fullProductDetails.screen}
              resolution={fullProductDetails.resolution}
              processor={fullProductDetails.processor}
              ram={fullProductDetails.ram}
              capacity={fullProductDetails.capacity}
              camera={fullProductDetails.camera}
              zoom={fullProductDetails.zoom}
              cell={fullProductDetails.cell}
            />
          </div>
        </>
      )}

      {shouldShowRecommendations && (
        <div className={styles.recommendations}>
          <ProductsSlider
            title="You may also like"
            products={recommendedProducts}
          />
        </div>
      )}
    </div>
  );
};
