import { Link } from 'react-router-dom';
import style from './Card.module.scss';
import { Product } from '../../../types/ContextType/Product';
import classNames from 'classnames';
import { LanguageContext } from '../../../store/LanguageProvider';
import { RefObject, useContext } from 'react';
import { ShoppingCartContext } from '../../../store/ShoppingCartProvider';
import { availableFav } from '../../../utils/availableFav';
import { StateContext } from '../../../store/StateProvider';
import { IconFavorites } from '../../Icons/IconFavorites';
import Heart from '../../../image/Favorites/heart.svg';
import { ThemeContext } from '../../../store/ThemeProvider';

type Props = {
  product: Product;
  discount?: boolean;
  widthRef?: RefObject<HTMLLIElement>;
};

export const Card: React.FC<Props> = ({
  product,
  discount = false,
  widthRef,
}) => {
  const { t } = useContext(LanguageContext);
  const { setCartItems, cartItems } = useContext(ShoppingCartContext);
  const { favorites, setFavorites } = useContext(StateContext);

  const handleAddToCart = (good: Product) => {
    setCartItems(cartItems => {
      let newItems = [...cartItems];

      if (newItems.find(item => item.id === good.id)) {
        return newItems.filter(item => item.id !== good.id);
      } else {
        return [
          ...newItems,
          {
            id: good.id,
            quantity: 1,
            name: good.name,
            image: good.image,
            price: good.fullPrice,
            category: good.category,
            itemId: good.itemId,
          },
        ];
      }
    });
  };

  const handleCheckCarts = (currentProduct: Product) => {
    const findCart = cartItems.find(item => item.id === currentProduct.id);

    return !!findCart;
  };

  const { theme } = useContext(ThemeContext);
  console.log(theme);
  return (
    <li
      className={classNames(style.card__container, {
        [style.card__darkTheme]: theme,
      })}
      key={product.id}
      ref={widthRef}
    >
      <Link
        to={`../${product.category}/${product.itemId}`}
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
          to={`../${product.category}/${product.itemId}`}
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

        <div className={style.card__cardDescription}>
          <p className={style.card__key}>{t('screen')}</p>
          <p className={style.card__value}>{product.screen}</p>
        </div>
        <div className={style.card__cardDescription}>
          <p className={style.card__key}>{t('capacity')}</p>
          <p className={style.card__value}>{product.capacity}</p>
        </div>
        <div className={style.card__cardDescription}>
          <p className={style.card__key}>{t('ram')}</p>
          <p className={style.card__value}>{product.ram}</p>
        </div>
      </div>

      <div className={style.card__cardActions}>
        <button
          className={classNames(style.card__addToCart, {
            [style.card__addedToCart]: handleCheckCarts(product),
          })}
          onClick={() => handleAddToCart(product)}
        >
          {handleCheckCarts(product) ? t('addedToCart') : t('addToCart')}
        </button>
        <button
          className={classNames(style.card__сardFavBtn, {
            [style.card__selectedFavorite]: availableFav(product, favorites),
          })}
          onClick={() =>
            setFavorites(prevProducts => {
              const newFavorites = [...prevProducts];
              const availableFavorites = newFavorites.some(
                item => item.itemId === product.itemId,
              );

              if (availableFavorites) {
                return newFavorites.filter(
                  item => item.itemId !== product.itemId,
                );
              } else {
                return [...newFavorites, product];
              }
            })
          }
        >
          {availableFav(product, favorites) ? (
            <img src={Heart} alt="LikeLogo" />
          ) : (
            <IconFavorites />
          )}
        </button>
      </div>
    </li>
  );
};
