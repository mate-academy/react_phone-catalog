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
  const { favorites } = state;

  // console.log(bascket)
  const isFavorite = !!favorites.find(item => item === product.itemId);

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
    dispatch({
      type: 'addToBascket',
      payload: product,
    });
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
        <h3 className={styles.price}>{`$${secondPrice}`}</h3>
        <h3 className={styles.secondPrice}>{`$${price}`}</h3>
      </div>
      <div className={styles.border}></div>
      <section className={styles.info}>
        <h3 className={styles.screen}>
          <h4 className={styles.titleScreen}>{`Screen`}</h4>
          <h4 className={styles.screenScreen}>{screen}</h4>
        </h3>
        <h3 className={styles.capacity}>
          <h4 className={styles.titleCapacity}>{`Capacity`}</h4>
          <h4 className={styles.capacityCapacity}>{capacity}</h4>
        </h3>
        <h3 className={styles.ram}>
          <h4 className={styles.titleRam}>{`RAM`}</h4>
          <h4 className={styles.ramRam}>{ram}</h4>
        </h3>
      </section>

      <div className={styles.buttonConteiner}>
        <button className={styles.add} onClick={addToBascket}>
          Add to cart
        </button>
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
