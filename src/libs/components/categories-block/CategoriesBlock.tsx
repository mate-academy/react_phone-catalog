import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './styles.scss';

import { ProductsCountsType } from '../../types';
import { categories } from './libs';

type Props = {
  productsCount: ProductsCountsType,
  title: string,
  className?: string,
};

export const CategoriesBlock: React.FC<Props> = ({
  productsCount,
  className,
  title,
}) => {
  return (
    <section
      className={classNames(className, 'categories-block')}
      data-cy="categoryLinksContainer"
    >
      <div className="categories-block__top">
        <h1>{title}</h1>
      </div>
      <div className="categories-block__list">
        {categories.map(({
          category,
          title: categoryTitle,
          image,
          link,
        }) => (
          <div
            key={categoryTitle}
            className="categories-block__item"
          >
            <Link
              to={link}
              className={classNames(
                'categories-block__image-link',
                `categories-block__image-link--${category}`,
              )}
            >
              <img
                src={image}
                alt={categoryTitle}
                className="categories-block__image"
              />
            </Link>

            <Link
              to={link}
              className="categories-block__title-link"
            >
              {categoryTitle}
            </Link>

            <div className="categories-block__qty">
              {productsCount[category]}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
