// import { useNavigate } from 'react-router-dom';
import { HeartIcon } from '../../shared/components/Icons/HeartIcon';
import { PrimaryButton } from '../../shared/components/PrimaryButton';
import { Product } from '../../shared/types/Product';
import styles from './ProductCard.module.scss';
import { useContext } from 'react';
import { DispatchContext, StateContext } from '../../Provider/GadgetsContext';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { favourites, cart } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  // const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate(`/${product.category}/${product.itemId}`);
  // };

  const handleAddToFavourites = () => {
    dispatch({ type: 'toggleFavourite', payload: product });
  };

  const handleAddToCart = () => {
    dispatch({ type: 'toggleCart', payload: product });
  };

  const isFavourite = favourites.includes(product);
  const isInCart = cart.includes(product);

  return (
    <div className={styles.card}>
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
