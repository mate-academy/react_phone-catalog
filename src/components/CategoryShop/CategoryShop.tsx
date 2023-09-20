import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import classNames from 'classnames';
import categoryApi from '../../utils/categoryApi';
import { Category, Devices } from '../../types/Category';
import { Titles } from '../../types/Titles';

type Prorps = {
  phonesLengt: number;
  tabletsLengt?: number;
  accessoriesLength?: number;
};

export const CategoryShop: React.FC<Prorps> = ({
  phonesLengt = 0,
  tabletsLengt = 0,
  accessoriesLength = 0,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategories(categoryApi);
  }, []);

  const getCategoryLength = (category: string) => {
    switch (category) {
      case Devices.MP:
        return phonesLengt;
      case Devices.TAB:
        return tabletsLengt;
      case Devices.ACC:
        return accessoriesLength;
      default:
        return 0;
    }
  };

  return (
    <section className="category">
      <h1 className="category__title">
        {Titles.CATEGORY}
      </h1>
      <div className="category__content">
        {categories.map(({ category, path, imgSrc }) => (
          <Link to={path} key={category}>
            <figure
              className={classNames('category__element', {
                'category__element--phone': category === Devices.MP,
                'category__element--tablet': category === Devices.TAB,
                'category__element--accesories': category === Devices.ACC,
              })}
            >
              <img
                className={classNames('category__img', {
                  'category__img--phone': category === Devices.MP,
                  'category__img--tablet': category === Devices.TAB,
                  'category__img--accesories': category === Devices.ACC,
                })}
                src={imgSrc}
                alt={category}
              />
            </figure>
            <p className="category__type">{category}</p>
            <p className="category__length">
              {`${getCategoryLength(category)} models`}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};
