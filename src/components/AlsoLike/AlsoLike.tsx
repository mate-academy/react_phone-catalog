import React, { useState, useEffect } from 'react';
import { CardHP } from '../CardHP/CardHP';
import './AlsoLike.scss';
import productsData from '/public/api/products.json';
import { Product } from '../../types';

type AlsoLikeProps = {
  favourites: Product[];
  addToFav?: (product: Product) => void;
};

export const AlsoLike: React.FC<AlsoLikeProps> = ({
                                                    favourites,
                                                    addToFav,
                                                  }) => {
  // Залишаємо useMemo, щоб товари не перемішувалися заново при кожному кліку/ресайзі
  const models = React.useMemo(() => {
    return [...productsData].sort(() => 0.5 - Math.random()).slice(0, 10);
  }, []);

  const [startIndex, setStartIndex] = useState(0);
  // Замість константи VISIBLE_COUNT робимо стейт
  const [visibleCount, setVisibleCount] = useState(4);

  // Слухаємо зміну ширини екрана
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(1); // Телефони
      } else if (width < 868) {
        setVisibleCount(2); // Планшети (вертикально)
      } else if (width < 1200) {
        setVisibleCount(3); // Планшети (горизонтально) / невеликі ноутбуки
      } else {
        setVisibleCount(4); // Десктопи
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    setStartIndex(prev =>
      prev + 1 > models.length - visibleCount ? 0 : prev + 1,
    );
  };

  const handlePrev = () => {
    setStartIndex(prev =>
      prev - 1 < 0 ? models.length - visibleCount : prev - 1,
    );
  };

  const visibleModels = models.slice(startIndex, startIndex + visibleCount);

  return (
    <section className="also-like">
      <div className="also-like__header">
        <h2 className="also-like__title">You may also like</h2>

        <div className="also-like__arrows">
          {/* Виправив логіку кнопок: Prev -> вліво, Next -> вправо */}
          <button onClick={handlePrev} className="also-like__arrow">
            ←
          </button>
          <button onClick={handleNext} className="also-like__arrow">
            →
          </button>
        </div>
      </div>

      <div className="also-like__list">
        {visibleModels.map(product => (
          <CardHP
            favourites={favourites}
            addToFav={addToFav}
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};
