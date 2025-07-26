import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { useCart } from '../../../CartPage/context/CartContext';
// eslint-disable-next-line max-len
import { useFavourite } from '../../../FavouritesPage/context/FavouritesContext';
// eslint-disable-next-line max-len

type Props = {
  name: string;
  images: string;
  priceDiscount: number | undefined;
  priceRegular: number;
  screen: string;
  capacity: string;
  ram: string;
  id: string;
  category: string;
};

export const ProductCard = ({
  name,
  images,
  priceDiscount,
  priceRegular,
  screen,
  ram,
  capacity,
  id,
  category,
}: Props) => {
  const { addItem, cartItems } = useCart();
  const { addFavourite, removeFavourite, favouriteItems } = useFavourite();

  const checkIfInCart = cartItems.find(item => item?.id === id);

  return (
    <div className={styles.card}>
      <Link to={`/${category}/${id}`}>
        <img className={styles.card__image} src={images} loading="lazy"></img>
      </Link>
      <Link className={styles.card__title} to={`/${category}/${id}`}>
        {name}
      </Link>
      <div className={styles.card__price}>
        <p className={styles['card__price-current']}>${priceDiscount}</p>
        <p className={styles['card__price-before']}>${priceRegular}</p>
      </div>
      <div className={styles.card__divider}></div>
      <div className={styles.card__specifications}>
        <div className={styles['card__specifications-item']}>
          <div className={styles['card__specifications-title']}>Screen</div>

          <div className={styles['card__specifications-params']}>{screen}</div>
        </div>

        <div className={styles['card__specifications-item']}>
          <div className={styles['card__specifications-title']}>Capacity</div>

          <div className={styles['card__specifications-params']}>
            {capacity}
          </div>
        </div>

        <div className={styles['card__specifications-item']}>
          <div className={styles['card__specifications-title']}>RAM</div>

          <div className={styles['card__specifications-params']}>{ram}</div>
        </div>
      </div>
      <div className={styles.card__buttons}>
        <button
          disabled={checkIfInCart !== undefined}
          onClick={() => {
            addItem({
              id: id,
              name: name,
              price: priceDiscount ?? 0,
              quantity: 1,
              image: images,
            });
          }}
        >
          {checkIfInCart !== undefined ? 'Added to cart' : 'Add to cart'}
        </button>
        <button className={styles.card__favourites}>
          <img
            onClick={() => {
              const findFav = favouriteItems.find(fav => fav?.id === id);

              if (findFav === undefined) {
                addFavourite({
                  name,
                  images,
                  priceDiscount,
                  priceRegular,
                  screen,
                  ram,
                  capacity,
                  id,
                  category,
                });
              } else {
                removeFavourite(id);
              }
            }}
            className={styles.card__heart}
            src="public/icons/Favourite.svg"
            alt="heart-icon"
          />
        </button>
      </div>
    </div>
  );
};
