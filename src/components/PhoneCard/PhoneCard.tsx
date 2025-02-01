/* eslint-disable import/no-extraneous-dependencies */
import { addProduct, selectFavourites } from '../../state/favouriteSlice';
import style from './PhoneCard.module.scss';
import '../../styles/Buttons.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectToCart } from '../../state/cartSlice';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { scrollToTop } from '../../Tools/ScrollToTop';

type Props = {
  product: Product;
};

export const PhoneCard: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const favouriteProducts = useSelector(selectFavourites);

  const cartState = useSelector(selectToCart);

  const isInCart = () => {
    return cartState.some(cartItem => cartItem.id === product.id);
  };

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(addToCart(product));
  };

  const handleAddToFavourite = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(addProduct(product.id));
  };

  return (
    <div className={style.card}>
      <Link
        to={`/phones/${product.itemId}`}
        key={product.id}
        onClick={() => scrollToTop()}
      >
        <img className={style.card__image} src={product.image} alt="iphone" />
        <h1 className={style.card__title}>{product.name}</h1>
      </Link>
      <div className={style.card__prices}>
        <h1 className={style.card__price}>{product.price}$</h1>
        <h1 className={`${style.card__price} ${style['card__price--old']}`}>
          {product.fullPrice}$
        </h1>
      </div>
      <div className={style.card__divider}></div>
      <div className={style.card__spec_list}>
        <div className={style.card__spec_container}>
          <p className={style.card__spec}>Screen</p>
          <p className={style.card__spec}>{product.screen}</p>
        </div>
        <div className={style.card__spec_container}>
          <p className={style.card__spec}>Capacity</p>
          <p className={style.card__spec}>{product.capacity}</p>
        </div>
        <div className={style.card__spec_container}>
          <p className={style.card__spec}>RAM</p>
          <p className={style.card__spec}>{product.ram}</p>
        </div>
      </div>
      <div className={style.card__buttons}>
        <button
          className={
            isInCart()
              ? 'button__btn_buy button__btn_buy--active'
              : 'button__btn_buy'
          }
          aria-label="Add to cart"
          onClick={handleAddToCart}
        >
          {isInCart() ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          className={
            favouriteProducts.includes(product.id)
              ? ' button__btn_fav button__btn_fav--active'
              : 'button__btn_fav'
          }
          onClick={handleAddToFavourite}
        ></button>
      </div>
    </div>
  );
};
