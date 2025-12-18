import { useState } from 'react';
import styles from './BrandNewModels.module.scss';
import phones from '../../public/api/phones.json';

export const BrandNewModels = () => {
  const [index, setIndex] = useState(0);
  const ITEMS_PER_PAGE = 4;

  const next = () => {
    if (index + ITEMS_PER_PAGE < phones.length) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const visiblePhones = phones.slice(index, index + ITEMS_PER_PAGE);

  return (
    <section className={styles.modelsContainer}>
      <h1 className={styles.modelsContainer__title}>Brand new models</h1>

      <div className={styles.modelsContainer__buttonsContainer}>
        <button onClick={prev} className={styles.modelsContainer__buttonPrev}>
          <span className={styles.modelsContainer__arrow}>{'<'}</span>
        </button>

        <button onClick={next} className={styles.modelsContainer__buttonNext}>
          <span className={styles.modelsContainer__arrow}>{'>'}</span>
        </button>
      </div>

      <div className={styles.modelsContainer__cards}>
        {visiblePhones.map(phone => (
          <div key={phone.id} className={styles.modelsContainer__card}>
            <img
              src={phone.images[0]}
              alt={phone.name}
              className={styles.image}
            />
            <h3 className={styles.modelsContainer__name}>{phone.name}</h3>
            <p className={styles.modelsContainer__price}>
              ${phone.priceDiscount || phone.priceRegular}
            </p>

            <div className={styles.modelsContainer__line}></div>

            <div className={styles.modelsContainer__cardDescription}>
              <div className={styles.modelsContainer__screen}>
                <p className={styles.modelsContainer__screenT1}>Screen</p>
                <p className={styles.modelsContainer__screenT2}>
                  {phone.screen}
                </p>
              </div>

              <div className={styles.modelsContainer__capacity}>
                <p className={styles.modelsContainer__capacityT1}>Capacity</p>
                <p className={styles.modelsContainer__capacityT2}>
                  {phone.capacity}
                </p>
              </div>

              <div className={styles.modelsContainer__Ram}>
                <p className={styles.modelsContainer__RamT1}>Capacity</p>
                <p className={styles.modelsContainer__RamT2}>{phone.ram}</p>
              </div>
            </div>
            <div className={styles.modelsContainer__buttonsBox}>
              <button className={styles.modelsContainer__CartAdd}>
                <p className={styles.modelsContainer__CartAddText}>
                  Add to cart
                </p>
              </button>
              <button className={styles.modelsContainer__Icon}>
                <img src="/img/Logos/Favourites.png" alt="Favourites" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
