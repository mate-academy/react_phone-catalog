import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-regular-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { ProductsContext } from '../../Context/ProductsContext';
import { CategoriesContext } from '../../Context';
import { useContextSelector } from 'use-context-selector';

import s from './Breadcrumb.module.scss';
import classNames from 'classnames';

export const Breadcrumb = () => {
  const products = useContextSelector(ProductsContext, ctx => ctx.products);

  const categories = useContext(CategoriesContext);
  const { pathname } = useLocation();
  const { itemId } = useParams();
  const navigate = useNavigate();

  let pathToNameCategory = '';

  function capitalizeFirstLetterRegex(str: string) {
    return str.replace(/^./, match => match.toUpperCase());
  }

  const pathToCategory =
    categories.find(category => category.slug === pathname.slice(1))?.name ||
    capitalizeFirstLetterRegex(pathname.slice(1));

  const product = products.find(item => item.itemId === itemId);

  if (!product) {
    pathToNameCategory = pathToCategory;
  } else {
    pathToNameCategory =
      categories.find(category => category.slug === product.category)?.name ||
      'Catalog';
  }

  return (
    <>
      {pathname.slice(1) !== 'cart' && (
        <nav
          className={`breadcrumb has-succeeds-separator ${s.breadcrumb_style}`}
          aria-label="breadcrumbs"
        >
          <ul className="is-flex-wrap-nowrap">
            <li>
              <Link to="/">
                <span className="icon mx-0">
                  <FontAwesomeIcon
                    icon={faHouse}
                    style={{ color: '#0F0F11', width: '16px', height: '16px' }}
                  />
                </span>
              </Link>
            </li>
            <li
              className={classNames({
                [`is-active ${s.active}`]: !product,
              })}
            >
              <Link to={`/${pathToNameCategory.toLowerCase()}`}>
                {pathToNameCategory}
              </Link>
            </li>

            {product && (
              <li className={`is-active ${s.active}`}>
                <a href="#" aria-current="page">
                  {product.name}
                </a>
              </li>
            )}
          </ul>
        </nav>
      )}
      {(product || pathname.slice(1) === 'cart') && (
        <nav
          className={`breadcrumb is-flex mb-4 ${s.breadcrumb_style__back}`}
          aria-label="breadcrumbs"
        >
          <a className={`${s.back}`} onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faAngleLeft} style={{ color: '#0F0F11' }} />
            Back
          </a>
        </nav>
      )}
    </>
  );
};
