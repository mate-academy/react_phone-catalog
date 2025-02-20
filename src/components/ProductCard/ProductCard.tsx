import { useState } from 'react';
import styles from './ProductCard.module.scss';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';

export const ProductCard = () => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isLiked, setisLiked] = useState(false);
  const { category } = useParams();
  // const { handleActiveProduct } = useContext(AppContext)!;

  const productId = 'apple-iphone-14-pro-128gb-spaceblack';

  return (
    <Link
      to={category ? productId : `product/${productId}`}
      className={styles.card}
      // onClick={() => handleActiveProduct(productId)}
    >
      <div className={styles.card__image}></div>

      <div className={styles.card__titleContainer}>
        <div className={styles.card__title}>
          Apple iPhone 14 Pro 128GB Space Black (MQ023)
        </div>
      </div>

      <div className={styles.card__price}>$999</div>

      <div className={styles.card__splitter}></div>

      <article className={styles.card__specs}>
        <div className={styles.card__specContainer}>
          <p>Screen</p>

          <p>6.1” OLED</p>
        </div>

        <div className={styles.card__specContainer}>
          <p>Capacity</p>

          <p>128 GB</p>
        </div>

        <div className={styles.card__specContainer}>
          <p>RAM</p>

          <p>6 GB</p>
        </div>
      </article>

      <div className={styles.card__buttons}>
        <button
          className={classNames(styles.card__addToCart, {
            [styles.card__addedToCart]: isAddedToCart,
          })}
          onClick={() => setIsAddedToCart(!isAddedToCart)}
        >
          {isAddedToCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          className={classNames(styles.card__addToFavourite, {
            [styles.card__addedToFavourite]: isLiked,
          })}
          onClick={() => setisLiked(!isLiked)}
        ></button>
      </div>
    </Link>
  );
};
