import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { Item } from '../../types/Item';
import styles from './ProductControls.module.scss';

type Props = {
  product: Item;
  isDetails: boolean;
  isYouMayLike: boolean;
  isWideCard: boolean;
};

export const ProductControls: React.FC<Props> = ({
  product,
  isDetails,
  isYouMayLike,
  isWideCard,
}) => {
  const { setFavorites, favoritesIds, setFavoritesIds } = useFavorites();
  const { setCartItems, cartItemsIds, setCartItemsIds } = useCart();

  const toggleFavorites = (item: Item) => {
    if (favoritesIds.includes(item.id)) {
      setFavorites(prev => prev.filter(prevItem => prevItem.id !== item.id));
      setFavoritesIds(prev => prev.filter(prevId => prevId !== item.id));
    } else {
      setFavorites(prev => [...prev, item]);
      setFavoritesIds(prev => [...prev, item.id]);
    }
  };

  const addToCart = (item: Item) => {
    const newCartItem = { ...item, quantity: 1 };

    if (!cartItemsIds.includes(item.id)) {
      setCartItems(prev => [...prev, newCartItem]);
      setCartItemsIds(prev => [...prev, item.id]);
    } else {
      return;
    }
  };

  return (
    <div className={`${styles.productControls} ${isDetails && styles['productControls--details']}`}>
      <button
        className={`${styles.productControls__add}  ${isWideCard && styles['productControls__add--wide']} ${isYouMayLike && styles['productControls__add--youMayLike']} ${isDetails && styles['productControls__add--details']} ${
          cartItemsIds.includes(product.id) ? styles['productControls__add--selected'] : ''
        }`}
        onClick={() => addToCart(product)}
      >
        {cartItemsIds.includes(product.id) ? 'Added to cart' : ' Add to cart'}
      </button>

      <button
        className={`${styles.productControls__favorites} ${isDetails && styles['productControls__favorites--details']} ${
          favoritesIds.includes(product.id) ? styles['productControls__favorites--selected'] : ''
        }`}
        onClick={() => toggleFavorites(product)}
      />
    </div>
  );
};
