import React, { useCallback, useEffect, useState } from 'react';
import { CatalogProducts, Product } from '../../types/Types';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getProductById,
  getProducts,
  getSuggestedProducts,
} from '../../api/products';
import styles from './ProductDetailsPage.module.scss';
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
// eslint-disable-next-line prettier/prettier
import {
  FavouriteIconSelected
} from '../../components/ui/FavouriteIconSelected';
import classNames from 'classnames';

export const ProductDetailsPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [catalogProduct, setCatalogProduct] = useState<CatalogProducts | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [suggestedProducts, setSuggestedProducts] = useState<CatalogProducts[]>(
    [],
  );

  const { productId } = useParams<{
    productId: string;
  }>();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { toggleFavourite, isFavourite } = useFavourites();

  const fetchProducts = useCallback(async () => {
    if (!productId) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const allProducts = await getProducts();

      const match = allProducts.find(prod => prod.itemId === productId);

      if (!match) {
        throw new Error('Product not found in catalog');
      }

      setCatalogProduct(match);

      const data = await getProductById(match.category, productId);

      if (!data) {
        throw new Error('No product information found');
      }

      setProduct(data);
      setSelectedImage(data.images[0] || '');

      const suggested = await getSuggestedProducts();

      setSuggestedProducts(suggested);
    } catch (error) {
      setErrorMessage('Product was not found.');
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
                      <FavouriteIconSelected className={styles.details__icon} />
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
