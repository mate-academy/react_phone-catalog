// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useTheme } from '../../contexts/ThemeContext';
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
  const { theme } = useTheme();
  const { t } = useTranslation();

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
        className={`${styles.productControls__add} ${theme === 'light' && styles['productControls__add--lightTheme']} ${isWideCard && styles['productControls__add--wide']} ${isYouMayLike && styles['productControls__add--youMayLike']} ${isDetails && styles['productControls__add--details']} ${
          cartItemsIds.includes(product.id) ? styles['productControls__add--selected'] : ''
        } ${
          cartItemsIds.includes(product.id) && theme === 'light'
            ? styles['productControls__add--selected-lightTheme']
            : ''
        }`}
        onClick={() => addToCart(product)}
      >
        {cartItemsIds.includes(product.id)
          ? t('buttonText.addedToCart')
          : t('buttonText.addToCart')}
      </button>

      <button
        className={`${styles.productControls__favorites} ${theme === 'light' && styles['productControls__favorites--lightTheme']} ${isDetails && styles['productControls__favorites--details']} ${
          favoritesIds.includes(product.id) ? styles['productControls__favorites--selected'] : ''
        }  ${
          favoritesIds.includes(product.id) && theme === 'light'
            ? styles['productControls__favorites--selected-lightTheme']
            : ''
        }`}
        onClick={() => toggleFavorites(product)}
      />
    </div>
  );
};
