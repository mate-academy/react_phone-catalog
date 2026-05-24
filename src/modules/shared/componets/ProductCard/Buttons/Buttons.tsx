import styles from './Buttons.module.scss';
import { useFavorites } from '../../../Utills/FavoritesContext';
import { useProductInCart } from '../../../Utills/ShopingCartContext';
import { useProducts } from '../../../Utills/ProductContext';

type Props = {
  productId: string;
};

export const Buttons: React.FC<Props> = ({ productId }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const { state: productsInCart, dispatch } = useProductInCart();

  const { products } = useProducts();

  const handleClickHeart = (id: string) => {
    toggleFavorite(id);
  };

  const hasInFavorites = favorites.includes(productId);

  const handleClick = (id: string) => {
    const selectedProduct = products.products?.find(
      product => product.itemId === id,
    );

    if (selectedProduct) {
      dispatch({ type: 'TOGGLE_PRODUCT', payload: selectedProduct });
    }
  };

  const hasInShopingCart = productsInCart.some(elem => elem.id === productId);

  return (
    <div className={styles.buttons}>
      <button
        className={hasInShopingCart ? styles.button__added : styles.button}
        onClick={() => handleClick(productId)}
        disabled={hasInShopingCart}
      >
        {hasInShopingCart ? 'Added to cart' : 'Add to cart'}
      </button>

      <div
        className={styles.button__heart}
        onClick={() => handleClickHeart(productId)}
      >
        <div
          className={hasInFavorites ? styles.heart__active : styles.heart}
        ></div>
      </div>
    </div>
  );
};
