import { useNavigate } from 'react-router-dom';
import { HeartIcon } from '../../shared/components/Icons/HeartIcon';
import { PrimaryButton } from '../../shared/components/PrimaryButton';
import { Product } from '../../shared/types/Product';
import styles from './ProductCard.module.scss';
import { useContext } from 'react';
import { DispatchContext, StateContext } from '../../Provider/GadgetsContext';

function navigateToProduct(
  productId: string,
  category: string,
  navigate: (path: string) => void,
) {
  navigate(`/${category}/${productId}`);
}

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { favourites, cart } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.closest(`.${styles.card__buttons}`)) {
      event.stopPropagation();

      return;
    }

    navigateToProduct(product.itemId, product.category, navigate);
  };

  const handleAddToFavourites = () => {
    dispatch({ type: 'toggleFavourite', payload: product.itemId });
  };

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { id: product.itemId, quantity: 1 },
    });
  };

  const isFavourite = favourites.some(id => id === product.itemId);
  const isInCart = cart.some(item => item.id === product.itemId);

  return (
    <div className={styles.card} onClick={handleClick}>
      <img src={product.image} alt="" className={styles.card__img} />
      <p className={styles.card__title}>{product.name}</p>
      <div className={styles.card__price}>
        <h3>{`$${product.price}`}</h3>
        <h3 className={styles.card__crossed}>{`$${product.fullPrice}`}</h3>
      </div>
      <hr className={styles.card__line} />
      <ul className={styles.card__info}>
        <li>
          <p>Screen</p>
          <p>
            <span>{product.screen}</span>
          </p>
        </li>
        <li>
          <p>Capacity</p>
          <p>
            <span>{product.capacity.replace('GB', ' GB')}</span>
          </p>
        </li>
        <li>
          <p>RAM</p>
          <p>
            <span>{product.ram.replace('GB', ' GB')}</span>
          </p>
        </li>
      </ul>
      <div className={styles.card__buttons}>
        <PrimaryButton
          mainText="Add to cart"
          selectedText="Added to cart"
          onClick={handleAddToCart}
          isSelected={isInCart}
        />
        <HeartIcon onClick={handleAddToFavourites} isSelected={isFavourite} />
      </div>
    </div>
  );
};
