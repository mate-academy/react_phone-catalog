import styles from './Card.module.scss';
import stylesIcon from '../../styles/icon.module.scss';
import stylesBtn from '../../styles/button.module.scss';
import { useContext } from 'react';
import { Product } from '../../types';
import { LangContext } from '../../context/LangContext';
import { translate } from '../../utils/translate';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { favoriteSlice } from '../../features/favoriteSlice';
import { cartSlice } from '../../features/cartSlice';

type Props = {
  item: Product;
  discount: boolean;
  fullwidth?: boolean;
};

export const Card: React.FC<Props> = ({
  item,
  discount,
  fullwidth = false,
}) => {
  const { lang } = useContext(LangContext);
  const { favoriteGoods } = useAppSelector(state => state.favorites);
  const { cartGoods } = useAppSelector(state => state.cart);
  const { darkTheme } = useAppSelector(state => state.darkTheme);
  const dispatch = useAppDispatch();

  const isItemInCart = cartGoods.some(good => good.id === item.id);
  const isItemInFavorites = favoriteGoods.some(good => good.id === item.id);

  return (
    <article className={styles.card} style={fullwidth ? { width: '100%' } : {}}>
      <div className={styles.card__container}>
        <Link
          to={`/${item.category}/${item.id}`}
          className={styles.card__link__photoLink}
        >
          <img
            src={item.images[0]}
            alt={`photo ${item.id}`}
            className={styles.card__link__photo}
          />
        </Link>
        <Link
          to={`/${item.category}/${item.id}`}
          className={styles.card__link__nameLink}
        >
          <div>{item.name}</div>
        </Link>
        <div className={styles.card__prices}>
          <div className={styles.card__price}>{`$${item.priceDiscount}`}</div>
          {discount && (
            <div
              className={styles.card__price__discount}
            >{`$${item.priceRegular}`}</div>
          )}
        </div>
        <div className={styles.card__separator}></div>
        <ul className={styles.card__list}>
          <li className={styles.card__list__item}>
            <p className={styles.card__list__name}>
              {translate('card.screen', lang)}
            </p>
            <p className={styles.card__list__value}>
              {item.screen.slice(0, 9)}
            </p>
          </li>
          <li className={styles.card__list__item}>
            <p className={styles.card__list__name}>
              {translate('card.capacity', lang)}
            </p>
            <p className={styles.card__list__value}>{item.capacity}</p>
          </li>
          <li className={styles.card__list__item}>
            <p className={styles.card__list__name}>RAM</p>
            <p className={styles.card__list__value}>{item.ram}</p>
          </li>
        </ul>
        <div className={styles.card__buttons}>
          <button
            className={classNames(styles.card__button__add, {
              [styles.inCart]: isItemInCart,
            })}
            onClick={() => {
              if (isItemInCart) {
                dispatch(
                  cartSlice.actions.removeGood({ ...item, quantity: 1 }),
                );
              } else {
                dispatch(cartSlice.actions.addGood({ ...item, quantity: 1 }));
              }
            }}
          >
            {isItemInCart
              ? translate('card.button.added', lang)
              : translate('card.button', lang)}
          </button>
          <button
            className={classNames(
              styles.card__button,
              stylesIcon.icon,
              darkTheme ? stylesIcon.icon__heart__dark : stylesIcon.icon__heart,
              stylesBtn.button,
              {
                [stylesIcon.isFavorite]: isItemInFavorites,
              },
            )}
            onClick={() => {
              if (isItemInFavorites) {
                dispatch(favoriteSlice.actions.removeGood(item));
              } else {
                dispatch(favoriteSlice.actions.addGood(item));
              }
            }}
          ></button>
        </div>
      </div>
    </article>
  );
};
