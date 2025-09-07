import React from 'react';
import './Category.scss';
import { Link } from 'react-router-dom';
import categories from '../../../../data/category.json';
import accessories from '../../../../data/accessories.json';
import phones from '../../../../data/phones.json';
import tablets from '../../../../data/tablets.json';

// Об'єднуємо всі товари в один масив
const allProducts = [...phones, ...tablets, ...accessories];

// Додаємо кількість моделей до кожної категорії
const enrichedCategories = categories.map(cat => {
  const modelCount = allProducts.filter(
    product => product.category === cat.category,
  ).length;

  return {
    ...cat,
    models: modelCount,
  };
});

export const CategoryGrid = () => {
  return (
    <section className="category-section">
      <h2 className="category-section-title">Shop by category</h2>
      <div className="category-grid">
        {enrichedCategories.map((cat, index) => (
          <Link to={cat.path} key={index} className="category-card">
            <div
              className="category-image"
              style={{ backgroundColor: cat.bgColor }}
            >
              <img src={cat.image} alt={cat.title} />
            </div>
            <div className="category-info">
              <h3>{cat.title}</h3>
              <p>{cat.models} models</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
