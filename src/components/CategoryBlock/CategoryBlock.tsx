import { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

import './CategoryBlock.scss';

const categoryLinks = [
  {
    name: 'Mobile phones',
    path: '/phones',
    img: 'img/category-phones.png',
    type: 'phone',
  },
  {
    name: 'Tablets',
    path: '/tablets',
    img: 'img/category-tablets.png',
    type: 'tablet',
  },
  {
    name: 'Accessories',
    path: '/accessories',
    img: 'img/category-accessories.png',
    type: 'accessory',
  },
];

export const CategoryBlock: FC = () => {
  const { products } = useAppSelector(store => store.products);

  const getProductsLength = useCallback((category: string) => {
    return products.filter(product => product.type === category).length;
  }, [products]);

  return (
    <section className="category">
      <div className="shop-by-category">
        <h1 className="shop-by-category__title">Shop by category</h1>
        <div
          className="shop-by-category__links-container"
          data-cy="categoryLinksContainer"
        >
          {categoryLinks.map(({
            name, path, img, type,
          }) => (
            <div
              key={name}
              className="shop-by-category__card"
            >
              <Link
                to={path}
                className="shop-by-category__link"
              >
                <div
                  className={`shop-by-category__img-container
                    shop-by-category__img-container--${path.slice(1)}`}
                >
                  <img
                    src={img}
                    alt={name}
                    className={`shop-by-category__img
                      shop-by-category__img-${path.slice(1)}`}
                  />
                </div>
                <h3 className="shop-by-category__name">{name}</h3>
              </Link>
              <p className="shop-by-category__quantity">
                {`${getProductsLength(type)} models`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
