/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useMemo, useEffect, useState } from 'react';
import './CategoryTabs.scss';
import { Link } from 'react-router-dom';
import { pageData } from '../../data/pageData';
import { getProductsWithoutDeley } from '../../api/fetchClient';
import { PageData } from '../../types/PageData';

export const CategoryTabs: React.FC = () => {
  const categoriesToShow = useMemo(() => (
    pageData.filter(data => data.imageUrl)
  ), [pageData]);

  const [
    categoriesData, setCategoriesData,
  ] = useState<PageData[]>(categoriesToShow);

  useEffect(() => {
    categoriesToShow.forEach(category => {
      if (category.apiUrl) {
        getProductsWithoutDeley()
          .then(productsFromServer => {
            const count = productsFromServer.length || 0;

            const newCategory = categoriesData
              .find(cat => cat.name === category.name);

            const categories = categoriesData
              .filter(cat => cat.name !== category.name);

            if (newCategory) {
              newCategory.count = count;

              setCategoriesData([newCategory, ...categories]);
            }
          });
      }
    });
  }, []);

  return (
    <div className="categories-tabs" data-cy="categoryLinksContainer">
      <h1 className="categories-tabs__title">
        Shop by category
      </h1>
      <div className="categories-tabs__items">
        {categoriesData.map(category => {
          const count = category.count || 0;
          const countText = count > 1 ? 'models' : 'model';

          return (
            <div className="categories-tabs__item category" key={category.name}>
              <Link
                className="category__image"
                to={category.link}
                style={{
                  backgroundImage: `url(${category.imageUrl})`,
                  backgroundColor: `${category.color}`,
                }}
                aria-label="category-image"
              />
              <Link to={category.link} className="category__title">
                {category.name}
              </Link>
              <p className="category__description">{`${count} ${countText}`}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
