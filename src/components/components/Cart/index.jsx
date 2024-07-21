import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToBay } from '../../../redux/slices/baySlice';
import { setDetailProduct } from '../../../redux/slices/detailProductSlice';
import { toggleFavorite } from '../../../redux/slices/favoritesSlice';
import styles from './cart.module.scss';

export const Cart = ({ products }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);

  const handleClick = () => {
    dispatch(
      setDetailProduct({ id: products.itemId, category: products.category }),
      window.scrollTo(0, 0),
    );
  };
  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(products.id));
  };
  const handleToggleBay = () => {
    dispatch(addToBay(products.id));
  };

  const isFavorite = favorites.includes(products.id);

  return (
    <div key={products.id} className={styles.root}>
      <Link to={`/product/${products.itemId}`} onClick={handleClick}>
        <div className={styles.productsCard}>
          <i>
            <img src={products.image} alt={products.image} />
          </i>
          <h3>{products.name}</h3>
          <p className={styles.price}>${products.price}</p>
          <ul className={styles.details}>
            <li>
              <strong>Screen:</strong> <p>{products.screen}</p>
            </li>
            <li>
              <strong>Capacity:</strong> <p>{products.capacity}</p>
            </li>
            <li>
              <strong>RAM:</strong> <p>{products.ram}</p>
            </li>
          </ul>
        </div>
      </Link>
      <div className={styles.actions}>
        <button
          onClick={e => {
            e.preventDefault();
            handleToggleBay();
          }}
          className={styles.addToCart}
        >
          Add to cart
        </button>
        <div className={styles.icons}>
          <i>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                handleToggleFavorite();
              }}
            >
              {isFavorite ? (
                <IoMdHeart color="#EB5757" size={18} />
              ) : (
                <IoMdHeartEmpty size={17} />
              )}
            </a>
          </i>
        </div>
      </div>
    </div>
  );
};
