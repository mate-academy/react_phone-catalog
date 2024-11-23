import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Product } from '../../types/Product';
import style from './ProductCard.module.scss';
import { addToCart, removeToCart } from '../../redux/features/cartSlice';
import {
  addToFavorites,
  removeToFavorites,
} from '../../redux/features/favoritesSlice';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    id,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
    category,
    itemId,
  } = product;

  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(state => state.cart);
  const { favorites } = useAppSelector(state => state.favorites);

  const handleAddProduct = (prod: Product) => {
    dispatch(addToCart(prod));
  };

  const handleRemoveProduct = (prodId: string) => {
    dispatch(removeToCart(prodId));
  };

  const inCart = cart.find(item => item.id === id);

  const handleAddFavorite = (prod: Product) => {
    dispatch(addToFavorites(prod));
  };

  const handleRemoveFavorite = (prodId: string) => {
    dispatch(removeToFavorites(prodId));
  };

  const inFavorites = favorites.find(item => item.id === id);

  return (
    <article className={style.card}>
      <Link to={`/${category}/${itemId}`}>
        <img className={style.img} src={`./${image}`} alt="Device" />
      </Link>

      <Link to={`/${category}/${itemId}`} className={style.title}>
        {name}
      </Link>

      <div className={style.prices}>
        <span className={style.price}>${price}</span>
        <span className={`${style.price} ${style.oldPrice}`}>${fullPrice}</span>
      </div>

      <div className={style.params}>
        <div className={style.param}>
          <span className={style.property}>Screen</span>
          <span className={style.value}>{screen}</span>
        </div>

        <div className={style.param}>
          <span className={style.property}>Capacity</span>
          <span className={style.value}>{capacity}</span>
        </div>

        <div className={style.param}>
          <span className={style.property}>RAM</span>
          <span className={style.value}>{ram}</span>
        </div>
      </div>

      <div className={style.btns}>
        {!inCart ? (
          <button
            className={style.btnBuy}
            onClick={() => handleAddProduct(product)}
          >
            Add to cart
          </button>
        ) : (
          <button
            className={`${style.btnBuy} ${style.success}`}
            onClick={() => handleRemoveProduct(itemId)}
          >
            Added to cart
          </button>
        )}

        {!inFavorites ? (
          <button
            className={style.favorite}
            onClick={() => handleAddFavorite(product)}
          >
            <img src="./icons/favorites.svg" alt="Favorite" />
          </button>
        ) : (
          <button
            className={style.favorite}
            onClick={() => handleRemoveFavorite(itemId)}
          >
            <img src="./img/icons/like.svg" alt="Like" />
          </button>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
