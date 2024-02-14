import { Link } from 'react-router-dom';
import { useAppSelector } from '../../helpers/hooks/hooks';
import './ShopByCategory.scss';
import { getCategorySize } from '../../helpers/funcService/getCategorySize';

type Category = {
  name: 'phones' | 'tablets' | 'accessories',
  title: 'Mobile phones' | 'Tablets' | 'Accessories',
  path: '_new/img/category-phones.png'
  | '_new/img/category-accessories.png'
  | '_new/img/category-tablets.png',
  size: number,
};

export const ShopByCategory = () => {
  const { products } = useAppSelector(state => state.products);

  const categories: Category[] = [
    {
      name: 'phones',
      title: 'Mobile phones',
      path: '_new/img/category-phones.png',
      size: getCategorySize('phones', products),
    },
    {
      name: 'tablets',
      title: 'Tablets',
      path: '_new/img/category-tablets.png',
      size: getCategorySize('tablets', products),
    },
    {
      name: 'accessories',
      title: 'Accessories',
      path: '_new/img/category-accessories.png',
      size: getCategorySize('accessories', products),
    },
  ];

  return (
    <section className="shopByCategory">
      <h2 className="shopByCategory__title">Shop by category</h2>
      <div
        className="shopByCategory__categories"
        data-cy="categoryLinksContainer"
      >
        {categories.map(category => (
          <div key={category.name} className="categoryBox">
            <Link to={category.name}>
              <div className={`categoryBox__wrapper categoryBox__wrapper--${category.name}`}>
                <img
                  src={category.path}
                  alt={`${category.name} category`}
                  className={`categoryBox__image categoryBox__image--${category.name}`}
                />
              </div>
            </Link>
            <h3 className="categoryBox__title">{category.title}</h3>
            <p className="categoryBox__text">{`${category.size} models`}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
