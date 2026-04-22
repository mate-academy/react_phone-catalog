import styles from './ProductCard.module.scss';
import { Product } from '../types/Product';
import { Link } from 'react-router-dom';
import { Price } from '../Price/Price';
import { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { CartContext, CartItem } from '../../context/CartContext';

interface Props {
  product: Product;
  showDiscount?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  showDiscount = false,
}) => {
  const {
    price,
    fullPrice,
    name,
    priceRegular,
    priceDiscount,
    screen,
    capacity,
    ram,
    // image,
    // images,
    itemId,
  } = product;
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const isFavorite = favorites.some((item: Product) => item.itemId === itemId);
  const currentPrice = priceDiscount || price;
  const oldPrice = priceRegular || fullPrice;
  // const finalImage = images ? images[0] : image;

  const productUrl = `/product/${product.itemId}`;
  const rawImage = product.images?.length ? product.images[0] : product.image; // ?
  const finalImage = rawImage?.startsWith('http') ? rawImage : `/${rawImage}`;
  const isInCart = cart.some((item: CartItem) => item.id === itemId);

  const handleCartClick = () => {
    const targetId = String(product.itemId || product.id);

    if (isInCart) {
      removeFromCart(targetId);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <Link to={productUrl} className={styles.imageLink}>
          <img src={finalImage} alt={itemId} className={styles.itemImage} />
        </Link>
      </div>

      <Link to={productUrl}>
        <p className={styles.title}>{name}</p>
      </Link>

      <div className={styles.prices}>
        <Price
          discount={currentPrice || 0}
          regular={oldPrice || 0}
          showDiscount={showDiscount}
        />
      </div>
      <div className={styles.strip}></div>

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span>Screen</span>
          <p>{screen}</p>
        </div>
        <div className={styles.specRow}>
          <span>Capacity</span>
          <p>{capacity}</p>
        </div>
        <div className={styles.specRow}>
          <span>RAM</span>
          <p>{ram}</p>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          className={`${styles.addButton} ${isInCart ? styles.addedButton : ''}`}
          // onClick={() => addToCart(product)}
          onClick={handleCartClick}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          className={styles.favotiteButton}
          onClick={() => toggleFavorite(product)}
        >
          <img
            src={isFavorite ? '/img/icons/Union.png' : '/img/icons/heart.svg'}
            alt="Favorite"
          />
        </button>
      </div>
    </div>
  );
};
