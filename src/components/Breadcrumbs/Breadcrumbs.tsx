import { Link, useParams } from "react-router-dom"
import { phones, tablets, accessories, ItemCard } from "../../constants/common";

export const Breadcrumbs = () => {
  const { category, product } = useParams();
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


  return (
      <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={'/'} className="breadcrumbs__link">
                  <img src="/img/icons/home.svg" alt="home" />
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={`../${category}`} className="breadcrumbs__link">
                  {' '}
                  {category
                    ? category.charAt(0).toUpperCase() + category.slice(1)
                    : ''}
                </Link>
              </li>
              {currentProduct && (
                <li className="breadcrumbs__item">
                  <Link to="" className="breadcrumbs__link">
                    {currentProduct.name}
                  </Link>
                </li>
              )}
            </ul>
          </nav>
  )}
