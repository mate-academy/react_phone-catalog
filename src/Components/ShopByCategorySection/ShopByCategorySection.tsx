import { Link } from 'react-router-dom';
import './shopByCategorySection.scss';

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
      image: 'img/category-phones.webp',
      bgClass: 'bg-phone',
    },
    {
      name: 'tablets',
      title: 'Tablets',
      count: totalTabletsModels,
      image: 'img/category-tablets.png',
      bgClass: 'bg-tablets',
    },
    {
      name: 'accessories',
      title: 'Accessories',
      count: totalAccessoriesModels,
      image: 'img/category-accessories.png',
      bgClass: 'bg-accessories',
    },
  ];

  return (
    <div className="category-block">
      <h2 className="title">{title}</h2>

      <div className="section-link-block">
        {categories.map(category => (
          <div className="link-container" key={category.name}>
            <Link
              to={`/${category.name}`}
              className={`category-link ${category.bgClass}`}
            >
              <img
                className="category-link-img img"
                src={category.image}
                alt={`category ${category.name}`}
              />
            </Link>

            <div className="category-properties">
              <h4 className="category-title">{category.title}</h4>

              <p className="main-body-text-14">{category.count} models</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
