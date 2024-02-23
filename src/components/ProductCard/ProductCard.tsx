import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Icons } from '../../types/enums/Icons';
import { Item } from '../../types/interface/Item';
import { Icon } from '../Icon';
import './ProductCard.scss';
import { BASE_URL } from '../../utils/fetchClient';
import { useAppDispatch } from '../../store/hooks/redux';
import { addToCart } from '../../store/reducers/cartSlice';
import { Product } from '../../store/models/product';
import {
  toggleFavorite,
} from '../../store/reducers/favoritesSlice';

interface Props {
  item: Item,
  isInCart?: boolean,
  isInFav?: boolean,
}

export const ProductCard: React.FC<Props> = ({
  item,
  isInCart = false,
  isInFav = false,
}) => {
  const productImgPath = `${BASE_URL}${item.image}`;

  const dispatch = useAppDispatch();

  const onCartAdd = (product: Product) => {
    dispatch(addToCart(product));
  };

  const onFavoritesToggle = (product: Product) => {
    dispatch(toggleFavorite(product));
  };

  return (

    <div className="productCard">
      <NavLink
        className="productCard__link"
        to={`/${item.category}/${item.phoneId}`}
      >
        <img
          src={productImgPath}
          alt="moto"
          className="productCard__image"
        />
        <p className="productCard__title">{`${item.name} (iMT9G2FS/A)`}</p>
        <div className="productCard__price-container">
          <p className="productCard__price">{`$${item.price}`}</p>
          <p className="productCard__price-promo">{`$${item.fullPrice}`}</p>
        </div>
      </NavLink>
      <div className="productCard__divider" />
      <div className="productCard__info-container">
        <div className="productCard__info-left">
          <p className="productCard__info-prop">screen</p>
          <p className="productCard__info-prop">capacity</p>
          <p className="productCard__info-prop">RAM</p>
        </div>
        <div className="productCard__info-right">
          <p className="productCard__info-val">{item.screen}</p>
          <p className="productCard__info-val">{item.capacity}</p>
          <p className="productCard__info-val">{item.ram}</p>
        </div>
      </div>
      <div className="productCard__controls">
        <button
          type="button"
          aria-label="cart"
          className={cn('productCard__cartbtn', {
            'productCard__cartbtn--incart': isInCart,
          })}
          onClick={() => onCartAdd(item)}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          aria-label="fav"
          className="productCard__favbtn"
          onClick={() => onFavoritesToggle(item)}
        >
          {isInFav
            ? <Icon icon={Icons.HeartActive} />
            : <Icon icon={Icons.Heart} />}
        </button>
      </div>
    </div>
  );
};
