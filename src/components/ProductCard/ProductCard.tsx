import { useCallback, useContext, useMemo } from 'react';
import classNames from 'classnames';
import { AppContext } from '../../Root';
import { StorageProduct } from '../../types/StorageProduct';
import { StorageItem } from '../../types/StorageItem';
import styles from './ProductCard.module.scss';

interface Props {
  product: StorageProduct;
  sliderCard?: boolean;
  showFullPriceOnly?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  sliderCard = false,
  showFullPriceOnly = false,
}) => {
  const { itemId, name, fullPrice, price, screen, capacity, ram, image } =
    product;

  const noDiscount = fullPrice === price;

  const { favoritesItems, setFavoritesItems, cartItems, setCartItems } =
    useContext(AppContext);

  const isProductInCart = useMemo(
    () =>
      cartItems.some(
        ({ product: cartProduct }) => cartProduct.itemId === itemId,
      ),
    [cartItems, itemId],
  );

  const isProductInFavorites = useMemo(
    () =>
      favoritesItems.some(
        ({ product: favoritesProduct }) => favoritesProduct.itemId === itemId,
      ),
    [favoritesItems, itemId],
  );

  const handleAddToCartClick = useCallback(() => {
    if (isProductInCart) {
      return;
    }

    const newItem: StorageItem = {
      id: +new Date(),
      quantity: 1,
      product: {
        ...product,
        appliedPrice: showFullPriceOnly || noDiscount ? fullPrice : price,
      },
    };

    setCartItems([...cartItems, newItem]);
  }, [
    product,
    showFullPriceOnly,
    isProductInCart,
    cartItems,
    fullPrice,
    price,
    noDiscount,
    setCartItems,
  ]);

  const handleAddToFavorites = useCallback(() => {
    if (!isProductInFavorites) {
      const newItem: StorageItem = {
        id: +new Date(),
        quantity: 1,
        product,
      };

      setFavoritesItems([...favoritesItems, newItem]);

      return;
    }

    setFavoritesItems(
      favoritesItems.filter(
        ({ product: favoritesProduct }) => favoritesProduct.itemId !== itemId,
      ),
    );
  }, [
    product,
    itemId,
    isProductInFavorites,
    favoritesItems,
    setFavoritesItems,
  ]);

  return (
    <div
      className={classNames(styles.productCard, {
        [styles.sliderCard]: sliderCard,
      })}
    >
      <div className={styles.imgWrapper}>
        <img className={styles.img} src={image} alt={itemId} />
      </div>

      <p className={styles.name}>{name}</p>

      <div className={styles.priceWrapper}>
        <p
          className={styles.price}
          hidden={showFullPriceOnly || noDiscount}
        >{`$${price}`}</p>
        <p
          className={classNames(styles.fullPrice, {
            [styles.fullPriceOnly]: showFullPriceOnly || noDiscount,
          })}
        >{`$${fullPrice}`}</p>
      </div>

      <div className={styles.hr}></div>

      <table>
        <tbody className={styles.tbody}>
          <tr className={styles.row}>
            <td className={styles.cell1}>Screen</td>
            <td className={styles.cell2}>{screen}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell1}>Capacity</td>
            <td className={styles.cell2}>{capacity}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell1}>RAM</td>
            <td className={styles.cell2}>{ram}</td>
          </tr>
        </tbody>
      </table>

      <div className={styles.buttons}>
        <button
          type="button"
          className={classNames(styles.btnToCart, {
            [styles.btnToCartSelected]: isProductInCart,
          })}
          onClick={handleAddToCartClick}
        />
        <button
          type="button"
          className={classNames(styles.btnToFavorites, {
            [styles.btnToFavoritesSelected]: isProductInFavorites,
          })}
          onClick={handleAddToFavorites}
        />
      </div>
    </div>
  );
};
