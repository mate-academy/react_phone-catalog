import { useEffect, useState } from 'react';
import styles from './ProductSlider.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';

type Product = {
  id: string;
  title: string;
  price: number;
  image?: string;
};

type Props = {
  title: string;
  products: Product[];
};

export const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const [index, setIndex] = useState(0);

  const [visibleCards, setVisibleCards] = useState(4);
  const [cardWidth, setCardWidth] = useState(260);

  const maxIndex = Math.max(0, products.length - visibleCards);

  const handlePrev = () => {
    setIndex(prev => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setIndex(prev => Math.min(prev + 1, maxIndex));
  };

  // const getVisibleCards = (width: number) => {
  //   if (width >= 1200) {
  //     return 4;
  //   }

  //   if (width >= 640) {
  //     return 2.5;
  //   }

  //   return 1.3;
  // };

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;

      if (width >= 1200) {
        setVisibleCards(4);
        setCardWidth(260);
      } else if (width >= 640) {
        setVisibleCards(2.5);
        setCardWidth(260);
      } else {
        setVisibleCards(1.3);
        setCardWidth(220);
      }
    };

    update();
    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, []);

  // const maxIndex = Math.max(0, products.length - Math.ceil(visibleCards));

  return (
    <section className={styles.slider}>
      <div className={styles.header}>
        <h2>{title}</h2>

        <div className={styles.buttons}>
          <button onClick={handlePrev} disabled={index === 0}>
            ←
          </button>
          <button onClick={handleNext} disabled={index === maxIndex}>
            →
          </button>
        </div>
      </div>

      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{
            transform: `translateX(-${index * (cardWidth + 16)}px)`,
          }}
        >
          {products.map(product => (
            <div className={styles.slide} key={product.id}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
