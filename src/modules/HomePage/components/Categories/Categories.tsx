import React from 'react';
import './Categories.scss';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../../../context/GlobalContext';
import { useLanguage } from '../../../../context/LanguageContext';

type Props = {
  className: string;
};

type Category = {
  img: string;
  title: 'mobilePhones' | 'tablets' | 'accessories';
  class: string;
  link: string;
  id: number;
};

const categories: Category[] = [
  {
    img: 'img/categories/categories-phones.png',
    title: 'mobilePhones',
    class: 'phones',
    link: 'phones',
    id: 0,
  },
  {
    img: 'img/categories/categories-tablets.png',
    title: 'tablets',
    class: 'tablets',
    link: 'tablets',
    id: 1,
  },
  {
    img: 'img/categories/categories-accessories.png',
    title: 'accessories',
    class: 'accessories',
    link: 'accessories',
    id: 2,
  },
];

export const Categories: React.FC<Props> = ({ className }) => {
  const { allProducts } = useGlobalContext();
  const { texts } = useLanguage();

  return (
    <div className={`categories ${className}`}>
      <h2 className="categories__heading">{texts.shopByCategory}</h2>
      <div className="categories__body">
        {categories.map(category => (
          <div
            className={`categories__item categories__item--${category.class}`}
            key={category.id}
          >
            <Link to={`/${category.link}`}>
              <img
                src={category.img}
                alt="photo category"
                className="categories__img"
              />
            </Link>
            <div className="categories__info">
              <Link to={`/${category.link}`}>
                <h4 className="categories__title">{texts[category.title]}</h4>
              </Link>
              <p className="categories__count">
                {
                  allProducts.filter(
                    product => product.category === category.class,
                  ).length
                }
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
