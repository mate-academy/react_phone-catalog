import { FC, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../../../context/GlobalContext';
import './ShopByCategory.scss';
import { CategoryData } from './types/types';

export const ShopByCategory: FC = () => {
  const { allProducts } = useContext(GlobalContext);

  const categoryCounts = useMemo(() => {
    return allProducts.reduce(
      (acc, product) => ({
        ...acc,
        [product.category]: (acc[product.category] || 0) + 1,
      }),
      {} as Record<string, number>,
    );
  }, [allProducts]);

  const categories: CategoryData[] = [
    {
      path: '/phones',
      image: 'img/Category for phones.png',
      title: 'Mobile phones',
      alt: 'Category Phones',
      count: categoryCounts.phones || 0,
    },
    {
      path: '/tablets',
      image: 'img/Category for tablets.png',
      title: 'Tablets',
      alt: 'Category Tablets',
      count: categoryCounts.tablets || 0,
    },
    {
      path: '/accessories',
      image: 'img/Category for accessories.png',
      title: 'Accessories',
      alt: 'Category Accessories',
      count: categoryCounts.accessories || 0,
    },
  ];

  return (
    <div className="shopByCategory">
      <div className="shopByCategory__container">
        <h2 className="shopByCategory__title">Shop by category</h2>

        <div className="shopByCategory__content">
          {categories.map(({ path, image, title, alt, count }) => (
            <Link key={path} to={path} className="shopByCategory__link">
              <section className="shopByCategory__block">
                <div className="shopByCategory__block-image">
                  <img src={image} alt={alt} />
                </div>

                <h4 className="shopByCategory__block-title">{title}</h4>

                <span className="shopByCategory__block-description">
                  {count} models
                </span>
              </section>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
