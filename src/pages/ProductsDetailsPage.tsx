import { useOutletContext, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { BackNavigation } from '../components/BackNavigation/BackNavigaton';
import { ProductDetails } from '../types/ProductDetails';
import styles from './ProductDetailsPage.module.scss';

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

export const ProductsDetailsPage = () => {
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
  const [currentProduct, setCurrentPhone] = useState<ProductDetails | null>(
    productDetails ?? null,
  );

  const [activeImage, setActiveImage] = useState(
    currentProduct?.images[0] ?? '',
  );

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

  return (
    <>
      <Breadcrumbs
        category={product.category}
        productName={currentProduct?.name ?? product.name}
      />
      <BackNavigation />
      <div className={styles.productPage}>
        <h1 className={styles.productName}>
          {currentProduct?.name ?? productDetails.name}
        </h1>
        <img
          src={activeImage}
          alt={productDetails.name}
          className={styles.mainImage}
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

        <div className={styles.colors}>
          <div className={styles.textBlockColors}>
            <p className={styles.textColor}>Available colors</p>
            <p className={styles.productId}>ID: {product.id}</p>
          </div>

          <div className={styles.colorsList}>
            {productDetails.colorsAvailable.map(color => (
              <button
                className={`${styles.colorButton} ${currentProduct?.color === color ? styles.colorButtonActive : ''}`}
                key={color}
                style={{ backgroundColor: colorMap[color] }}
                onClick={() => {
                  const newId = `${productDetails.namespaceId}-${productDetails.capacity.toLowerCase()}-${color}`;
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

        <div>
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

        <div className={styles.blockPrices}>
          <span className={styles.price}>${currentProduct?.priceDiscount}</span>
          {currentProduct?.priceRegular !== currentProduct?.priceDiscount && (
            <span className={styles.fullPrice}>
              ${currentProduct?.priceRegular}
            </span>
          )}
        </div>

        <div className={styles.blockButtons}>
          <button type="button" className={styles.cartButton}>
            Add to cart
          </button>
          <button type="button" className={styles.favButton}>
            <img
              src="./img/icons/add_favourites_button.png"
              alt="Add to favourites"
            />
          </button>
        </div>
      </div>
    </>
  );
};
