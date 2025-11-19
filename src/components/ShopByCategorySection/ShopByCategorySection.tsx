import { Link } from 'react-router-dom';
import style from './ShopByCategorySection.module.scss';

type Props = {
  title: string;
  totalPhoneModels: number;
  totalTabletsModels: number;
  totalAccessoriesModels: number;
};

export const ShopByCategorySection: React.FC<Props> = ({
  title,
  totalPhoneModels,
  totalTabletsModels,
  totalAccessoriesModels,
}) => {
  const categories = [
    {
      name: 'phones',
      title: 'Mobile phones',
      count: totalPhoneModels,
      image: 'public/img/category-phones.webp',
      bgClass: 'bg-phone',
    },
    {
      name: 'tablets',
      title: 'Tablets',
      count: totalTabletsModels,
      image: 'public/img/category-tablets.webp',
      bgClass: 'bg-tablets',
    },
    {
      name: 'accessories',
      title: 'Accessories',
      count: totalAccessoriesModels,
      image: 'public/img/category-accessories.webp',
      bgClass: 'bg-accessories',
    },
  ];

  return (
    <div className={style.categoryBlock}>
      <h2 className={style.categoryTitle}>{title}</h2>

      <div className={style.section}>
        {categories.map(category => (
          <div className={style.container} key={category.name}>
            <Link
              to={`/${category.name}`}
              className={`${style.categoryLink} ${style[category.bgClass]}`}
            >
              <img
                className={style.img}
                src={category.image}
                alt={`category ${category.name}`}
              />
            </Link>

            <div className={style.titleCategory}>
              <h4>{category.title}</h4>

              <p className={style.titleCount}>{category.count} models</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
