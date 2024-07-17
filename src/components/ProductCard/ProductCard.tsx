import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Product } from '../../types/Product';
import { CartContext, DispatchCartContext } from '../../store/CartContext';
import {
  DispatchLikedContext,
  LikedContext,
} from '../../store/FavouritesContext';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    id,
    itemId,
    category,
    image,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
  } = product;
  const { t } = useTranslation();
  const cartState = useContext(CartContext);
  const dispatchCart = useContext(DispatchCartContext);
  const favouritesState = useContext(LikedContext);
  const dispatchFavourites = useContext(DispatchLikedContext);

  const isItemInCart = !!cartState.find(item => item.id === id);
  const isItemLiked = !!favouritesState.find(item => item.id === id);

  const handleAddToCart = (item: Product) => {
    if (!isItemInCart) {
      dispatchCart({ type: 'add', payload: item });
    } else {
      dispatchCart({ type: 'deleteProduct', payload: itemId });
    }
  };

  return (
    <article className="product-card">
      <Link
        to={`/${category}/${itemId}`}
        className="product-card__image-frame"
        title={t(TRANSLATIONS.productCard.link.title, { name })}
        aria-label={t(TRANSLATIONS.productCard.link.ariaLabel, { name })}
      >
        <div className="product-card__see-details">
          <p>{t(TRANSLATIONS.productCard.tooltip)}</p>
        </div>
        <img src={image} alt={name} className="product-card__image" />
      </Link>

      <div className="product-card__title">
        <Link
          to={`/${category}/${itemId}`}
          className="product-card__title-text"
          title={t(TRANSLATIONS.productCard.title.title, { name })}
          aria-label={t(TRANSLATIONS.productCard.title.ariaLabel, {
            name,
          })}
        >
          {name}
        </Link>
      </div>

      <div className="price-block">
        <h3>
          <span className="visually-hidden">
            {t(TRANSLATIONS.productCard.price.current)}
          </span>
          ${price}
        </h3>
        <p className="price-block__full-price">
          <span className="visually-hidden">
            {t(TRANSLATIONS.productCard.price.full)}
          </span>
          ${fullPrice}
        </p>
      </div>

      <div className="divider"></div>

      <ul className="specifications-list">
        <li className="specifications-list__item--sm">
          <p className="text-color-sec">{t(TRANSLATIONS.productCard.screen)}</p>
          <p>{screen}</p>
        </li>

        <li className="specifications-list__item--sm">
          <p className="text-color-sec">
            {t(TRANSLATIONS.productCard.capacity)}
          </p>
          <p>{capacity}</p>
        </li>

        <li className="specifications-list__item--sm">
          <p className="text-color-sec">{t(TRANSLATIONS.productCard.ram)}</p>
          <p>{ram}</p>
        </li>
      </ul>

      <div className="product-card__buttons">
        <button
          type="button"
          className={classNames('btn', {
            'btn--selected': isItemInCart,
            'btn--primary': !isItemInCart,
          })}
          onClick={() => handleAddToCart(product)}
          aria-label={
            isItemInCart
              ? t(TRANSLATIONS.productCard.button.cart.ariaLabel.rm, { name })
              : t(TRANSLATIONS.productCard.button.cart.ariaLabel.add, { name })
          }
        >
          {isItemInCart ? (
            <>{t(TRANSLATIONS.productCard.button.cart.text.added)}</>
          ) : (
            <>{t(TRANSLATIONS.productCard.button.cart.text.add)}</>
          )}
        </button>
        <button
          type="button"
          className={classNames('btn btn--square-md', {
            'btn--liked': isItemLiked,
          })}
          onClick={() =>
            dispatchFavourites({ type: 'toggle', payload: product })
          }
          aria-label={
            isItemLiked
              ? t(TRANSLATIONS.productCard.button.fav.ariaLabel.rm, { name })
              : t(TRANSLATIONS.productCard.button.fav.ariaLabel.add, { name })
          }
        >
          <span
            className={classNames('icon', {
              'icon--heart-stroke': !isItemLiked,
              'icon--heart-filled': isItemLiked,
            })}
          ></span>
        </button>
      </div>
    </article>
  );
};
