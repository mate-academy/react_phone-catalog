import React from 'react';
import Cat from './Categories.module.scss';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Product } from '../../../../types/Product';

type Props = {
  products: Product[];
};

export const Categories: React.FC<Props> = ({ products }) => {
  const phonesAmount = products.filter(
    product => product.category === 'phones',
  ).length;
  const tabletssAmount = products.filter(
    product => product.category === 'tablets',
  ).length;
  const accessoriesAmount = products.filter(
    product => product.category === 'accessories',
  ).length;

  return (
    <section className={Cat.cat}>
      <div className={Cat.cat__content}>
        <h2 className={Cat.cat__title}>Shop by category</h2>

        <div className={Cat.cat__link}>
          <Link
            to={'/phones'}
            className={cn(Cat.cat__category, Cat['cat__category--phones'])}
          >
            <img
              src="img\category-phones1.svg"
              alt="phones"
              className={Cat.cat__category__img}
            />
          </Link>
          <div className={Cat.cat__category__details}>
            <p className={Cat.cat__category__title}>Mobile phones</p>
            <p className={Cat.cat__category__amount}>{phonesAmount} models</p>
          </div>
        </div>
        <div className={Cat.cat__link}>
          <Link
            to={'/tablets'}
            className={cn(Cat.cat__category, Cat['cat__category--tablets'])}
          >
            <img
              src="img\category-tablets_1.png"
              alt="tablets"
              className={Cat.cat__category__img}
            />
          </Link>
          <div className={Cat.cat__category__details}>
            <p className={Cat.cat__category__title}>Tablets</p>
            <p className={Cat.cat__category__amount}>{tabletssAmount} models</p>
          </div>
        </div>
        <div className={Cat.cat__link}>
          <Link
            to={'/accessories'}
            className={cn(Cat.cat__category, Cat['cat__category--accessories'])}
          >
            <img
              src="img\category-accessories_1.png"
              alt="accessories"
              className={Cat.cat__category__img}
            />
          </Link>
          <div className={Cat.cat__category__details}>
            <p className={Cat.cat__category__title}>Accessories</p>
            <p className={Cat.cat__category__amount}>
              {accessoriesAmount} models
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
