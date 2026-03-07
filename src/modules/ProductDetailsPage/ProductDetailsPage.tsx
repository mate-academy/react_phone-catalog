import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { ProductGallery } from './ProductGallery';
import { ColorSelector } from './ColorSelector';
import { CapacitySelector } from './CapacitySelector';
import { TechSpecs } from './TechSpecs';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ArrowLeftIcon } from '../../components/ui/ArrowLeftIcon';
import { useFavourites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { FavouriteIcon } from '../../components/ui/FavouriteIcon';
import { useProductDetails } from '../../hooks/useProductDetails';
import { HeartFillIcon } from '../../components/ui/HeartFillIcon';
import classNames from 'classnames';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{
    productId: string;
  }>();

  const {
    product,
    catalogProduct,
    isLoading,
    errorMessage,
    selectedImage,
    setSelectedImage,
    suggestedProducts,
  } = useProductDetails(productId);

  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { toggleFavourite, isFavourite } = useFavourites();

  const isAdded = catalogProduct ? isInCart(catalogProduct.id) : false;
  const isActiveFavourite = catalogProduct
    ? isFavourite(catalogProduct.id)
    : false;

  const handleCartClick = () => {
    if (catalogProduct && !isAdded) {
      addToCart(catalogProduct);
    }
  };

  const handleFavouriteClick = () => {
    if (catalogProduct) {
      toggleFavourite(catalogProduct);
    }
  };

  return (
    <div className={styles.details}>
      <Breadcrumbs category={product?.category} productName={product?.name} />
      <button onClick={() => navigate(-1)} className={styles.details__back}>
        <ArrowLeftIcon />
        Back
      </button>
      {isLoading && <Loader />}
      {errorMessage && <p>{errorMessage}</p>}
      {!isLoading && !errorMessage && product && (
        <>
          <h2 className={styles.details__title}>{product.name}</h2>
          <div className={styles.details__hero}>
            <ProductGallery
              images={product.images}
              selectedImage={selectedImage}
              onSelect={setSelectedImage}
            />
            <div className={styles.details__info}>
              <ColorSelector product={product} />
              <CapacitySelector product={product} />
              <div className={styles.details__purchase}>
                <div className={styles.details__priceContainer}>
                  <span className={styles.details__price}>
                    ${product.priceDiscount}
                  </span>
                  {product.priceRegular !== product.priceDiscount && (
                    <span className={styles.details__fullPrice}>
                      ${product.priceRegular}
                    </span>
                  )}
                </div>

                <div className={styles.details__actions}>
                  <button
                    type="button"
                    className={classNames(styles.details__actionAddButton, {
                      [styles['details__actionAddButton--active']]: isAdded,
                    })}
                    onClick={handleCartClick}
                    disabled={isAdded}
                  >
                    {isAdded ? 'Added to cart' : 'Add to cart'}
                  </button>
                  <button
                    type="button"
                    className={styles.details__actionFavouriteIcon}
                    onClick={handleFavouriteClick}
                    aria-label={
                      isActiveFavourite
                        ? 'Remove from favorites'
                        : 'Add to favorites'
                    }
                  >
                    {!isActiveFavourite ? (
                      <FavouriteIcon className={styles.details__icon} />
                    ) : (
                      <HeartFillIcon className={styles.details__icon} />
                    )}
                  </button>
                </div>
              </div>
              <TechSpecs product={product} variant="short" />
            </div>
          </div>
          <div className={styles.details__bottom}>
            <section className={styles.details__about}>
              <h3 className={styles.details__aboutTitle}>About</h3>
              <div className={styles.details__aboutDivider}></div>

              <div className={styles.details__aboutContent}>
                {product.description.map((desc, index) => (
                  <article key={index} className={styles.details__article}>
                    <h4 className={styles.details__articleTitle}>
                      {desc.title}
                    </h4>
                    <div className={styles.details__articleText}>
                      {desc.text.map((paragraph, pIndex) => (
                        <p key={pIndex} className={styles.details__paragraph}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <div className={styles.details__specs}>
              <h3 className={styles.details__specsTitle}>Tech specs</h3>
              <div className={styles.details__specsDivider}></div>
              <div className={styles.details__specsInfo}>
                <TechSpecs product={product} variant="full" />
              </div>
            </div>
          </div>
          <ProductsSlider
            title="You may also like"
            products={suggestedProducts}
          />
        </>
      )}
    </div>
  );
};
