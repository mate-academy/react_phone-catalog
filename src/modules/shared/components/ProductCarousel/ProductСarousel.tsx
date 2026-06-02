import styles from './ProductСarousel.module.scss';
import { scrollProducts } from '../../../../utils/scrollProducts';
import { useRef } from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

export const ProductCarousel = ({ children, title }: Props) => {
  const cardContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className={styles.newModelsSection}>
      <div className={styles.titleAndControls}>
        <h2 className={styles.sectionTitle}>{title}</h2>
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

      <div className={styles.phonesList}>
        <div ref={cardContainerRef} className={styles.container}>
          {children}
        </div>
      </div>
    </section>
  );
};
