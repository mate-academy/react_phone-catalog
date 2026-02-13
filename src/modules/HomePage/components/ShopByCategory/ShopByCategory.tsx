import React from 'react';
import shpopClass from './shopByCategory.module.scss';
import { PagesType } from '../../../../types/PagesType';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import phones from '../../../../../public/api/phones.json';
import tablets from '../../../../../public/api/tablets.json';
import accessories from '../../../../../public/api/tablets.json';

export const ShopByCategory: React.FC = React.memo(() => {
  const phoneCount = phones.length;
  const tabletCount = tablets.length;
  const accessorieCount = accessories.length;

  const categories = [
    {
      key: 0,
      name: 'phone',
      to: PagesType.phones,
      title: 'Mobile phones',
      subtitle: `${phoneCount} models`,
    },
    {
      key: 1,
      name: 'tablet',
      to: PagesType.tablets,
      title: 'Tablets',
      subtitle: `${tabletCount} models`,
    },
    {
      key: 2,
      name: 'accessory',
      to: PagesType.accessories,
      title: 'Accessories',
      subtitle: `${accessorieCount} models`,
    },
  ];

  return (
    <div className={cn(shpopClass['shop-by-category'], 'container')}>
      <h2 className={shpopClass['shop-by-category__title']}>
        Shop by category
      </h2>

      <div className={shpopClass['shop-by-category__categories']}>
        {categories.map(category => (
          <Link
            key={category.key}
            to={category.to}
            className={cn(
              shpopClass['shop-by-category__category'],
              shpopClass[`shop-by-category__category--${category.name}`],
            )}
          >
            <div
              className={cn(
                shpopClass['shop-by-category__img'],
                shpopClass[`shop-by-category__img--${category.name}`],
              )}
            ></div>
            <div className={shpopClass['shop-by-category__description']}>
              <h4
                className={cn(
                  shpopClass['shop-by-category__text'],
                  shpopClass['shop-by-category__text-title'],
                )}
              >
                {category.title}
              </h4>
              <p
                className={cn(
                  shpopClass['shop-by-category__text'],
                  shpopClass['shop-by-category__subtitle'],
                )}
              >
                {category.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
});

ShopByCategory.displayName = 'ShopByCategory';
