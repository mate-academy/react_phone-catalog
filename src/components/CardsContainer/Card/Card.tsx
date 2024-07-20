import { Link } from 'react-router-dom';
import style from './Card.module.scss';
import { Product } from '../../../types/ContextType/Product';
import classNames from 'classnames';
import { LanguageContext } from '../../../store/LanguageProvider';
import { RefObject, useContext } from 'react';
import { ShoppingCartContext } from '../../../store/ShoppingCartProvider';
import { StateContext } from '../../../store/StateProvider';
import { IconFavorites } from '../../Icons/IconFavorites';
import Heart from '../../../image/Favorites/heart.svg';
import { ThemeContext } from '../../../store/ThemeProvider';
import { handleCheckCarts } from '../../../utils/handleCheckCards';
import { availableFav } from '../../../utils/availableFav';
import { useScrollToTop } from '../../../utils/hooks/useScrollToTop';

type Props = {
  product: Product;
  discount?: boolean;
  widthRef?: RefObject<HTMLDivElement>;
};

export const Card: React.FC<Props> = ({
  product,
  discount = false,
  widthRef,
}) => {
  const { t } = useContext(LanguageContext);
  const { cartItems, handleAddToCart } = useContext(ShoppingCartContext);
  const { favorites, handleAddToFavorites } = useContext(StateContext);
  const { theme } = useContext(ThemeContext);
  const { screen, capacity, ram } = product;
  useScrollToTop();
  return (
    <div
      ref={widthRef}
      key={product.id}
      className={classNames(style.card__container, {
        [style.card__darkTheme]: theme,
      })}
    >
      <Link
        to={`../../${product.category}/${product.itemId}`}
        className={style.card__cardLink}
        draggable={false}
      >
        <img
          src={product.image}
          alt={product.name}
          className={style.card__cardImg}
          draggable={false}
        />
      </Link>
      <div className={style.card__cardContent}>
        <Link
          to={`../../${product.category}/${product.itemId}`}
          className={style.card__cardName}
        >
          {product.name}
        </Link>
        <div className={style.card__price}>
          {discount ? (
            <p className={style.card__discountPrice}>&#36;{product.price}</p>
          ) : (
            <p className={style.card__discountPrice}>
              &#36;{product.fullPrice}
            </p>
          )}
          {discount && (
            <p className={style.card__fullPrice}>&#36;{product.fullPrice}</p>
          )}
        </div>

        <span className={style.card__cardLine} />
        {Object.entries({ screen, capacity, ram }).map(([key, value]) => (
          <div className={style.card__cardDescription} key={key}>
            <p className={style.card__key}>{t(key)}</p>
            <p className={style.card__value}>{value}</p>
          </div>
        ))}
      </div>

      <div className={style.card__cardActions}>
        <button
          className={classNames(style.card__addToCart, {
            [style.card__addedToCart]: handleCheckCarts(product, cartItems),
          })}
          onClick={() => handleAddToCart(product)}
        >
          {handleCheckCarts(product, cartItems)
            ? t('addedToCart')
            : t('addToCart')}
        </button>
        <button
          className={classNames(style.card__сardFavBtn, {
            [style.card__selectedFavorite]: availableFav(product, favorites),
          })}
          onClick={() => handleAddToFavorites(product)}
        >
          {availableFav(product, favorites) ? (
            <img src={Heart} alt="LikeLogo" />
          ) : (
            <IconFavorites />
          )}
        </button>
      </div>
    </div>
  );
};
