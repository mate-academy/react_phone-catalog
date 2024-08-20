import styles from './ProductCard.module.scss';
import { Products } from '../../../../types/Product';
import { Link, useSearchParams } from 'react-router-dom';
import * as actionProduct from '../../../../features/DetailsSlice';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
type Props = {
  phone: Products;
  isDiscount: boolean;
};

export const ProductCard: React.FC<Props> = ({ phone, isDiscount }) => {
  const [searchParams] = useSearchParams();
  const dispath = useAppDispatch();
  const {
    capacity,
    category,
    ram,
    screen,
    image,
    itemId,
    price,
    name,
    fullPrice,
  } = phone;

  const { favorite, cartItem } = useAppSelector(state => state.selectedProduct);

  const addProductCart = () => {
    dispath(actionProduct.addCart(phone));
  };

  const addProductFavorite = () => {
    dispath(actionProduct.addFavorite(phone));
  };

  const isFavorite = favorite.find(item => item.itemId === itemId);
  const isCart = cartItem.find(item => item.id === itemId);

  return (
    <div className={styles.phone__container} id="phoneWidth">
      <div className={styles.phone__wraper}>
        <Link
          to={{
            pathname: `/${category}/${itemId}`,
            search: searchParams.toString(),
          }}
        >
          <img className={styles.phone__img} src={image} alt="Img" />
        </Link>
        <p className={styles.phone__title}>{name}</p>
        <div className={`${styles.phone__price} ${styles.container}`}>
          <h2 className={styles.phone__price}>{`$${price}`}</h2>
          {isDiscount && (
            <h2 className={styles.phone__discount}>{`$${fullPrice}`}</h2>
          )}
        </div>
        <span className={styles.phone__line}></span>
        <div className={`${styles.phone__descriptin} ${styles.phone__display}`}>
          <div className={styles.phone__descriptin}>
            <p className={styles.phone__part}>Screen</p>

            <p className={`${styles.phone__part} ${styles.phone__value}`}>
              {screen}
            </p>
          </div>
          <div className={styles.phone__descriptin}>
            <p className={styles.phone__part}>Capacity</p>

            <p className={`${styles.phone__part} ${styles.phone__value}`}>
              {capacity}
            </p>
          </div>

          <div className={styles.phone__descriptin}>
            <p className={styles.phone__part}>RAM</p>

            <p className={`${styles.phone__part} ${styles.phone__value}`}>
              {ram}
            </p>
          </div>
        </div>
        <div className={styles.phone__send}>
          {isCart ? (
            <button
              className={`${styles.phone__button} ${styles.is__add}`}
              onClick={addProductCart}
            >
              Added
            </button>
          ) : (
            <button className={styles.phone__button} onClick={addProductCart}>
              Add to cart
            </button>
          )}
          <div onClick={addProductFavorite} className={styles.phone__like}>
            {isFavorite ? (
              <button
                className={`${styles.phone__favorit} ${styles.phone__favorit__choose}`}
              />
            ) : (
              <button className={`${styles.phone__favorit}`} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
