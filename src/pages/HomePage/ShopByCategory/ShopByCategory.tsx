/* eslint-disable @typescript-eslint/indent */
/* eslint max-len: "off" */
import { Link } from 'react-router-dom';
import './ShopByCategory.scss';
import React from 'react';
import { SkeletonShopByCategory } from '../../../components/Skeletons/SkeletonShopByCategory/SkeletonShopByCategory';

type Props = {
  title: string;
  totalPhonesModels: number;
  totalTabletsModels: number;
  totalAccessoriesModels: number;
  isSkeleton?: boolean;
};

export const ShopByCategory: React.FC<Props> = ({
  title,
  totalPhonesModels,
  totalTabletsModels,
  totalAccessoriesModels,
  isSkeleton,
}) => {
  const categories = [
    {
      name: 'phones',
      title: 'Mobile phones',
      count: totalPhonesModels,
      image: './img/category-phones.webp',
      background: 'bg-phones',
    },
    {
      name: 'tablets',
      title: 'Tablets',
      count: totalTabletsModels,
      image: './img/category-tablets.webp',
      background: 'bg-tablets',
    },
    {
      name: 'accessories',
      title: 'Accessories',
      count: totalAccessoriesModels,
      image: './img/category-accessories.webp',
      background: 'bg-accessories',
    },
  ];

  return (
    <div className="section">
      <div className="section__title">
        <h2 className="title">{title}</h2>
      </div>
      <div className="section__block">
        {isSkeleton
          ? Array.from({ length: categories.length }).map((_, index) => (
              <SkeletonShopByCategory key={index} />
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
