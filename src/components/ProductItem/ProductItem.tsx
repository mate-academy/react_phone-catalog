import styles from './ProdcutItem.module.scss';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/ProductTypes';
import { useCart } from '../BoughtCart/CartContext';
import liked from '../../assets/icons/heartRed.svg';
import heart from '../../assets/icons/heart.svg';
import heartLight from '../../assets/icons/heartLight.svg';
import { useFavourites } from '../Favourites/FavouritesContext';
import { useContext } from 'react';
import { ThemeContext } from '../Themes';

interface Props {
  product: Product;
  AdditionalPrice?: boolean;
  onClick?: () => void;
}

export const ProductItem: React.FC<Props> = ({
  product,
  AdditionalPrice: additionalPrice = false,
}) => {
  const { favourites, toggleFavourite } = useFavourites();
  const { cart, toggleCart } = useCart();
  const isFavourite = favourites.some(f => f.itemId === product.itemId);
  const isInCart = cart.some(item => item.id === product.id);
  const productPath = `/${product.category}/${product.itemId}`;
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const isBasicDark = theme === 'dark';

  const getLikeIcon = (isDark: boolean, isFav: boolean) => {
    if (isDark) {
      return isFav ? liked : heart;
    }

    return isFav ? liked : heartLight;
  };

  const handleToggleCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCart(product);
  };

  const handleToggleFavourite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavourite(product);
  };

  return (
    <div
      className={styles.product__elements}
      onClick={() => navigate(productPath)}
    >
      <div className={styles.product__container}>
        <img
          src={product.image}
          alt={`${product.category} image`}
          className={styles.product__image}
        />
      </div>

      <h3 className={styles.product__name}>{product.name}</h3>
      <div className={styles.product__discount}>
        <h3 className={styles.product__price}>{`$${product.price}`}</h3>
        {additionalPrice && (
          <h3
            className={styles.product__fullprice}
          >{`$${product.fullPrice}`}</h3>
        )}
      </div>

      <div className={styles.product__line}></div>

      <div className={styles.product__information}>
        <div className={styles.product__informationFull}>
          <h3 className={styles.product__screenTitle}>Screen</h3>
          <h3 className={styles.product__screenDescription}>
            {product.screen}
          </h3>
        </div>
        <div className={styles.product__informationFull}>
          <h3 className={styles.product__screenTitle}>Capacity</h3>
          <h3 className={styles.product__screenDescription}>
            {product.capacity}
          </h3>
        </div>
        <div className={styles.product__informationFull}>
          <h3 className={styles.product__screenTitle}>RAM</h3>
          <h3 className={styles.product__screenDescription}>{product.ram}</h3>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          className={styles.button__add}
          onClick={handleToggleCart}
          style={{
            backgroundColor: isInCart
              ? isBasicDark
                ? '#4A4D58'
                : '#75767F'
              : undefined,
          }}
        >
          {isInCart ? 'Remove' : 'Add to cart'}
        </button>
        <button className={styles.button__like} onClick={handleToggleFavourite}>
          <img src={getLikeIcon(isBasicDark, isFavourite)} alt="like" />
        </button>
      </div>
    </div>
  );
};
