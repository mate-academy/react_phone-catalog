import React from 'react';
import { ProductList } from '../components/ProductList/ProductList';
import { Filter } from '../components/Filter/Filter';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { IoIosArrowForward } from 'react-icons/io';
import { LuHouse } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { Pagination } from '../components/Pagination/Pagination';

export const TabletsPage: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.items);

  const tablets = products.filter(product => product.category === 'tablets');

  const tabletsModels = tablets.length;

return (
  <div className="section" id="tablets">
    <div className="main__container">
      <div className="top__back__link">
        <Link to="/home" className="icon__house">
          <LuHouse color="#313237" />
        </Link>
        <Link to="/home" className="top__back__link">
          <IoIosArrowForward />
          <p>Tablets</p>
        </Link>
      </div>
      <h1 id="heading1">Tablets</h1>
      <p className="under__heading1">{tabletsModels} models</p>
      <div className="select__section">
        <div className="sort__select">
          <label htmlFor="filter-select">Sort by:</label>
          <Filter />
        </div>
        <div className="sort__select">
          <label htmlFor="pagination-select">Items on page:</label>
          <Pagination />
        </div>
      </div>
      <div className="container">
        <ProductList category="tablets" />
      </div>
    </div>
  </div>
);
}
