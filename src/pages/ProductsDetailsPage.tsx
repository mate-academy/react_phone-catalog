import { useOutletContext, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Product } from '../types/Product';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { BackNavigation } from '../components/BackNavigation/BackNavigaton';
import { ProductDetails } from '../types/ProductDetails';
import styles from './ProductDetailsPage.module.scss';
import { TechSpec } from '../components/TechSpec/TechSpec';
import { TechSpecShort } from '../components/TechSpecShort/TechSpecShort';
import { AboutProduct } from '../components/AboutProduct/AboutProduct';
import { SuggestedProducts } from '../components/SuggestedProducts/SuggestedProducts';
import { useCart } from '../context/CartContext';
import { useFavourite } from '../context/FavContext';

//#region Constants
const colorMap: Record<string, string> = {
  black: '#000000',
  white: '#f9f6ef',
  gold: '#fcdbc1',
  silver: '#e1e4e1',
  spacegray: '#4e4e4e',
  spaceblack: '#3a3a3c',
  midnightgreen: '#4e5851',
  sierrablue: '#9bb5ce',
  graphite: '#54524f',
  midnight: '#2c3e50',
  purple: '#d1cdda',
  red: '#ba0c2e',
  yellow: '#ffe680',
  green: '#aee1cd',
  pink: '#fae0e0',
  blue: '#a0b4c7',
  coral: '#ff7f50',
  rosegold: '#eecdc6',
};
//#endregion

export const ProductsDetailsPage = () => {
  //#region Params and Context
  const { category, itemId } = useParams() as {
    category: string;
    itemId: string;
  };

  const { products, phones, tablets, accessories } = useOutletContext<{
    products: Product[];
    phones: ProductDetails[];
    tablets: ProductDetails[];
    accessories: ProductDetails[];
  }>();
  const currentItems = { phones, tablets, accessories }[category];

  const product = products.find(item => item.itemId === itemId);
  const productDetails = currentItems?.find(item => item.id === itemId);
  const touchStartX = useRef(0);
  //#endregion

  //#region State
  const [currentProduct, setCurrentPhone] = useState<ProductDetails | null>(
    productDetails ?? null,
  );

  const [activeImage, setActiveImage] = useState(
    currentProduct?.images[0] ?? '',
  );

  const { addToCart, removeFromCart, items } = useCart();
  const isInCart = Boolean(items.find(item => item.id === productDetails?.id));
  const { favourites, toggleFavourite } = useFavourite();
  const isFavourite = Boolean(favourites.find(fav => fav.id === product?.id));
  //#endregion

  //#region useEffect and blocks IF

  useEffect(() => {
    setCurrentPhone(productDetails ?? null);
    setActiveImage(productDetails?.images[0] ?? '');
  }, [productDetails]);

  if (!product) {
    return <h2>Product not found!</h2>;
  }

  if (!productDetails) {
    return <h2>Wait</h2>;
  }

  //#endregion

  //#region HandleSwipe

  const handleNext = () => {
    const currentIndex =
      currentProduct?.images.findIndex(item => item === activeImage) ?? 0;
    const nextIndex = Math.min(
      (currentProduct?.images.length ?? 0) - 1,
      currentIndex + 1,
    );

    setActiveImage(currentProduct?.images[nextIndex] ?? '');
  };

  const handlePrev = () => {
    const currentIndex =
      currentProduct?.images.findIndex(item => item === activeImage) ?? 0;
    const nextIndex = Math.max(0, currentIndex - 1);

    setActiveImage(currentProduct?.images[nextIndex] ?? '');
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  //#endregion
  return (
    <>
      <Breadcrumbs
        category={product.category}
        productName={currentProduct?.name ?? product.name}
      />
      <BackNavigation />
      <div className={styles.productPage}>
        <h1 className={styles.productName}>{productDetails.name}</h1>
        {/* Image gallery */}

        <img
          src={activeImage}
          alt={productDetails.name}
          className={styles.mainImage}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        />
        <div className={styles.blockImages}>
          {currentProduct?.images.map(image => (
            <button
              onClick={() => setActiveImage(image)}
              key={image}
              className={`${styles.imagesButton} ${activeImage === image ? styles.imagesButtonActive : ''}`}
            >
              <img className={styles.blockImage} src={image} alt="" />
            </button>
          ))}
        </div>
        {/* Color selector */}

        <div className={styles.colors}>
          <div className={styles.textBlockColors}>
            <p className={styles.textColor}>Available colors</p>
            <p className={styles.productId}>ID: {product.id}</p>
          </div>

          <div className={styles.colorsList}>
            {productDetails.colorsAvailable
              .filter(color => {
                const id = `${productDetails.namespaceId}-${(currentProduct?.capacity ?? productDetails.capacity).toLowerCase()}-${color}`;

                return currentItems?.some(item => item.id === id);
              })
              .map(color => (
                <button
                  className={`${styles.colorButton} ${currentProduct?.color === color ? styles.colorButtonActive : ''}`}
                  key={color}
                  style={{ backgroundColor: colorMap[color] }}
                  onClick={() => {
                    const newId = `${productDetails.namespaceId}-${(currentProduct?.capacity ?? productDetails.capacity).toLowerCase()}-${color}`;
                    const found = currentItems?.find(item => item.id === newId);

                    if (found) {
                      setCurrentPhone(found);
                      setActiveImage(found.images[0]);
                    }
                  }}
                ></button>
              ))}
          </div>
        </div>
        <hr className={styles.divider} />

        {/* Capacity selector */}
        <div className={styles.capacity}>
          <p className={styles.textColor}>Select capacity</p>
          <div className={styles.capacityList}>
            {productDetails.capacityAvailable.map(capacity => (
              <button
                className={`${styles.capacityButton} ${currentProduct?.capacity === capacity ? styles.capacityButtonActive : ''}`}
                key={capacity}
                onClick={() => {
                  const newId = `${productDetails.namespaceId}-${capacity.toLowerCase()}-${currentProduct?.color}`;
                  const found = currentItems?.find(item => item.id === newId);

                  if (found) {
                    setCurrentPhone(found);
                    setActiveImage(found.images[0]);
                  }
                }}
              >
                {capacity}
              </button>
            ))}
          </div>
        </div>
        <hr className={styles.dividerBottom} />

        {/* Price block */}
        <div className={styles.blockPrices}>
          <span className={styles.price}>${currentProduct?.priceDiscount}</span>
          {currentProduct?.priceRegular !== currentProduct?.priceDiscount && (
            <span className={styles.fullPrice}>
              ${currentProduct?.priceRegular}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className={styles.blockButtons}>
          <button
            type="button"
            className={styles.cartButton}
            onClick={() => {
              if (!isInCart) {
                addToCart({
                  id: productDetails.id,
                  image: productDetails.images[0],
                  name: productDetails.name,
                  price: `$${productDetails.priceDiscount}`,
                });
              } else {
                removeFromCart(productDetails.id);
              }
            }}
          >
            {isInCart ? 'Added ✓' : 'Add to cart'}
          </button>
          <button
            type="button"
            className={styles.favButton}
            onClick={() => toggleFavourite(product)}
          >
            <img
              src={
                isFavourite
                  ? './img/icons/favourites_icon_selected.svg'
                  : './img/icons/add_favourites_button.svg'
              }
              alt="Add to favourites"
            />
          </button>
        </div>

        {/* Short specs under buttons */}
        <div className={styles.techSpecShortWrapper}>
          <TechSpecShort
            screen={currentProduct?.screen ?? ''}
            resolution={currentProduct?.resolution ?? ''}
            processor={currentProduct?.processor ?? ''}
            ram={currentProduct?.ram ?? ''}
          />
        </div>

        {/*About section*/}

        <div className={styles.aboutSection}>
          <h2 className={styles.aboutHeader}>About</h2>
          <AboutProduct description={currentProduct?.description ?? []} />
        </div>

        {/*TechSpec region*/}
        <div className={styles.techSpecFullBlock}>
          <TechSpec
            screen={currentProduct?.screen ?? ''}
            resolution={currentProduct?.resolution ?? ''}
            processor={currentProduct?.processor ?? ''}
            ram={currentProduct?.ram ?? ''}
            capacity={currentProduct?.capacity ?? ''}
            camera={currentProduct?.camera ?? ''}
            zoom={currentProduct?.zoom ?? ''}
            cell={currentProduct?.cell ?? []}
          />
        </div>

        {/*Suggested Items region*/}
        <div className={styles.suggestedItemsBlock}>
          <SuggestedProducts
            itemId={itemId}
            currentItems={currentItems ?? []}
            category={category}
          />
        </div>
      </div>
    </>
  );
};
