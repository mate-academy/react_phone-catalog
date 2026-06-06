import { useAppContext } from '../../../../context/AppContext';
import { Product } from '../../../../types/Product';
import { toggleArrayIds } from '../../../../utils/toggleArrayIds';
import styles from './PhoneCard.module.scss';
import cn from 'classnames';

type Props = {
  product: Product;
  isOldPriceVisible?: boolean;
};

export const PhoneCard = ({ product, isOldPriceVisible }: Props) => {
  const { favoritesIds, addBtnIds, setFavoritesIds, setAddBtnIds } =
    useAppContext();

  const toggleFavorites = (id: number) => {
    setFavoritesIds(toggleArrayIds(favoritesIds, id));
  };

  const toggleAddButton = (id: number) => {
    setAddBtnIds(toggleArrayIds(addBtnIds, id));
  };

  return (
    <div className={styles.phoneCard}>
      <div className={styles.imgContainer}>
        <img className={styles.img} src={product.image} alt={product.name} />
      </div>
      <h3 className={styles.cardTitle}>{product.name}</h3>
      <div className={styles.priceContainer}>
        <p className={styles.price}>${product.price}</p>
        {isOldPriceVisible && (
          <p className={styles.fullPrice}>${product.fullPrice}</p>
        )}
      </div>
      <div className={styles.specs}>
        <div className={styles.spec}>
          <p className={styles.specTitle}>Screen</p>
          <p className={styles.specDescription}>{product.screen}</p>
        </div>
        <div className={styles.spec}>
          <p className={styles.specTitle}>Capacity</p>
          <p className={styles.specDescription}>{product.capacity}</p>
        </div>
        <div className={styles.spec}>
          <p className={styles.specTitle}>RAM</p>
          <p className={styles.specDescription}>{product.ram}</p>
        </div>
        <div className={styles.cardButtons}>
          <button
            onClick={() => toggleAddButton(product.id)}
            className={cn(styles.addBtn, {
              [styles.isActive]: addBtnIds.includes(product.id),
            })}
          >
            {addBtnIds.includes(product.id) ? 'Added to cart' : 'Add to cart'}
          </button>
          <button
            onClick={() => toggleFavorites(product.id)}
            className={styles.favoritesBtn}
          >
            <img
              className={styles.favorites}
              src={
                favoritesIds.includes(product.id)
                  ? '/icons/favorites-filled.svg'
                  : '/icons/favorites.svg'
              }
              alt="favorites"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
