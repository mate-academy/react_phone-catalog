import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-regular-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { ProductsContext } from '../../Context/ProductsContext';
import { CategoriesContext } from '../../Context';

export const Breadcrumb = () => {
  const { products } = useContext(ProductsContext);
  const categories = useContext(CategoriesContext);
  const { pathname } = useLocation();
  const { itemId } = useParams();
  const navigate = useNavigate();

  let pathToNameCategory = '';

  function capitalizeFirstLetterRegex(str: string) {
    return str.replace(/^./, match => match.toUpperCase());
  }

  const pathToCategory =
    categories.find(
      category => category.name.toLowerCase() === pathname.slice(1),
    )?.name || capitalizeFirstLetterRegex(pathname.slice(1));

  const product = products.find(item => item.itemId === itemId);

  if (!product) {
    pathToNameCategory = pathToCategory;
  } else {
    pathToNameCategory =
      categories.find(
        category => category.name.toLowerCase() === product.category,
      )?.name || 'Catalog';
  }

  return (
    <>
      <nav
        className="breadcrumb has-succeeds-separator"
        aria-label="breadcrumbs"
      >
        <ul>
          <li>
            <Link to="/">
              <span className="icon">
                <FontAwesomeIcon icon={faHouse} />
              </span>
            </Link>
          </li>
          <li>
            <Link to={`/${pathToNameCategory.toLowerCase()}`}>
              {pathToNameCategory}
            </Link>
          </li>

          {product && (
            <li>
              <a href="#">{product.name}</a>
            </li>
          )}
        </ul>
      </nav>
      {(product || pathname.slice(1) === 'cart') && (
        <nav
          className="breadcrumb has-succeeds-separator is-flex"
          aria-label="breadcrumbs"
        >
          <a onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faAngleLeft} />
            Back
          </a>
        </nav>
      )}
    </>
  );
};
