import { Link } from 'react-router-dom';
import { categories } from '../../helpers/data/categories';
import { Product } from '../../types/Product';

type Props = {
  products: Product[];
};

export const Category:React.FC<Props> = ({ products }) => {
  categories[0].count = products.filter(p => p.type === 'phone').length;
  categories[1].count = products.filter(p => p.type === 'tablet').length;
  categories[2].count = products.filter(p => p.type === 'accessory').length;

  return (
    <section className="category">
      <h1 className="category__title"> Shop by category </h1>

      <div
        className="category__content"
        data-cy="categoryLinksContainer"
      >
        {categories.map(category => (
          <div
            key={category.type}
          >
            <div
              className="category__content__img"
              style={{ backgroundColor: category.background }}
            >
              <Link to={`/${category.type}`}>
                <img
                  className="category__content__img__item"
                  src={category.url}
                  alt={category.type}
                />
              </Link>
            </div>

            <div className="category__content__name">
              <Link
                to={`/${category.type}`}
                className="category__content__name__item"
              >
                {category.type === 'phones' ? `mobile ${category.type}` : category.type}
              </Link>
            </div>

            <p className="category__content__count">
              {`${category.count} models`}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
};
