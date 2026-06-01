import styles from './NewModels.module.scss';
import { useRef } from 'react';
import { scrollProducts } from '../../../../utils/scrollProducts';
import { PhonesList } from './components/PhonesList';

export const NewModels = () => {
  const cardContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className={styles.newModelsSection}>
      <div className={styles.titleAndControls}>
        <h2 className={styles.sectionTitle}>Brand new models</h2>
        <div className={styles.controls}>
          <button
            onClick={() => scrollProducts('left', cardContainerRef)}
            className={styles.control}
          >
            <img src="/icons/chevron-arrow-left.svg" alt="arrow-left" />
          </button>
          <button
            onClick={() => scrollProducts('right', cardContainerRef)}
            className={styles.control}
          >
            <img src="/icons/chevron-arrow-right.svg" alt="arrow-right" />
          </button>
        </div>
      </div>

      <PhonesList cardContainerRef={cardContainerRef} />
    </section>
  );
};
