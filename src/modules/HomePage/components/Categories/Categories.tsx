import React, { useContext } from 'react';
import { SectionTitle } from '../../../../components/SectionTitle/SectionTitle';
import { CategoriesContext } from '../../../../context/CategoriesContext';
import { Link } from 'react-router-dom';
import { getNormalizedTitle } from '../../../../helpers/stringHelper';
import categoriesStyles from './Categories.module.scss';

export const Categories = () => {
  const { categories } = useContext(CategoriesContext);

  return (
    <section className={categoriesStyles.categories}>
      <SectionTitle title="Shop by category" />
      <div className={categoriesStyles.categories__container}>
        {categories.map(category => (
          <article
            key={category.name}
            className={categoriesStyles.categories__item}
          >
            <Link
              to={`${category.name}`}
              className={categoriesStyles.categories__link}
            >
              <img
                src={category.image}
                alt={`Image for category ${category.name}`}
                className={categoriesStyles.categories__image}
              />
              <div className={categoriesStyles.categories__info}>
                <h3 className={categoriesStyles.categories__infoTitle}>
                  {getNormalizedTitle(category.name)}
                </h3>
                <p className={categoriesStyles.categories__infoText}>
                  {`${category.modelsCount} products`}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};
