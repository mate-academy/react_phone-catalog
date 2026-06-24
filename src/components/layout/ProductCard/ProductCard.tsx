import { Link } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart';
import { useFavourites } from '../../../hooks/useFavourites';
import { addProductToCart } from '../../../store/cart/CartReducer';
import { toggleFavourites } from '../../../store/favourites/FavouritesReducer';
import { Product } from '../../../types/types';
import { imageUrl } from '../../../utils/imageUrl';
import { Button } from '../../ui/Button';
import { ButtonLiked } from '../../ui/ButtonLiked';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const { favourites, setFavourites } = useFavourites();
  const { cart, setCart } = useCart();
  const path = `/catalog/${product.category}/${product.itemId}`;

  return (
    <Link to={path} className={styles.product}>
      <img src={imageUrl(product.image)} alt="" className={styles.img} />
      <h3 className={styles.title}>{product.name}</h3>
      <div className={styles.group}>
        <p className={styles.price}>${product.price}</p>
        <p className={styles.price__discount}>{product.fullPrice}</p>
      </div>
      <div className={styles.info}>
        <p className={styles.info__text}>
          Screen
          <span className={styles.info__text_params}>{product.screen}</span>
        </p>
        <p className={styles.info__text}>
          Capacity
          <span className={styles.info__text_params}>{product.capacity}</span>
        </p>
        <p className={styles.info__text}>
          Ram
          <span className={styles.info__text_params}>{product.ram}</span>
        </p>
      </div>
      <div className={styles.footer}>
        <Button
          isActive={cart.some(item => item.product.id === product.id)}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            setCart(addProductToCart(product));
          }}
          maxWidth="160px"
        >
          {cart.some(item => item.product.id === product.id)
            ? 'Delete from cart'
            : 'Add to cart'}
        </Button>
        <ButtonLiked
          isActive={favourites.some(item => item.id === product.id)}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            setFavourites(toggleFavourites(product));
          }}
        />
      </div>
    </Link>
  );
};
