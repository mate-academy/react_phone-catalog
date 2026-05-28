import { Product } from '../../../../types/Product';
import styles from './NewModels.module.scss';

type Props = {
  newPhonesModels: Product[];
};

export const NewModels = ({ newPhonesModels }: Props) => {
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
                  <button className={styles.addBtn}>Add to cart</button>
                  <button className={styles.favoritesBtn}>
                    <img
                      className={styles.favorites}
                      src="/icons/favorites.svg"
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
