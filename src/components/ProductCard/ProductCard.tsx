import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';

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
  return (
    <div className={styles.container}>
      <Link to={`/${product.category}/${product.itemId}`}>
        <img src={`${img}`} alt="img" className={styles.img} />
      </Link>
      <Link to={`/${product.category}/${product.itemId}`}>
        <h3 className={styles.name}>{name}</h3>
      </Link>
      <div className={styles.allPrice}>
        <h3 className={styles.price}>{`$${price}`}</h3>
        <h3 className={styles.secondPrice}>{`$${secondPrice}`}</h3>
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
        {/* <Link to="/card"> */}
        <button className={styles.add}>Add to cart</button>
        {/* </Link> */}
        {/* <Link to="favorites"> */}
        <button className={styles.heart}>
          <img src="img/homePage/heart.svg" alt="heart" />
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};
