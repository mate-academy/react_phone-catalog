/* eslint-disable @typescript-eslint/indent */
/* eslint max-len: "off" */
import { Link } from 'react-router-dom';
import './ShopByCategory.scss';
import React from 'react';
import { SkeletShopByCategory } from '../../../components/Skelet/SkeletShopByCategory';

type Props = {
  title: string;
  totalPhonesModels: number;
  totalTabletsModels: number;
  totalAccessoiresModels: number;
  isSkelet?: boolean;
};

export const ShopByCategory: React.FC<Props> = ({
  title,
  totalPhonesModels,
  totalTabletsModels,
  totalAccessoiresModels,
  isSkelet,
}) => {
  const categories = [
    {
      name: 'phones',
      title: 'Mobile phones',
      count: totalPhonesModels,
      image: import.meta.env.BASE_URL + 'img/category-phones.webp',
      background: 'bg-phones',
    },
    {
      name: 'tablets',
      title: 'Tablets',
      count: totalTabletsModels,
      image: import.meta.env.BASE_URL + 'img/category-tablets.webp',
      background: 'bg-tablets',
    },
    {
      name: 'accessoires',
      title: 'Accessoires',
      count: totalAccessoiresModels,
      image: import.meta.env.BASE_URL + 'img/category-accessories.webp',
      background: 'bg-accessories',
    },
  ];

  return (
    <div className="section">
      <div className="section__title">
        <h2 className="title">{title}</h2>
      </div>
      <div className="section__block">
        {isSkelet
          ? Array.from({ length: categories.length }).map((_, index) => (
              <SkeletShopByCategory key={index} />
            ))
          : categories.map(category => (
              <div className="section__block--link" key={category.name}>
                <Link
                  to={`/${category.name}`}
                  className={`category__link ${category.background}`}
                >
                  <img
                    src={category.image}
                    alt={`category ${category.name}`}
                    className="category__link--img"
                  />
                </Link>

                <div className="category__contents">
                  <h3 className="category__contents--title">
                    {category.title}
                  </h3>
                  <p className="category__contents--count">
                    {category.count} models
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
