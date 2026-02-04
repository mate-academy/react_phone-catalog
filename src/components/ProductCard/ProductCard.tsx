import styles from './ProductCard.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from "../../modules/shared/types/Product";


interface ProductCardProps {
  product: Product;
  width?: string;
  hideFullPrice?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, width = "212px", hideFullPrice }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  function handleAddClick() {
    setIsSelected(!isSelected);
  }

  function handleLikeClick() {
    setIsLiked(!isLiked);
  }

  return (
  <div className={styles.productCard} style={{ width }} >
    <div className={styles["productCard__content"]}>
      <div className={styles["productCard__imgblock"]}>
       <Link to={`/product/${product.productId}`}>
          <img
          src={product.image}
          alt={product.name}
          className={styles["productCard__image"]}
        />
       </Link>
      </div>
      <Link to={`/product/${product.productId}`} className={styles["productCard__nameLink"]}>
        <div className={styles["productCard__nameblock"]}>
        <h3 className={styles["productCard__name"]}>
          {product.name}
        </h3>
      </div>
      </Link>
      <div className={styles["productCard__priceblock"]}>
        <h2 className={styles["productCard__price"]}>
          ${product.price}
        </h2>
        {!hideFullPrice && (
          <h2 className={`${styles["productCard__price"]} ${styles["productCard__price--fullprice"]}`}>
          ${product.fullPrice}
        </h2>
        )}
      </div>
      <div className={styles["productCard__line"]}></div>
      <div className={styles["productCard__info"]}>
        <div className={styles["productCard__info__name"]}>
          <ul className={classNames(
            styles["productCard__info__list"],
            styles["productCard__info__list--name"]
          )}>
            <li>Screen</li>
            <li>Capacity</li>
            <li>RAM</li>
          </ul>
        </div>
        <div className={styles["productCard__info__value"]}>
          <ul className={classNames(
            styles["productCard__info__list"],
            styles["productCard__info__list--value"]
          )}>
            <li>{product.screen.slice(0, 4)}</li>
            <li>{product.capacity}</li>
            <li>{product.ram}</li>
          </ul>
        </div>
      </div>
      <div className={styles["productCard__buttons"]}>
        <button
          onClick={handleAddClick}
          className={classNames(
            styles["productCard__buttons--add"],
            isSelected && styles["productCard__buttons--add--selected"]
            )}
        >
          {isSelected ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          onClick={handleLikeClick}
          className={classNames(
            styles["productCard__buttons--like"],
            isLiked && styles["productCard__buttons--like--selected"]
            )}
        >
            <img src={isLiked ? "/img/red-heart.png" : "/img/heart.png"} alt="like" className={styles["productCard__buttons__logo"]}/>
        </button>
      </div>
    </div>
  </div>
  );
}
