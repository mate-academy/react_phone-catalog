import './CategoryBlock.scss';
import { useAppSelector } from '../../customHooks/customHooks';
import accessoriesImage from '../../images/categories/category-accessories.png';
import phonesImage from '../../images/categories/category-phones.png';
import tabletsImage from '../../images/categories/category-tablets.png';
import React from 'react';
import { Categories } from '../../types/Categories';
import { Link } from 'react-router-dom';

export const CategoryBlock: React.FC = () => {
  const { products } = useAppSelector(state => state.products);

  const getCategoryModels = (category: Categories) => {
    return products.filter(product => product.category === category).length;
  };

  const categories = [
    {
      title: 'Phones',
      image: phonesImage,
      models: getCategoryModels(Categories.Phones),
    },
    {
      title: 'Tablets',
      image: tabletsImage,
      models: getCategoryModels(Categories.Tablets),
    },
    {
      title: 'Accessories',
      image: accessoriesImage,
      models: getCategoryModels(Categories.Accessories),
    },
  ];

  return (
    <section className="categoryBlock">
      <div className="categoryBlock__content">
        <h2 className="categoryBlock__title">Shop by category</h2>
        <div className="categoryBlock__categories">
          {categories.map(category => (
            <div className="categoryBlock__category" key={category.title}>
              <Link
                to={`/${category.title.toLowerCase()}`}
                className="categoryBlock__link"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="categoryBlock__image"
                />
              </Link>
              <h3 className="categoryBlock__category_title">
                {category.title}
              </h3>
              <p className="categoryBlock__category_models">
                {category.models} models
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
