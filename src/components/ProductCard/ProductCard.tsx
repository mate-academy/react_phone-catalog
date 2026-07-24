import { ItemPreview } from '../../types/Product';
import heart from '../../../public/icons/Favourites (Heart Like).svg';
// eslint-disable-next-line max-len
import heartFilled from '../../../public/icons/Favourites Filled (Heart Like).svg';
import style from './ProductCard.module.scss';
import { useFavorites } from '../../context/FavoritesContext';
import { useAddedToCart } from '../../context/AddedToCartContext';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../styles/utils/ScrollTop';

export const ProductCard = ({
  item,
  discount,
}: {
  item: ItemPreview;
  discount: boolean;
}) => {
  const { favorites, toggleFavorite } = useFavorites();
  const { addedToCart, addToCart } = useAddedToCart();
  const isFavorite = favorites.includes(String(item.id));
  const isAddedToCart = addedToCart.some(
    cartItem => String(cartItem.id) === String(item.id),
  );

  return (
    <div key={item.id} className={style.card}>
      <Link
        to={`/${item.category}/${item.itemId}`}
        className={style.card__image__box}
        onClick={() => scrollToTop()}
      >
        <img src={item.image} alt={item.name} className={style.card__image} />
      </Link>
      <div className={style.card__infoBlock}>
        <h2 className={style.card__title}>{item.name}</h2>
      </div>
      <div className={style.priceBlock}>
        {item.fullPrice !== undefined && discount === true ? (
          <div className={style.priceBlock__prices}>
            <span className={style.price}>${item.price}</span>
            <span className={style.regularPrice}>${item.fullPrice}</span>
          </div>
        ) : (
          <span className={style.price}>${item.price}</span>
        )}
      </div>
      <div className={style.card_spec_box_main}>
        <div className={style.card_spec_box}>
          <span>Screen</span>
          <span>{item.screen}</span>
        </div>
        <div className={style.card_spec_box}>
          <span>Capacity</span>
          <span>{item.capacity}</span>
        </div>
        <div className={style.card_spec_box}>
          <span>RAM</span>
          <span>{item.ram}</span>
        </div>
      </div>
      <div className={style.card__buy_box}>
        <div className={style.card__button}>
          <button
            onClick={() => addToCart(String(item.id))}
            className={
              isAddedToCart
                ? `${style.card__button__text}`
                : `${style.card__button__text__added}`
            }
          >
            {isAddedToCart ? 'Added to cart' : 'Add to cart'}
          </button>
        </div>
        <button
          onClick={() => toggleFavorite(String(item.id))}
          className={style.card__heart__box}
        >
          <img src={isFavorite ? heartFilled : heart} />
        </button>
      </div>
    </div>
  );
};
