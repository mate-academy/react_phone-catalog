import { useLocation } from 'react-router-dom';
import Product from '../../types/product';
import './CatalogPage.scss';
import { useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';

interface Props {
  products: Product[] | undefined;
}

export const CatalogPage = ({ products }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(16);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = products?.slice(firstIndex, lastIndex);

  const productLength = products?.length ? products?.length : 0;

  const totalPages = Math.ceil(productLength / itemsPerPage);

  const location = useLocation();
  let name = location.pathname.slice(1);

  name = name[0].toUpperCase() + name.slice(1);

  return (
    <div className="catalog-page__container">
      <div className="catalog-page__path">
        <div className="catalog-page__path-home"></div>
        <div className="catalog-page__path-arrow">&gt;</div>
        <p className="catalog-page__path-name">{name}</p>
      </div>

      <h1 className="catalog-page__title">{name}</h1>
      <p className="catalog-page__subtext">{products?.length} models</p>

      <div className="catalog-page__params">
        <div className="catalog-page__params-container">
          <p className="catalog-page__params-text">Sort by</p>
          <select className="catalog-page__params-select">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="expensive">From cheap to expensive</option>
            <option value="cheap">From expensive to cheap</option>
          </select>
        </div>
        <div className="catalog-page__params-container">
          <p className="catalog-page__params-text">Items on page</p>
          <select
            className="catalog-page__params-select"
            value={itemsPerPage}
            onChange={event => setItemPerPage(+event.target.value)}
          >
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="32">32</option>
            <option value="64">64</option>
          </select>
        </div>
      </div>

      <div className="catalog-page__cards">
        {currentItems?.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

      <div className="pagination">
        <div>
          <div className="pagination__buttons">
            <button
              className="pagination__button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;

              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`pagination__button
                    ${currentPage === pageNumber ? 'pagination__button--active' : ''}`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              className="pagination__button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
