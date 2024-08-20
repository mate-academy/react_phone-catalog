import { useContext } from 'react';
import './ShopByCategory.scss';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../Context/Context';

const categories = [
  {
    name: 'Mobile phones',
    src: 'img/Phones.jpg',
    linkTo: '/phones',
  },
  { name: 'Tablets', src: 'img/Tablets.jpg', linkTo: '/tablets' },
  {
    name: 'Accessories',
    src: 'img/Accessories.jpg',
    linkTo: '/accessories',
  },
];

export const ShopByCategory = () => {
  const { products } = useContext(GlobalContext);

  return (
    <div className="shop">
      <div className="shop__content">
        <h2 className="shop__title title--h2">Shop by category</h2>
        <div className="shop__categories" data-cy="categoryLinksContainer">
          {categories.map(({ name, src, linkTo }) => (
            <Link to={linkTo} className="shop__category" key={linkTo}>
              <div className="shop__category-img-box">
                <img src={src} alt={name} className="shop__category-img" />
              </div>
              <h3 className="shop__category-title">{name}</h3>
              <span className="shop__category-count">
                {`${products.filter(item => item.category === linkTo.slice(1)).length} models`}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
