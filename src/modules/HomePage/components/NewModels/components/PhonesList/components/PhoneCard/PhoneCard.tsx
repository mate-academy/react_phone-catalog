import { useAppContext } from '../../../../../../../../context/AppContext';
import { Product } from '../../../../../../../../types/Product';
import styles from './PhoneCard.module.scss';
import cn from 'classnames';

type Props = {
  phone: Product;
};

export const PhoneCard = ({ phone }: Props) => {
  const { favoritesIds, addBtnIds, setFavoritesIds, setAddBtnIds } =
    useAppContext();

  const toggleArrayIds = (array: number[], id: number) => {
    return array.includes(id)
      ? array.filter(itemId => itemId !== id)
      : [...array, id];
  };

  const toggleFavorites = (id: number) => {
    setFavoritesIds(toggleArrayIds(favoritesIds, id));
  };

  const toggleAddButton = (id: number) => {
    setAddBtnIds(toggleArrayIds(addBtnIds, id));
  };

  return (
    <div className={styles.phoneCard}>
      <div className={styles.imgContainer}>
        <img className={styles.img} src={phone.image} alt={phone.name} />
      </div>
      <h3 className={styles.cardTitle}>{phone.name}</h3>
      <p className={styles.price}>${phone.price}</p>
      <div className={styles.specs}>
        <div className={styles.spec}>
          <p className={styles.specTitle}>Screen</p>
          <p className={styles.specDescription}>{phone.screen}</p>
        </div>
        <div className={styles.spec}>
          <p className={styles.specTitle}>Capacity</p>
          <p className={styles.specDescription}>{phone.capacity}</p>
        </div>
        <div className={styles.spec}>
          <p className={styles.specTitle}>RAM</p>
          <p className={styles.specDescription}>{phone.ram}</p>
        </div>
        <div className={styles.cardButtons}>
          <button
            onClick={() => toggleAddButton(phone.id)}
            className={cn(styles.addBtn, {
              [styles.isActive]: addBtnIds.includes(phone.id),
            })}
          >
            {addBtnIds.includes(phone.id) ? 'Added to cart' : 'Add to cart'}
          </button>
          <button
            onClick={() => toggleFavorites(phone.id)}
            className={styles.favoritesBtn}
          >
            <img
              className={styles.favorites}
              src={
                favoritesIds.includes(phone.id)
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
