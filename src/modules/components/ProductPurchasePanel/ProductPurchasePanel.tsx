import { Link } from 'react-router-dom';
import { ProductButtons } from '@components/ProductButtons';
import { Product } from '@models/Product';
import { ProductData } from '@models/ProductData';
import { useCart } from '@context/CartContext';
import { useFavourites } from '@context/FavoriteContext';
import styles from './ProductPurchasePanel.module.scss';

type Props = {
  product: ProductData;
  allProducts: Product[];
  categoryProducts: ProductData[];
  isLightMode: boolean;
};

export const ProductPurchasePanel: React.FC<Props> = ({
  product,
  allProducts,
  categoryProducts,
  isLightMode,
}) => {
  const productId: Product = allProducts.find(p => p.itemId === product.id);
  const { favourites, addToFavourites, removeFromFavourites, isFavourite } =
    useFavourites();
  const { cartProducts, addToCart, removeFromCart, isInCart } = useCart();

  const getColorLink = (color: string) => {
    const productToLink: ProductData | undefined = categoryProducts.find(
      (item: ProductData) =>
        item.color.replace(/ /g, '-') === color &&
        item.capacity === product.capacity &&
        item.category === product.category &&
        item.namespaceId === product.namespaceId,
    );

    return productToLink
      ? `/${productToLink.category}/${productToLink.id}`
      : '#';
  };

  const getCapasityLink = (capasity: string) => {
    return `/${product.category}/${product.id.replace(product.capacity.toLowerCase(), capasity.toLowerCase())}`;
  };

  const handleFavouriteClick = () => {
    if (favourites.includes(productId.id.toString())) {
      removeFromFavourites(productId.id.toString());
    } else {
      addToFavourites(productId.id.toString());
    }
  };

  const handleCartClick = () => {
    if (cartProducts.some(cart => cart.id === productId.id.toString())) {
      removeFromCart(productId.id.toString());
    } else {
      addToCart(productId.id.toString());
    }
  };

  return (
    <>
      <div className={styles.panel}>
        <div className={styles.panel__colors}>
          <div className={styles.panel__colors__top}>
            <h3 className={styles.panel__title}>Available colors</h3>
            <h4 className={styles.panel__colors__id}>ID: {productId.id}</h4>
          </div>
          <div className={styles.panel__color}>
            {product.colorsAvailable.map((color, index) => (
              <Link
                to={getColorLink(color)}
                key={index}
                className={`${styles['panel__color__item--outer']} ${color === product.color ? styles['panel__color__item--outer-active'] : ''}`}
              >
                <div
                  key={index}
                  className={styles['panel__color__item--iner']}
                  style={{ backgroundColor: color }}
                ></div>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.panel__capacity}>
          <h3 className={styles.panel__title}>Select capacity</h3>
          <div className={styles.panel__capacity__box}>
            {product.capacityAvailable.map((capasity, index) => (
              <Link
                to={getCapasityLink(capasity)}
                key={index}
                className={`${styles.panel__capacity__item} ${product.capacity === capasity ? styles['panel__capacity__item--active'] : '#'}`}
              >
                <span
                  className={`${styles.panel__capacity__text} ${product.capacity === capasity ? styles['panel__capacity__text--active'] : '#'}`}
                >
                  {capasity}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.panel__prices}>
          <h2 className={styles.panel__price}>${product.priceDiscount}</h2>
          <h2 className={styles['panel__price--regular']}>
            ${product.priceRegular}
          </h2>
        </div>
        <ProductButtons
          isInCart={isInCart(productId.id.toString())}
          handleCartClick={handleCartClick}
          isFavourite={isFavourite(productId.id.toString())}
          handleFavouriteClick={handleFavouriteClick}
          isLightMode={isLightMode}
        />
        <div className={styles.panel__details}>
          <div className={styles.panel__detail}>
            <h3 className={styles.panel__detail__title}>Screen</h3>
            <span className={styles.panel__detail__text}>{product.screen}</span>
          </div>
          <div className={styles.panel__detail}>
            <h3 className={styles.panel__detail__title}>Resolution</h3>
            <span className={styles.panel__detail__text}>
              {product.resolution}
            </span>
          </div>
          <div className={styles.panel__detail}>
            <h3 className={styles.panel__detail__title}>Processor</h3>
            <span className={styles.panel__detail__text}>
              {product.processor}
            </span>
          </div>
          <div className={styles.panel__detail}>
            <h3 className={styles.panel__detail__title}>RAM</h3>
            <span className={styles.panel__detail__text}>{product.ram}</span>
          </div>
        </div>
      </div>
      <h4 className={styles['panel__colors__id--desktop']}>
        ID:{productId.id}
      </h4>
    </>
  );
};
