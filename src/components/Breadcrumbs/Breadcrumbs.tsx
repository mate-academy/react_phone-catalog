import { Link, useLocation, useParams } from 'react-router-dom';
import { phones, tablets, accessories, ItemCard } from '../../constants/common';

export const Breadcrumbs = () => {
  const { category, product } = useParams();
  const location = useLocation();

  let products: ItemCard[] = [];

  if (category === 'phones') {
    products = phones;
  }

  if (category === 'tablets') {
    products = tablets;
  }

  if (category === 'accessories') {
    products = accessories;
  }

  const currentProduct = products.find(item => item.id === product);
  const pathSegment = location.pathname.split('/').pop();

  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/" className="breadcrumbs__link">
            <img src="./img/icons/home.svg" alt="home" />
          </Link>
        </li>

        {category && (
          <li
            className="breadcrumbs__item"
            style={{ color: category && product ? 'black' : 'grey' }}
          >
            <Link to={`/${category}`} className="breadcrumbs__link">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          </li>
        )}

        {currentProduct && (
          <li className="breadcrumbs__item">
            <span className="breadcrumbs__link">{currentProduct.name}</span>
          </li>
        )}

        {!category && !currentProduct && pathSegment && (
          <li className="breadcrumbs__item">
            <span className="breadcrumbs__link">
              {pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1)}
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
};
