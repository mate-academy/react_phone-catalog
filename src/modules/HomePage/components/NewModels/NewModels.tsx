import { Product } from '../../../../types/Product';
import styles from './NewModels.module.scss';
import cn from 'classnames';
import { useAppContext } from '../../../../context/AppContext';

type Props = {
  newPhonesModels: Product[];
};

export const NewModels = ({ newPhonesModels }: Props) => {
  const { favoritesIds, setFavoritesIds, addBtnIds, setAddBtnIds } =
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
    <section className={styles.newModelsSection}>
      <div className={styles.titleAndControls}>
        <h2 className={styles.sectionTitle}>Brand new models</h2>
        <div className={styles.controls}>
          <button className={styles.control}>
            <img src="/icons/chevron-arrow-left.svg" alt="" />
          </button>
          <button className={styles.control}>
            <img src="/icons/chevron-arrow-right.svg" alt="" />
          </button>
        </div>
      </div>

      <div className={styles.phonesList}>
        <div className={styles.container}>
          {newPhonesModels.map(phone => (
            <div key={phone.id} className={styles.phoneCard}>
              <div className={styles.imgContainer}>
                <img
                  className={styles.img}
                  src={phone.image}
                  alt={phone.name}
                />
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
                    {addBtnIds.includes(phone.id)
                      ? 'Added to cart'
                      : 'Add to cart'}
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
          ))}
        </div>
      </div>
    </section>
  );
};
