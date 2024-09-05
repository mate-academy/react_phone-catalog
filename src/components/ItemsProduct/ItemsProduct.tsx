import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addFavourite,
  removeFavourite,
} from '../../features/addFavouritesSlice';
import { Product } from '../../types/products';
import styles from './ItemsProduct.module.scss';
import { addBucket, removeBucket } from '../../features/addBucketInfoSlice';

type Props = {
  product: Product;
  discount: boolean;
};

export const ItemsProduct: React.FC<Props> = ({ product, discount }) => {
  const favourites = useAppSelector(state => state.addedFavourites.items);
  const bucketProducts = useAppSelector(state => state.addedBucket.items);
  const dispatch = useAppDispatch();
  const isClickedOnFavourite = favourites.some(fav => fav.id === product.id);
  const isClickedOnBucket = bucketProducts.some(
    bucket => bucket.id === product.id,
  );

  const handleAddDeleteFavourites = () => {
    if (isClickedOnFavourite) {
      dispatch(removeFavourite(product));
    } else {
      dispatch(addFavourite(product));
    }
  };

  const handleAddDeleteBucket = () => {
    if (isClickedOnBucket) {
      dispatch(removeBucket(product.id));
    } else {
      dispatch(addBucket({ ...product, quantity: 1 }));
    }
  };

  return (
    <div className={styles.product}>
      <Link
        to={{
          pathname: `/${product.category}/${product.itemId}`,
        }} // string
        className={styles.product_image}
      >
        <img
          className={styles.product_image_img}
          src={product.images ? `/${product.images[0]}` : `/${product.image}`}
          alt="image/product"
        />
      </Link>
      <h3 className={styles.product_title}>{product.name}</h3>

      <div className={styles.product_price}>
        {discount ? (
          <>
            <h3 className={styles.product_price_disc}>
              ${product.price || product.priceDiscount}
            </h3>
            <h3 className={styles.product_price_noDisc}>
              ${product.fullPrice || product.priceRegular}
            </h3>
          </>
        ) : (
          <h3 className={styles.product_price_disc}>
            ${product.fullPrice || product.priceRegular}
          </h3>
        )}
      </div>

      <div className={styles.product_line}></div>

      <div className={styles.product_characteristic}>
        <div className={styles.product_characteristic_cond}>
          <p className={styles.product_characteristic_cond_name}>Screen</p>
          <p className={styles.product_characteristic_cond_char}>
            {product.screen}
          </p>
        </div>

        <div className={styles.product_characteristic_cond}>
          <p className={styles.product_characteristic_cond_name}>Capacity</p>
          <p className={styles.product_characteristic_cond_char}>
            {product.capacity}
          </p>
        </div>

        <div className={styles.product_characteristic_cond}>
          <p className={styles.product_characteristic_cond_name}>RAM</p>
          <p className={styles.product_characteristic_cond_char}>
            {product.ram}
          </p>
        </div>
      </div>

      <div className={styles.product_buttons}>
        <div
          onClick={handleAddDeleteBucket}
          className={styles.product_buttons_add}
          style={{ backgroundColor: isClickedOnBucket ? 'white' : '#313237' }}
        >
          {isClickedOnBucket ? (
            <p style={{ color: '#27AE60' }}>Selected</p>
          ) : (
            <p>Add to cart</p>
          )}
        </div>
        <div
          onClick={handleAddDeleteFavourites}
          className={styles.product_buttons_favourite}
        >
          {isClickedOnFavourite ? (
            <img src="../../img/icons/FavouritesFilledHeart.svg" alt="" />
          ) : (
            <img src="../../img/icons/favourites.svg" alt="" />
          )}
        </div>
      </div>
    </div>
  );
};
