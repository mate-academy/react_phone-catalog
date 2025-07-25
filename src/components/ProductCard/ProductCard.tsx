import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';
import { useContext } from 'react';
import { CartandFavContext } from '../CartandFavProvider';
import classNames from 'classnames';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();
  const { cart, fav, setCart, setFav } = useContext(CartandFavContext);
  const isInCart = cart.some(item => item.id === product.itemId);
  const isInFav = fav.some(item => item.itemId === product.itemId);

  const handleAddToCart = () => {
    const newCartItem = {
      id: product.itemId,
      quantity: 1,
      product: product,
    };

    setCart(prevCart => [...prevCart, newCartItem]);
  };

  const handleAddToFav = () => {
    if (!isInFav) {
      setFav(prevFav => [...prevFav, product]);
    } else {
      setFav(prevFav => prevFav.filter(item => item.itemId !== product.itemId));
    }
  };

  return (
    <div className={styles.card}>
      <img
        src={`..\\..\\..\\public\\${product.image}`}
        className={styles.cardImage}
        onClick={() =>
          navigate(`/${product.category}/product/${product.itemId}`)
        }
      ></img>
      <p
        className={styles.cardTitle}
        onClick={() =>
          navigate(`/${product.category}/product/${product.itemId}`)
        }
      >{`${product.name} (iMT9G2FS/A)`}</p>
      <div className={styles.cardPrice}>
        <span>{`$${product.price}`}</span>
        <span className={styles.cardPrice_full}>{`$${product.fullPrice}`}</span>
      </div>
      <div className={styles.cardProperties}>
        <div className={styles.cardProperty}>
          <span className={styles.cardPropertyName}>Screen</span>
          <span className={styles.cardPropertyValue}>{product.screen}</span>
        </div>
        <div className={styles.cardProperty}>
          <span className={styles.cardPropertyName}>Capacity</span>
          <span className={styles.cardPropertyValue}>{product.capacity}</span>
        </div>
        <div className={styles.cardProperty}>
          <span className={styles.cardPropertyName}>RAM</span>
          <span className={styles.cardPropertyValue}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.cardButtons}>
        <button
          type="button"
          className={styles.cardAddButton}
          disabled={isInCart}
          onClick={() => handleAddToCart()}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          className={classNames(styles.cardFavButton, {
            [styles.addedToFav]: isInFav,
          })}
          onClick={() => handleAddToFav()}
        >
          <img
            src={
              isInFav
                ? '/img/icons/favourite-selected.svg'
                : '/img/icons/favourite-default.svg'
            }
            alt="favourites"
          />
        </button>
      </div>
    </div>
  );
};
