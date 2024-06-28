import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import './Categories.scss';
import { StateProduct } from '../../context/ProductContext';
import { categories } from '../../utils/indes';

const Categories: React.FC = () => {
  const { products } = useContext(StateProduct);

  return (
    <section className="categories">
      <h2 className="categories__title">Shop by category</h2>
      <div className="categories__container">
        {categories.map(category => {
          const modelsLength = products.filter(
            item => item.category === category.alt,
          ).length;

          return (
            <div key={category.id} className="categories__card">
              <Link to={category.href}>
                <img
                  src={category.img}
                  alt={category.alt}
                  className="categories__card-img"
                />
              </Link>

              <h4 className="categories__card-title">{category.title}</h4>
              <p className="categories__card-num">{`${modelsLength} models`}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
