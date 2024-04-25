import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination/Pagination';
import { SortByItem } from '../../helpers/sortBy';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import './PhonePage.scss';
import Home from '../../images/Home.svg';
import Vec_light_right from '../../images/homePage/Vec_light_right.svg';
import React from 'react';
import { Product } from '../../types/product';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { CatalogContext } from '../CatalogContext';

export const PhonePage = () => {
  const { categories, setError } = useContext(CatalogContext);

  const BASE_URL = 'https://hanna-balabukha.github.io/react_phone-catalog/api/';

  const phoneUrl = BASE_URL + 'phones.json';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(phoneUrl);

        if (!response.ok) {
          throw new Error('Error');
        }

        const data = await response.json();

        categories[0].items = data;
      } catch (er) {
        setError('There are no products yet');
      }
    };

    fetchData();
  }, [phoneUrl]);

  console.log(categories)

  const [sortBy, setSortBy] = useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  const phoneItems = categories[0].items;
  
  if (phoneItems === undefined) {
    return <NotFoundPage />;
  }

  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = searchParams.get('page') || '1';
  const itemsPerPage = perPage === 'all' ? phoneItems.length : perPage;
  const firstItemIndex = (+currentPage - 1) * +itemsPerPage;
  const lastItemIndex = Math.min(+currentPage * +itemsPerPage, phoneItems.length);

  const toBeSortedBy = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const handlePerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      page: currentPage,
      perPage: event.target.value,
    });
  };

  function filteredProducts(items: Product[]) {
    switch (sortBy) {
      case SortByItem.Age:
        return items?.sort((a, b) => (a.year - b.year ? 1 : -1));
      case SortByItem.Name:
        return items?.sort((a, b) => a.name.localeCompare(b.name));
      case SortByItem.Price:
        return items?.sort((a, b) => a.fullPrice - b.price);
      default:
        return items;
    }
  };

  const itemToUpperCase = (item: string) => {
    return item.charAt(0).toUpperCase() + item.slice(1);
  }

  const filtered = filteredProducts(categories[0].items).slice(firstItemIndex, lastItemIndex);

  const showPagination = filtered.length < categories[0].items.length;

  return (
    <div className="productsPage">
      <div className="productsPage__constrain">
        <div className="productsPage__breadcrumbs">
          <NavLink to="/" className="productsPage__home-link">
            <img src={Home} alt="home" className="productsPage__home" />
          </NavLink>
          <img
            src={Vec_light_right}
            alt="Vector_light_right"
            className="productsPage__arrow-right"
          />
          {/* <div className="productsPage__phones">{title}</div> */}
        </div>
        {/* <h1 className="productsPage__header">{itemToUpperCase(title)}</h1> */}
        <div className="productsPage__models">{`${phoneItems.length} models`}</div>

        <div className="productsPage__selectParams">
          <div className="productsPage__sortBy">
            <div className="productsPage__choose">Sort by</div>
            <select
              value={sortBy}
              onChange={toBeSortedBy}
              className="productsPage__selectSort"
            >
              <option></option>
              <option className="productsPage__option">Newest</option>
              <option className="productsPage__option">Alphabetically</option>
              <option className="productsPage__option">Cheapest </option>
            </select>
          </div>
          <div className="productsPage__itemsOnPage">
            <div className="productsPage__choose">Items on page</div>
            <select
              value={perPage}
              onChange={handlePerPage}
              className="productsPage__selectNum"
            >
              <option className="productsPage__option">all</option>
              <option className="productsPage__option">4</option>
              <option className="productsPage__option">8</option>
              <option className="productsPage__option">16</option>
            </select>
          </div>
        </div>

        <div className="productsPage__container">
          <ul className="productsPage__list">
            {filtered?.map((product: Product) => (
              <NavLink
                key={product.id}
                to={{ pathname: `${pathname}/${product.id}`}}
                className="productsPage__link"
              >
                <ProductCard product={product} />
              </NavLink>
            ))}
          </ul>
        </div>
        {showPagination 
          ? <Pagination products={phoneItems} />
          : null
        }
      </div>
    </div>
  );
};
