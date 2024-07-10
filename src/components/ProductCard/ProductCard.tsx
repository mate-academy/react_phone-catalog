import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { useContext } from 'react';
import { DispatchContext, StateContext } from '../../Store';

type Props = {
  img: string;
  name: string;
  price: number;
  screen: string;
  capacity: string;
  ram: string;
  secondPrice: number;
  product: Product;
};

export const ProductCard = ({
  img,
  name,
  price,
  screen,
  capacity,
  ram,
  secondPrice,
  product,
}: Props) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { favorites, bascket } = state;

  const isFavorite = !!favorites.find(item => item === product.itemId);
  const added = bascket.find(item => item.itemId === product.itemId);

  const addToFavorites = () => {
    if (!isFavorite) {
      dispatch({
        type: 'addToFavorites',
        payload: product,
      });
    }

    if (isFavorite) {
      dispatch({
        type: 'removeFromFavorites',
        payload: { itemId: product.itemId },
      });
    }
  };

  const addToBascket = () => {
    if (!added) {
      dispatch({
        type: 'addToBascket',
        payload: product,
      });
    }

    if (added) {
      dispatch({
        type: 'removeFromBascket',
        payload: { itemId: product.itemId },
      });
    }
  };

  return (
    <div className={styles.container}>
      <Link to={`/${product.category}/${product.itemId}`}>
        <img src={`${img}`} alt="img" className={styles.img} />
      </Link>
      <Link to={`/${product.category}/${product.itemId}`}>
        <h3 className={styles.name}>{name}</h3>
      </Link>
      <div className={styles.allPrice}>
        <p className={styles.price}>{`$${secondPrice}`}</p>
        <p className={styles.secondPrice}>{`$${price}`}</p>
      </div>
      <div className={styles.border}></div>
      <section className={styles.info}>
        <h3 className={styles.screen}>
          <p className={styles.titleScreen}>{`Screen`}</p>
          <p className={styles.screenScreen}>{screen}</p>
        </h3>
        <h3 className={styles.capacity}>
          <p className={styles.titleCapacity}>{`Capacity`}</p>
          <p className={styles.capacityCapacity}>{capacity}</p>
        </h3>
        <h3 className={styles.ram}>
          <p className={styles.titleRam}>{`RAM`}</p>
          <p className={styles.ramRam}>{ram}</p>
        </h3>
      </section>

      <div className={styles.buttonConteiner}>
        {product.itemId === added?.itemId ? (
          <button className={styles.added} onClick={addToBascket}>
            Added
          </button>
        ) : (
          <button className={styles.add} onClick={addToBascket}>
            Add to cart
          </button>
        )}
        <button className={styles.heart} onClick={addToFavorites}>
          {favorites.includes(product.itemId) ? (
            <img src="img/redHeart.svg" alt="heart" />
          ) : (
            <img src="img/homePage/heart.svg" alt="heart" />
          )}
        </button>
      </div>
    </div>
  );
};
