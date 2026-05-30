import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import categoryAccessories from '../../../public/img/category-accessories.png';
import categoryPhones from '../../../public/img/category-phones.webp';
import categoryTablets from '../../../public/img/category-tablets.png';

import './ShopByCategory.scss';

interface CategoryItem {
  name: string;
  image: string;
  path: string;
  key: string;
}

const categories: CategoryItem[] = [
  {
    name: 'Mobile Phones',
    image: categoryPhones,
    path: '/phones',
    key: 'phones',
  },
  { name: 'Tablets', image: categoryTablets, path: '/tablets', key: 'tablets' },
  {
    name: 'Accessories',
    image: categoryAccessories,
    path: '/accessories',
    key: 'accessories',
  },
];

export const ShopByCategory: React.FC = () => {
  const { allProducts } = useGlobalContext();

  const getModelsCount = (categoryKey: string) => {
    return allProducts.filter(product => product.category === categoryKey)
      .length;
  };

  return (
    <section className="categories">
      <h2 className="categories__title">Shop by category</h2>

      <div className="categories__block">
        {categories.map(category => (
          <Link
            to={category.path}
            key={category.name}
            className="categories__category"
          >
            <div
              className={`categories__image-container categories__image-container--${category.key}`}
            >
              <img
                src={category.image}
                alt={category.name}
                className={`categories__image categories__image--${category.key}`}
              />
            </div>
            <span className="categories__name">{category.name}</span>
            <span className="categories__available">
              {getModelsCount(category.key)} models
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
