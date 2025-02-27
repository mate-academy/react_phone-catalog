import { Link } from 'react-router-dom';
import { useGlobalState } from '../../hooks/hooks';

import './ShopByCategory.scss';

export const ShopByCategory = () => {
  const { categories } = useGlobalState();

  return (
    <section className="shop">
      <h2 className="shop__title">Shop by category</h2>
      <div className="shop__container">
        {categories.map(category => (
          <Link
            to={`/${category.name}`}
            className="shop__link"
            key={category.name}
          >
            <img
              src={category.image}
              alt={`${category.name} picture`}
              className="shop__image"
            />
            <h3 className="shop__subtitle">{category.title}</h3>
            <p className="shop__text">{`${category.productsCount} models`}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
