// src/components/Cart/Cart.js

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setDetailProduct } from '../../../redux/slices/detailProductSlice';
import { ProductActions } from '../ProductActions';
import styles from './cart.module.scss';

export const Cart = ({ products }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      setDetailProduct({ id: products.itemId, category: products.category }),
      window.scrollTo(0, 0),
    );
  };

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
      <ProductActions productId={products.id} />
    </div>
  );
};
