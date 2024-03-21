import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '../../base';

import './ShopByCategory.scss';
import { ProductCategories } from '../../../types';
import { getProductsQtyByCategory } from '../../../utils';

type Props = {};

export const ShopByCategory: React.FC<Props> = () => {
  const [mobiles, setMobiles] = useState<number>(0);
  const [tablets, setTablets] = useState<number>(0);
  const [accessories, setAccessories] = useState<number>(0);

  useEffect(() => {
    Promise.all([
      getProductsQtyByCategory(ProductCategories.phones),
      getProductsQtyByCategory(ProductCategories.tablets),
      getProductsQtyByCategory(ProductCategories.accessories),
    ])
      .then(result => {
        setMobiles(result[0]);
        setTablets(result[1]);
        setAccessories(result[2]);
      })
      .catch(() => new Error());
  }, []);

  return (
    <div className="shop-by-category" data-cy="categoryLinksContainer">
      <Link to="phones" className="shop-by-category__item">
        <div
          className="
            shop-by-category__image
            shop-by-category__image--bg-sand"
        >
          <img src="./img/category-phones.png" alt="Phones" />
        </div>
        <div className="shop-by-category__info">
          <Typography type="title" level="3" className="shop-by-category__name">
            Mobile phones
          </Typography>
          <Typography
            type="text"
            weight="500"
            className="shop-by-category__counter"
          >
            {mobiles} models
          </Typography>
        </div>
      </Link>

      <Link to="tablets" className="shop-by-category__item">
        <div
          className="
            shop-by-category__image
            shop-by-category__image--bg-gray"
        >
          <img src="./img/category-tablets.png" alt="Tablets" />
        </div>
        <div className="shop-by-category__info">
          <Typography type="title" level="3" className="shop-by-category__name">
            Tablets
          </Typography>
          <Typography
            type="text"
            weight="500"
            className="shop-by-category__counter"
          >
            {tablets} models
          </Typography>
        </div>
      </Link>

      <Link to="accessories" className="shop-by-category__item">
        <div
          className="
            shop-by-category__image
            shop-by-category__image--bg-bordo"
        >
          <img src="./img/category-accessories.png" alt="Accessories" />
        </div>
        <div className="shop-by-category__info">
          <Typography type="title" level="3" className="shop-by-category__name">
            Accessories
          </Typography>
          <Typography
            type="text"
            weight="500"
            className="shop-by-category__counter"
          >
            {accessories} models
          </Typography>
        </div>
      </Link>
    </div>
  );
};
