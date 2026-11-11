import { useState } from 'react';
import styles from './RelatedProducts.module.scss';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  namespaceId: string;
  name: string;
  images: string[];
  priceDiscount: number;
  priceRegular?: number;
  screen: string;
  capacity: string;
  ram: string;
}

interface RelatedProductsProps {
  products: Product[];
}

export const RelatedProducts = ({ products }: RelatedProductsProps) => {
  const uniqueForBrandNew = products.filter(
    (product, index, self) =>
      index === self.findIndex(p => p.namespaceId === product.namespaceId),
  );

  const getModelNumber = (namespaceId: string) => {
    const match = namespaceId.match(/\d+/);

    return match ? parseInt(match[0], 10) : 0;
  };

  const brandNewProducts = [...uniqueForBrandNew].sort((a, b) => {
    return getModelNumber(b.namespaceId) - getModelNumber(a.namespaceId);
  });

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const visibleCards = 4;
  const maxIndex = brandNewProducts.length - visibleCards;

  const handleNextCard = () => {
    if (currentCardIndex < maxIndex) {
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.brandNewSection}>
        <div className={styles.brandNewHeader}>
          <h2 className={styles.sectionTitle}>You may also like</h2>
          <div className={styles.brandNewArrows}>
            <button
              type="button"
              onClick={handlePrevCard}
              disabled={currentCardIndex === 0}
            >
              <img src="./img/icons/arrow-left.svg" alt="Previous" />
            </button>

            <button
              type="button"
              onClick={handleNextCard}
              disabled={currentCardIndex >= maxIndex}
            >
              <img src="./img/icons/arrow-right.svg" alt="Next" />
            </button>
          </div>
        </div>

        <div className={styles.sliderWindow}>
          <div
            className={styles.cardsContainer}
            style={{
              transform: `translateX(-${currentCardIndex * (272 + 16)}px)`,
              transition: 'transform 0.4s ease-in-out',
            }}
          >
            {brandNewProducts.map(product => (
              <Link
                to={`/phones/${product.id}`}
                key={product.id}
                className={styles.card}
              >
                <img
                  src={`./${product.images[0]}`}
                  alt={product.name}
                  className={styles.cardImage}
                />
                <p className={styles.cardName}>{product.name}</p>

                <div className={styles.priceContainer}>
                  <span className={styles.priceDiscount}>
                    {`$${product.priceDiscount}`}
                  </span>
                </div>

                <hr className={styles.cardLine} />

                <div className={styles.specsContainer}>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Screen</span>
                    <span className={styles.specValue}>
                      {product.screen.split(' (')[0].trim()}
                    </span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Capacity</span>
                    <span className={styles.specValue}>{product.capacity}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>RAM</span>
                    <span className={styles.specValue}>{product.ram}</span>
                  </div>
                </div>
                <div className={styles.cardButton}>
                  <button
                    className={styles.addToCard}
                    onClick={e => {
                      e.preventDefault();
                    }}
                  >
                    Add to cart
                  </button>
                  <img
                    src="./img/icons/heart.svg"
                    alt="Favorites"
                    className={styles.cardHeart}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
