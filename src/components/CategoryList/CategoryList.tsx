import { CategoryCard } from '../CategoryCard';
import { useFetch } from '../../hooks/useFetch';
import { Fetch } from '../../enum/Fetch';
import './CategoryList.scss';

const CATEGORY = [
  {
    img: '/_new/img/shopByCategory/phonesCategory.jpg',
    title: 'Mobile phones',
    to: '/phones',
  },
  {
    img: '/_new/img/shopByCategory/tabletsCategory.jpg',
    title: 'Tablets',
    to: '/tablets',
  },
  {
    img: '/_new/img/shopByCategory/AccessoriesCategory.jpg',
    title: 'Accessories',
    to: '/accessories',
  },
];

export const ShopByCategory = () => {
  const [phones] = useFetch(Fetch.hotProducts);

  return (
    <div className="page__section" data-cy="categoryLinksContainer">
      <div className="page__section__header">
        <h1
          className="page__section__title"
        >
          Shop by category
        </h1>
      </div>

      <div className="category">
        {CATEGORY.map(category => (
          <CategoryCard
            key={category.to}
            img={category.img}
            title={category.title}
            to={category.to}
            qnty={phones.length}
          />
        ))}
      </div>
    </div>
  );
};
