import cn from 'classnames';
import categories from './Categories.module.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../../../types/Product';
import React from 'react';

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
    <section className={categories.categories}>
      <div className="container">
        <div className={categories.categories__content}>
          <h2 className={categories.categories__title}>Shop by category</h2>
          <div className={categories.categories__links}>
            <Link
              to={'/phones'}
              className={cn(
                categories.Categories__category,
                categories.category,
              )}
            >
              <img
                src="\img\home\phones-category.png"
                alt="phones"
                className={cn(
                  categories.category__img,
                  categories['category__img--phones'],
                )}
              />
              <div className={categories.category__details}>
                <p className={categories.category__title}>Mobile phones</p>
                <p className={categories.category__amount}>
                  {phonesAmount} models
                </p>
              </div>
            </Link>
            <Link
              to={'/tablets'}
              className={cn(
                categories.Categories__category,
                categories.category,
              )}
            >
              <img
                src="\img\home\tablets-category.png"
                alt="tablets"
                className={cn(
                  categories.category__img,
                  categories['category__img--tablets'],
                )}
              />
              <div className={categories.category__details}>
                <p className={categories.category__title}>Tablets</p>
                <p className={categories.category__amount}>
                  {tabletssAmount} models
                </p>
              </div>
            </Link>
            <Link
              to={'/accessories'}
              className={cn(
                categories.Categories__category,
                categories.category,
              )}
            >
              <img
                src="\img\home\accessories-category.png"
                alt="accessories"
                className={cn(
                  categories.category__img,
                  categories['category__img--accessories'],
                )}
              />
              <div className={categories.category__details}>
                <p className={categories.category__title}>Accessories</p>
                <p className={categories.category__amount}>
                  {accessoriesAmount} models
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
