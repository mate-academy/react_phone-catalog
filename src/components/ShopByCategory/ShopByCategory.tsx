import { Link } from 'react-router-dom';
import { CategoryTypes, PathType } from '../../types/Types';
import { useCategoruCount } from '../../hook/useCategoryCount';
import style from './ShopByCategouy.module.scss';
import classNames from 'classnames';

type Category = {
  src: string;
  title: string;
  link: string;
  count: number;
  type: 'phones' | 'tablets' | 'accessories';
  alt: string;
};

export const ShopByCategory = () => {
  const count = useCategoruCount();
  const categories: Category[] = [
    {
      src: 'img/category-phones.webp',
      title: 'Mobile phones',
      link: PathType.PHONES,
      count: count[CategoryTypes.PHONES],
      type: CategoryTypes.PHONES,
      alt: 'mobile phones category',
    },
    {
      src: 'img/category-tablets.webp',
      title: 'Tablets',
      link: PathType.TABLETS,
      count: count[CategoryTypes.TABLETS],
      type: CategoryTypes.TABLETS,
      alt: 'tablets category',
    },
    {
      src: 'img/category-accessories.webp',
      title: 'Accessories',
      link: PathType.ACCESSORIES,
      count: count[CategoryTypes.ACCESSORIES],
      type: CategoryTypes.ACCESSORIES,
      alt: 'accessories category',
    },
  ];

  return (
    <section className={style.shopByCategory}>
      <h2 className={style.shopByCategory__title}>Shop by category</h2>
      <ul className={style.shopByCategory__list}>
        {categories.map((category: Category) => (
          <li key={category.type} className={style.shopByCategory__listItem}>
            <Link
              to={category.link}
              className={classNames(
                style.shopByCategory__link,
                style[`shopByCategory__link--${category.type}`],
              )}
            >
              <img
                className={style.shopByCategory__img}
                src={category.src}
                alt={category.alt}
              />
            </Link>
            <h4 className={style.shopByCategory__categoryTitle}>
              {category.title}
            </h4>
            <span className={style.shopByCategory__count}>
              {count[category.type]} models
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};
