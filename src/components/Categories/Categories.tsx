import React, { useEffect, useState } from 'react';
import './Categories.scss';
import { Link } from 'react-router-dom';
import { getCategoryProducts } from '../../services/api';
import { FullProductData } from '../../types/FullProductData';
import { Category } from '../../types/Category';

export const Categories: React.FC = () => {
  const [categoriesData, setCategoriesData] = useState<{
    [key: string]: FullProductData[];
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      const phonesData = await getCategoryProducts(Category.Phones);
      const tabletsData = await getCategoryProducts(Category.Tablets);
      const accessoriesData = await getCategoryProducts(Category.Accessories);

      setCategoriesData({
        [Category.Phones]: phonesData,
        [Category.Tablets]: tabletsData,
        [Category.Accessories]: accessoriesData,
      });
    };

    fetchData();
  }, []);

  return (
    <div className="categories">
      <h2 className="categories__title">{'Shop by category'}</h2>
      <div className="categories__content">
        {Object.values(Category).map(category => (
          <Link
            key={category}
            to={`/products/${category.toLowerCase()}`}
            className="categories__item"
          >
            <div
              className={`categories__item-img-container block__${category.toLowerCase()}`}
            >
              <div
                className={`categories__item-img img__${category.toLowerCase()}`}
              ></div>
            </div>
            <h4 className="categories__item-title">{category}</h4>
            <p className="categories__item-models body-text">
              {categoriesData[category]?.length || 0} models
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
