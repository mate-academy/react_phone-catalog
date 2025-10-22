import React, { useMemo } from 'react';
import style from './ShopCatagory.module.scss';
import image1 from './../../images/shopcategory/image1.jpg';
import image2 from './../../images/shopcategory/image2.jpg';
import image3 from './../../images/shopcategory/image3.jpg';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';

import './ShopCatagory.scss';
import { Category } from './Category';

export const ShopCatagory = () => {
  const categories = useMemo(() => {
    return [
      {
        id: 0,
        linkTo: 'phones',
        name: 'Mobile phones',
        image: image1,
        countModels: phones.length,
      },
      {
        id: 1,
        linkTo: 'tablets',
        name: 'Tablets',
        image: image2,
        countModels: tablets.length,
      },
      {
        id: 2,
        linkTo: 'accessories',
        name: 'Accessories',
        image: image3,
        countModels: accessories.length,
      },
    ];
  }, []);

  return (
    <section className="shop-category">
      <div className="container">
        <h2 className="shop-category__title">Shop by category</h2>
        <div className="shop-category__wrapper">
          {categories.map(category => (
            <Category key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};
