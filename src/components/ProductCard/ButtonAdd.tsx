import styles from './productcard.module.scss';
import heardBuron from './productCard-logo/Favourites.png';
import heardBuronActive from './productCard-logo/favoriteActive.png';
import { Product } from '../../services/productType';
import React from 'react';
// import { useLocalStorage } from '../../local/localStorege';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import {
  addFavorite,
  addToCart,
  removeFavorite,
  removeFromCart,
} from '../../feachers/detailSlice';

type Props = {
  item: Product;
};

export const ButtonsAddandFavorits: React.FC<Props> = ({ item }) => {
  // const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);
  // const [cart, setCart] = useLocalStorage<Product[]>('cart', []);
  // const [isFavorite, setIsFavorite] = useState(false);
  // const [isCart, setIsCart] = useState(false);

  // const isCart = useAppSelector(state => state.cartAndFavorits.isCart);
  // const isFavorite = useAppSelector(state => state.cartAndFavorits.isCart);

  const cart = useAppSelector(state => state.cartAndFavorits.cart);
  const favorites = useAppSelector(state => state.cartAndFavorits.favorites);
  const isCart = useAppSelector(state =>
    state.cartAndFavorits.cart.some(
      product => product.id === item.id && product.isCart,
    ),
  );

  const isFavorite = useAppSelector(state =>
    state.cartAndFavorits.favorites.some(
      fav => fav.id === item.id && fav.isFavorite,
    ),
  );

  const dispatch = useAppDispatch();

  // eslint-disable-next-line no-console
  console.log(favorites);

  // eslint-disable-next-line no-console
  console.log(cart);

  // useEffect(() => {
  //   const isItemInFavorites = favorites.some(favItem => favItem.id === item.id);

  //   // setIsFavorite(isItemInFavorites);
  // }, [favorites, item]);

  // useEffect(() => {
  //   const isItemInCart = cart.some(carItem => carItem.id === item.id);

  //   setIsCart(isItemInCart);
  // }, [cart, item]);

  const handlerAddFavorites = () => {
    if (isFavorite) {
      dispatch(removeFavorite(item));
    } else {
      dispatch(addFavorite(item));
    }
  };

  const handlerAddProduct = () => {
    if (isCart) {
      dispatch(removeFromCart(item));
    } else {
      dispatch(addToCart(item));
    }
  };

  return (
    <>
      <div className={styles.cardButtons}>
        <button
          className={!isCart ? `${styles.addCard}` : `${styles.addedCart}`}
          onClick={handlerAddProduct}
        >
          {!isCart ? 'Add to cart' : 'Added to cart'}
        </button>
        <button className={styles.like} onClick={handlerAddFavorites}>
          {!isFavorite ? (
            <img
              className={styles.heardIcon}
              src={heardBuron}
              alt="Favorite"
            ></img>
          ) : (
            <img
              className={styles.heardIcon}
              src={heardBuronActive}
              alt="Favorite"
            ></img>
          )}
        </button>
      </div>
    </>
  );
};
