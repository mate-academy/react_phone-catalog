import './CategoryList.scss';
import { useFetch } from '../../hooks/useFetch';
import { Fetch } from '../../enum/Fetch';
import { CategoryCard } from '../CategoryCard';
import phonesImg from '../../images/shopByCategory/phonesCategory.jpg';
import tabletsImg from '../../images/shopByCategory/tabletsCategory.jpg';
// eslint-disable-next-line max-len
import accessoriesImg from '../../images/shopByCategory/AccessoriesCategory.jpg';

const CATEGORY = [
  {
    img: phonesImg,
    title: 'Mobile phones',
    to: '/phones',
  },
  {
    img: tabletsImg,
    title: 'Tablets',
    to: '/tablets',
  },
  {
    img: accessoriesImg,
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
