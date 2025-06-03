/* eslint-disable max-len */

import { useEffect, useState } from 'react';
import './Category.scss';
import { ProductType } from '../../types/ProductType';
import { fetchProducts } from '../../api';
import { Categories } from './Categories';
import { Link } from 'react-router-dom';

export const Category = () => {
  const [count, setCount] = useState<Record<string, number>>({});

  useEffect(() => {
    const loadCounts = async () => {
      const data: ProductType[] = await fetchProducts();

      const categoryCounts = Categories.reduce(
        (acc, category) => ({
          ...acc,
          [category.key]: data.filter(
            product => product.category === category.key,
          ).length,
        }),
        {} as Record<string, number>,
      );

      setCount(categoryCounts);
    };

    loadCounts();
  }, []);

  return (
    <section className="category main__margin">
      <h2 className="category__title text text__title--basic">
        Shop by category
      </h2>

      <div className="category__content">
        {Categories.map(({ name, key, bgClass, imgClass }) => (
          <Link to={`/${key}`} className="category__content-card" key={key}>
            <div className={`category__content-card--image ${bgClass}`}>
              <div className={imgClass}></div>
            </div>

            <div className="category__content-card--text">
              <h4 className="category__content-card--text-title text text__title--utility">
                {name}
              </h4>

              <p className="category__content-card--text-desc text text__body">
                {count[key] ?? 0} models
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
