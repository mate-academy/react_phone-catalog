import React from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useFavourites } from '../Favourites/FavouritesContext';
import { useCartProducts } from '../Cart/CartContext';
import { useTheme } from '../ThemeContext/ThemeContext';

type Props = {
  product: Product;
  onPage?: boolean;
};

const ProductCard: React.FC<Props> = ({ product, onPage }) => {
  const { favourites, toggleFavourite } = useFavourites();
  const { cartProducts, addProductToCart } = useCartProducts();
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  const isFavourite = favourites.some(fav => fav.id === product.id);
  const isInCart = cartProducts.some(item => item.id === product.id);

  const handletoggleFavourite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavourite(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addProductToCart(product);
  };

  return (
    <>
      <div
        className={classNames(`${styles.product_card_container}`, {
          [styles.product_card_container_on_page]: onPage,
        })}
      >
        <div
          className={classNames(`${styles.img_and_title_wrapper}`, {
            [styles.img_and_title_wrapper_on_page]: onPage,
          })}
        >
          <Link
            to={`/${product.category}/${product.id}`}
            className={`${styles.title_link} ${styles.img_wrapper}`}
            onClick={() => window.scrollTo({ top: 0 })}
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className={`${styles.image}`}
            />
          </Link>
          <Link
            to={`/${product.category}/${product.id}`}
            className={`${styles.title_link} ${styles.title_wrapper}`}
            onClick={() => window.scrollTo({ top: 0 })}
          >
            <h3 className={`${styles.title}`}>{product.name}</h3>
          </Link>
        </div>
        <div className={`${styles.price_wrapper}`}>
          <h2 className={`${styles.price}`}>{`$${product.priceDiscount}`}</h2>
          <h2 className={`${styles.oldPrice}`}>{`$${product.priceRegular}`}</h2>
        </div>

        <div className={`${styles.line}`} />

        <div
          className={classNames(`${styles.phone_charact_container}`, {
            [styles.phone_charact_container_on_page]: onPage,
          })}
        >
          <div
            className={classNames(`${styles.phone_charact}`, {
              [styles.phone_charact_on_page]: onPage,
            })}
          >
            <p className={`${styles.phone_charact_parag}`}>Screen</p>
            <p className={`${styles.phone_charact_parag} ${styles.char_value}`}>
              {product.screen}
            </p>
          </div>
          <div
            className={classNames(`${styles.phone_charact}`, {
              [styles.phone_charact_on_page]: onPage,
            })}
          >
            <p className={`${styles.phone_charact_parag}`}>Capacity</p>
            <p className={`${styles.phone_charact_parag} ${styles.char_value}`}>
              {product.capacity}
            </p>
          </div>
          <div
            className={classNames(`${styles.phone_charact}`, {
              [styles.phone_charact_on_page]: onPage,
            })}
          >
            <p className={`${styles.phone_charact_parag}`}>RAM</p>
            <p className={`${styles.phone_charact_parag} ${styles.char_value}`}>
              {product.ram}
            </p>
          </div>
        </div>

        <div
          className={classNames(`${styles.buttons_container}`, {
            [styles.buttons_container_on_page]: onPage,
          })}
        >
          <button
            className={classNames(`${styles.button} ${styles.button_add}`, {
              [styles.button_add_on_page]: onPage,
              [styles.button_in_cart]: isInCart,
            })}
            onClick={handleAddToCart}
          >
            {isInCart ? 'Selected' : 'Add to cart'}
          </button>
          <button
            className={`${styles.button} ${styles.button_like}`}
            onClick={handletoggleFavourite}
          >
            <img
              src={
                isFavourite
                  ? './img/icons/card-selected-like.svg'
                  : isLightTheme
                    ? './img/icons/card-default-like.svg'
                    : './img/icons/like-dark-theme.svg'
              }
              alt="like button"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
