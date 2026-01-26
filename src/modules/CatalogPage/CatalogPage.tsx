/* eslint-disable max-len */
/* eslint-disable no-console */
import { useContext, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { CategoriesContext } from '../../Context/CategoriesContext';
import { ProductsContext } from '../../Context/ProductsContext';
import { ProductCard } from '../../components/ProductCard';
import { Pagination } from '../../components/Pagination';
import classNames from 'classnames';
import { Breadcrumb } from '../../components/Breadcrumb';

export const CatalogPage = () => {
  const { pathname } = useLocation();
  const categories = useContext(CategoriesContext);
  const { products } = useContext(ProductsContext);
  const [isActive, setIsActive] = useState(false);

  const [searchParams] = useSearchParams();
  const page = +(searchParams.get('page') || 1) - 1;

  const pageTitle =
    categories.find(
      category => category.name.toLowerCase() === pathname.slice(1),
    )?.longName || 'Catalog';

  const catalogProds = products.filter(item => {
    return item.category === pathname.slice(1);
  });

  const prodsPerPage = 8;
  const pages = Math.ceil(catalogProds.length / prodsPerPage);

  return (
    <div className="container">
      <Breadcrumb />

      <h1 className="title">{pageTitle}</h1>
      <p>
        {catalogProds.length} item{catalogProds.length === 1 ? '' : 's'}
      </p>
      <div className="is-flex">
        <div className="dropdown">
          <p>Sort by</p>
          <div
            className={classNames('dropdown-trigger', {
              'is-active': isActive,
            })}
          >
            <button
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu3"
              onClick={() => setIsActive(true)}
            >
              <span>Click me</span>
              {/* <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span> */}
            </button>
          </div>
          <div
            className={classNames('dropdown-menu', {
              'is-block': isActive,
            })}
            id="dropdown-menu3"
            role="menu"
          >
            <div className="dropdown-content">
              <a href="#" className="dropdown-item">
                {' '}
                Overview{' '}
              </a>
              <a href="#" className="dropdown-item">
                {' '}
                Modifiers{' '}
              </a>
              <a href="#" className="dropdown-item">
                {' '}
                Grid{' '}
              </a>
            </div>
          </div>
        </div>
        <p>Items on page</p>
      </div>

      <div className="fixed-grid has-4-cols">
        <div className="grid">
          {catalogProds
            .slice(page * prodsPerPage, page * prodsPerPage + prodsPerPage)
            .map(item => (
              <div className="cell" key={item.id}>
                <ProductCard product={item} />
              </div>
            ))}
        </div>
      </div>
      <Pagination pages={pages} type={'full'} />
    </div>
  );
};
