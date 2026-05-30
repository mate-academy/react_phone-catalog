import React from 'react';
import { ProductList } from '../components/ProductList/ProductList';
import { Filter } from '../components/Filter/Filter';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { IoIosArrowForward } from 'react-icons/io';
import { LuHouse } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { Pagination } from '../components/Pagination/Pagination';
import { Outlet } from 'react-router-dom';
export const AccessoriesPage: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.items);

  const accessories = products.filter(
    product => product.category === 'accessories',
  );

  const accessoriesModels = accessories.length;

  return (
    <div className="section">
      <div className="main__container" id="accessories">
        <div className="top__back__link">
          <Link to="/home" className="icon__house">
            <LuHouse color="#313237" />
          </Link>
          <Link to="/home" className="top__back__link">
            <IoIosArrowForward />
            <p>Accessories</p>
          </Link>
        </div>
        <h1 id="heading1">Accessories</h1>
        <p className="under__heading1">{accessoriesModels} models</p>
        <div className="select__section">
          <div className="sort__select">
            <label htmlFor="filter-select">Sort by</label>
            <Filter />
          </div>
          <div className="sort__select">
            <label htmlFor="pagination-select">Items on page</label>
            <Pagination />
          </div>
        </div>
        <div className="container">
          <ProductList category="accessories" />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
