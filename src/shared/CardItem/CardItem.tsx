import React from "react";
import { IProductCard } from "../../interfaces/ProductCard.interface";
import styles from './CardItem.module.scss';
import ButtonAddToCart from "../Buttons/ButtonAddToCart";
import ButtonAddToFavorites from "../Buttons/ButtonAddToFavorites";
import { Link } from "react-router-dom";

interface CardItemProps {
  product: IProductCard,
}

const CardItem: React.FC<CardItemProps> = ({ product }) => {
  const LinkTo = `/${product.category}/${product.itemId}`;

  return (
    <div className={styles.container}>
      <Link to={LinkTo}>
        <div className={styles.imgDiv}>
          <img src={`/${product.image}`}/>
        </div>
      </Link>

      <Link to={LinkTo}>
        <div className={styles.name}>
          <h3>
            {product.name.toUpperCase()}
          </h3>
        </div>
      </Link>

      <div className={styles.price}>
        <p>{`$${product.price}`}</p>
        <p className={styles.price__fullPrice}>{`$${product.fullPrice}`}</p>
      </div>

      <div className={styles.line}></div>

      <div className={styles.description}>
        <div>
          <h3>Screen</h3>
          <h4>{product.screen}</h4>
        </div>
        <div>
          <h3>Capacity</h3>
          <h4>{product.capacity}</h4>
        </div>
        <div>
          <h3>RAM</h3>
          <h4>{product.ram}</h4>
        </div>
      </div>

      <div className={styles.buttons}>
        <ButtonAddToCart product={product} />
        <ButtonAddToFavorites product={product} />
      </div>
    </div>
  );
};

export default CardItem;
