import { Link } from 'react-router-dom';
import { ProductsType } from '../../types/Products';
import { ItemTechSpecs } from '../ItemTechSpecs/ItemTechSpecs';
import styles from './ProductCard.module.scss';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { FavouritesButton } from '../Buttons/FavouritesButton';

type Props = {
  productItem: ProductsType;
};

export const ProductCard: React.FC<Props> = ({ productItem }) => {
  const {
    name,
    itemId,
    category,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = productItem;

  const techSpecs = { screen, capacity, ram };

  return (
    <article className={styles.product}>
      <div className={styles.productContainer}>
        <Link to={`../${category}/${itemId}`} className={styles.photoContainer}>
          <img src={`/${image}`} alt={name} className={styles.productPhoto} />
        </Link>

        <div className={styles.productDescription}>
          <Link
            to={`../${category}/${itemId}`}
            className={`${styles.productTitle} body-text-small`}
          >
            {name}
          </Link>
          <div className="price">
            <h2>${price}</h2>
            {fullPrice && <p className="oldPriceFont">${fullPrice}</p>}
          </div>

          <hr className="horizontalLine" />

          <ItemTechSpecs techSpecs={techSpecs} />

          <div className={`buttons ${styles.productCardButtons}`}>
            <PrimaryButton itemId={itemId} />
            <FavouritesButton itemId={itemId} />
          </div>
        </div>
      </div>
    </article>
  );
};
