import { Accessories } from '../../types/Accessories';
import { Phone } from '../../types/Phone';
import s from './categoryLink.module.scss';
import phonePhoto from './categoryImg/Phone.svg';
import tabletPhoto from './categoryImg/Tablet.svg';
import accessoriesPhoto from './categoryImg/Accessories.svg';
import { Link } from 'react-router-dom';

interface CategoryLinkProps {
  data: {
    phones: Phone[];
    tablets: Phone[];
    accessories: Accessories[];
  };
}

interface Category {
  title: string;
  key: keyof CategoryLinkProps['data'];
  img: string;
  to: string;
}

export const CategoryLink: React.FC<CategoryLinkProps> = ({ data }) => {
  const categories: Category[] = [
    {
      title: 'Mobile phones',
      key: 'phones',
      img: phonePhoto,
      to: '/phones',
    },
    {
      title: 'Tablets',
      key: 'tablets',
      img: tabletPhoto,
      to: '/tablets',
    },
    {
      title: 'Accessories',
      key: 'accessories',
      img: accessoriesPhoto,
      to: '/accessories',
    },
  ];

  return (
    <section className={s.section}>
      <h2 className={s.section__title}>Shop by category</h2>
      <div className={s.section__flex}>
        {categories.map(cat => (
          <>
            <div className={s.section__flexContainer}>
              <Link
                to={cat.to}
                key={cat.key}
                className={`${s.section__link} ${
                  cat.key === 'tablets'
                    ? s['section__link--tablets']
                    : cat.key === 'accessories'
                      ? s['section__link--accessories']
                      : ''
                }`}
              >
                <img
                  src={cat.img}
                  alt={cat.title}
                  className={`${s.section__img} ${
                    cat.key === 'tablets'
                      ? s['section__img--tablets']
                      : cat.key === 'accessories'
                        ? s['section__img--accessories']
                        : ''
                  }`}
                />
              </Link>
              <div className={s.section__text}>
                <Link to={cat.to} className={s.section__name}>
                  {cat.title}
                </Link>
                <Link to={cat.to} className={s.section__count}>
                  {data[cat.key].length} models
                </Link>
              </div>
            </div>
          </>
        ))}
      </div>
    </section>
  );
};
