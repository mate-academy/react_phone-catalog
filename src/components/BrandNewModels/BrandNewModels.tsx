import React, { useState, useEffect } from 'react';
import { CardHP } from '../CardHP/CardHP';
import './BrandNewModels.scss';
import productsData from '/public/api/products.json';
import { Product } from '../../types';

type BrandNewModelsProps = {
  favourites: Product[];
  addToFav?: (product: Product) => void;
  year: number;
};

export const BrandNewModels: React.FC<BrandNewModelsProps> = ({
                                                                favourites,
                                                                addToFav,
                                                                year,
                                                              }) => {
  const models = productsData.sort((a, b) => b.year - a.year).slice(0, 10);

  const [startIndex, setStartIndex] = useState(0);
  // Замість константи робимо стейт для кількості видимих карток (по замовчуванню 4)
  const [visibleCount, setVisibleCount] = useState(4);

  // Додаємо слухача зміни ширини екрана
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

    handleResize(); // Викликаємо одразу при завантаженні компонента
    window.addEventListener('resize', handleResize); // Слухаємо зміни розміру вікна

    // Очищаємо слухач, коли компонент зникає
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

  // Використовуємо динамічний visibleCount
  const visibleModels = models.slice(startIndex, startIndex + visibleCount);

  return (
    <section className="brand-new">
      <div className="brand-new__header">
        <h2 className="brand-new__title">Brand new models</h2>

        <div className="brand-new__arrows">
          <button onClick={handlePrev} className="brand-new__arrow">
            ←
          </button>
          <button onClick={handleNext} className="brand-new__arrow">
            →
          </button>
        </div>
      </div>

      <div className="brand-new__list">
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
