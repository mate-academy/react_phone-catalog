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
import styles from './ProductCard.module.scss';
import btnStyles from '../../styles/buttons.module.scss';
import iconStyles from '../../styles/icons.module.scss';
import gStyles from '../../styles/general.module.scss';

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
    <article className={styles.block}>
      <Link
        to={`/${category}/${itemId}`}
        className={styles.imageFrame}
        title={t(TRANSLATIONS.productCard.link.title, { name })}
        aria-label={t(TRANSLATIONS.productCard.link.ariaLabel, { name })}
      >
        <div className={styles.seeDetails}>
          <p>{t(TRANSLATIONS.productCard.tooltip)}</p>
        </div>
        <img src={image} alt={name} className={styles.image} loading="lazy" />
      </Link>

      <div className={styles.title}>
        <Link
          to={`/${category}/${itemId}`}
          className={styles.title__text}
          title={t(TRANSLATIONS.productCard.title.title, { name })}
          aria-label={t(TRANSLATIONS.productCard.title.ariaLabel, {
            name,
          })}
        >
          {name}
        </Link>
      </div>

      <div className={gStyles.price}>
        <h3>
          <span className={gStyles.visuallyHidden}>
            {t(TRANSLATIONS.productCard.price.current)}
          </span>
          ${price}
        </h3>
        <p className={gStyles.price__full}>
          <span className={gStyles.visuallyHidden}>
            {t(TRANSLATIONS.productCard.price.full)}
          </span>
          ${fullPrice}
        </p>
      </div>

      <div className={gStyles.divider}></div>

      <ul className={gStyles.specsList}>
        <li className={gStyles.specsList__itemSm}>
          <p>{t(TRANSLATIONS.productCard.screen)}</p>
          <p>{screen}</p>
        </li>

        <li className={gStyles.specsList__itemSm}>
          <p>{t(TRANSLATIONS.productCard.capacity)}</p>
          <p>{capacity}</p>
        </li>

        <li className={gStyles.specsList__itemSm}>
          <p>{t(TRANSLATIONS.productCard.ram)}</p>
          <p>{ram}</p>
        </li>
      </ul>

      <div className={styles.buttons}>
        <button
          type="button"
          className={classNames(btnStyles.block, {
            [btnStyles.selected]: isItemInCart,
            [btnStyles.primary]: !isItemInCart,
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
          className={classNames(`${btnStyles.block} ${btnStyles.squareMd}`, {
            [btnStyles.liked]: isItemLiked,
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
            className={classNames(iconStyles.block, {
              [iconStyles.heartStroke]: !isItemLiked,
              [iconStyles.heartFilled]: isItemLiked,
            })}
          ></span>
        </button>
      </div>
    </article>
  );
};
