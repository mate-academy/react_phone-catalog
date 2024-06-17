import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import './ProductPage.scss';
import { ProductType } from '../../types/ProductType';
import { PhoneCard } from '../Home page/components/PhoneCard/PhoneCard';
import classNames from 'classnames';
import { Pagination } from './components/Pagination/Pagination';

export const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { productType } = useParams<{ productType: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy: string[] = ['Newest', 'Alphabetically', 'Cheapest'];
  const itemsPerPageOptions = ['4', '8', '16', 'all'];

  const [itemsPerPage, setItemsPerPage] = useState<string>(
    searchParams.get('perPage') || itemsPerPageOptions[2],
  );
  const [selectedSort, setSelectedSort] = useState<string>(
    searchParams.get('sort') || sortBy[0],
  );
  const [isDropdownSortOpen, setIsDropdownSortOpen] = useState<boolean>(false);
  const [isDropdownPerOpen, setIsDropdownPerOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(
    +(searchParams.get('page') || '1'),
  );
  const dropdownSortRef = useRef<HTMLDivElement>(null);
  const dropdownPerRef = useRef<HTMLDivElement>(null);

  const firstIndex: number = (currentPage - 1) * +itemsPerPage;
  const lastIndex: number = Math.min(
    currentPage * +itemsPerPage, products.length
  );
  const numbers: ProductType[] = itemsPerPage === 'all' ? products : products.slice(firstIndex, lastIndex);
  let headerTitle = '';

  const title = () => {
    switch (productType) {
      case 'phones':
        headerTitle = 'Mobile phones';
        break;
      case 'tablets':
        headerTitle = 'Tablets';
        break;
      case 'accessories':
        headerTitle = 'Accessories';
        break;
      default:
        headerTitle = 'Products';
    }
  };
  title();

  useEffect(() => {
    const storedProducts = localStorage.getItem(`${productType}`);
    if (storedProducts) {
      const response = JSON.parse(storedProducts) as ProductType[];

      if (selectedSort === 'Alphabetically') {
        response.sort((a, b) => a.name.localeCompare(b.name));
      } else if (selectedSort === 'Cheapest') {
        response.sort((a, b) => a.price - b.price);
      } else {
        response.sort((a, b) => b.year - a.year);
      }
      setProducts(response);
    }
  }, [productType, selectedSort]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownSortRef.current &&
        !dropdownSortRef.current.contains(event.target as Node)
      ) {
        setIsDropdownSortOpen(false);
      }
      if (
        dropdownPerRef.current &&
        !dropdownPerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownPerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSearchParams({
      page: currentPage.toString(),
      perPage: itemsPerPage,
      sort: selectedSort
    });
  }, [currentPage, itemsPerPage, selectedSort, setSearchParams]);

  const handleSortSelection = (sortCriteria: string) => {
    setSelectedSort(sortCriteria);
    setIsDropdownSortOpen(false);
    setIsDropdownPerOpen(false);
  };

  const handlePerPageSelection = (perPage: string) => {
    setItemsPerPage(perPage);
    setCurrentPage(1); // Reset to first page when items per page change
    setIsDropdownPerOpen(false);
    setIsDropdownSortOpen(false);
  };

  return (
    <section className="product container">
      <div className="product__history">
        <Link to="/" className="product__link">
          <img src="../../../img/links/home.svg" alt="home" />
        </Link>
        <img
          src="../../../img/links/chevron (arrow right).svg"
          alt="chevron_right"
        />
        <Link to={`/product/${productType}`} className="product__link">
          {productType
            ? productType.charAt(0).toUpperCase() + productType.slice(1)
            : 'Products'}
        </Link>
      </div>

      <h1 className="product__title">{headerTitle}</h1>
      <p className="product__description">{products.length} models</p>

      <div className="product__filter">
        <aside className="product__filter--sort-by" ref={dropdownSortRef}>
          <p className="product__filter--text">Sort by</p>
          <div className="product__dropdown-trigger">
            <button
              type="button"
              className="product__dropdown-button"
              aria-haspopup="true"
              aria-controls="product__dropdown-button"
              onClick={() => setIsDropdownSortOpen(!isDropdownSortOpen)}
            >
              <span>{selectedSort}</span>
              <img
                src={`../../../img/links/${isDropdownSortOpen ? 'chevron (arrow up).svg' : 'chevron (arrow down).svg'}`}
                alt="chevron"
              />
            </button>
          </div>

          {isDropdownSortOpen && (
            <div className="product__dropdown-menu" id="dropdown-menu" role="menu">
              <div className="product__dropdown-content">
                {sortBy.map((criteria, index) => (
                  <a
                    key={index}
                    className={classNames('product__dropdown-item', {
                      'is-active': selectedSort === criteria,
                    })}
                    onClick={() => handleSortSelection(criteria)}
                  >
                    {criteria}
                  </a>
                ))}
              </div>
            </div>
          )}
        </aside>
        <aside className="product__filter--per-page" ref={dropdownPerRef}>
          <p className="product__filter--text">Items on page</p>
          <div className="product__dropdown-trigger">
            <button
              type="button"
              className="product__dropdown-button"
              aria-haspopup="true"
              aria-controls="product__dropdown-button"
              onClick={() => setIsDropdownPerOpen(!isDropdownPerOpen)}
            >
              <span>{itemsPerPage}</span>
              <img
                src={`../../../img/links/${isDropdownPerOpen ? 'chevron (arrow up).svg' : 'chevron (arrow down).svg'}`}
                alt="chevron"
              />
            </button>
          </div>

          {isDropdownPerOpen && (
            <div className="product__dropdown-menu" id="dropdown-menu" role="menu">
              <div className="product__dropdown-content">
                {itemsPerPageOptions.map((perPage, index) => (
                  <a
                    key={index}
                    className={classNames('product__dropdown-item', {
                      'is-active': itemsPerPage === perPage,
                    })}
                    onClick={() => handlePerPageSelection(perPage)}
                  >
                    {perPage}
                    <br />
                  </a>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      <div className="product__all">
        {numbers.map(product => (
          <PhoneCard key={product.id} product={product} />
        ))}
      </div>

      {itemsPerPage !== 'all' && (
        <Pagination
          total={products.length}
          perPage={+itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
};
