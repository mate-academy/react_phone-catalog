import styles from './BrandNewModels.module.scss';
import phones from '../../public/api/phones.json';

export const BrandNewModels = () => {
  return (
    <section className={styles.modelsContainer}>
      <h1 className={styles.modelsContainer__title}>Brand new models</h1>
      <div className={styles.modelsContainer__cards}>
        {phones.map(phone => (
          <div key={phone.id} className={styles.card}>
            <img
              src={phone.images[0]}
              alt={phone.name}
              className={styles.image}
            />
            <h3>{phone.name}</h3>
            <p>${phone.priceDiscount || phone.priceRegular}</p>

            <div>
              <p>Screen: {phone.screen}</p>
              <p>Capacity: {phone.capacity}</p>
              <p>RAM: {phone.ram}</p>
            </div>

            <button>Add to cart</button>
          </div>
        ))}
      </div>
    </section>
  );
};
