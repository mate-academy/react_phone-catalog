import './Catalog.scss';
import React, { useState, useEffect } from 'react';
import { Product } from '../../interfaces';
import { useLocation } from 'react-router-dom';
import { CardsContainer } from './CardsContainer/CardsContainer';
import { Pagination } from './Pagination/Pagination';
import { SortBy } from '../SortBy/SortBy';
import { ItemsOnPageSelect } from './ItemsOnPageSelect/ItemsOnPageSelect';

export const Catalog = ({
  products,
}: { products: Product[] }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortedProducts, setSortedProducts] = useState(filteredProducts);
  const [productsOnPage, setProductsOnPage] = useState(sortedProducts);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const filter = (searchParams.get("filter") || "").toLowerCase();
  const sortType = (searchParams.get("sort_type") || "age").toLowerCase();
  const page = parseInt(searchParams.get("page") || "1");
  const perPage = parseInt(searchParams.get("per_page") || "8");

  useEffect(() => {
    switch (sortType) {
      case 'name':
        setSortedProducts([...filteredProducts]
          .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())));
        break;
      case 'age':
        setSortedProducts([...filteredProducts]
          .sort((a, b) => a.age - b.age));
        break;
      case 'low_price':
        setSortedProducts([...filteredProducts]
          .sort((a, b) => ((a.price * (100 - a.discount) / 100) - (b.price * (100 - b.discount) / 100))));
        break;
      case 'high_price':
        setSortedProducts([...filteredProducts]
          .sort((a, b) => ((b.price * (100 - b.discount) / 100) - (a.price * (100 - a.discount) / 100))));
        break;
      default: setSortedProducts(filteredProducts);
    }
  }, [filteredProducts, sortType])

  useEffect(() => {
    if (filter === "") {
      setFilteredProducts(products);
      return;
    }
    setFilteredProducts(products
      .filter(product => product.name.toLowerCase().includes(filter)))
  }, [products, filter])

  useEffect(() => {
    if (!perPage) {
      setProductsOnPage(sortedProducts);
      return;
    }
    const start = (page - 1) * perPage;
    const end = start + perPage;
    setProductsOnPage(sortedProducts.slice(start, end))
  }, [sortedProducts, page, perPage])

  return (
    <>
      <p className="Catalog__models-count">
        {`${filteredProducts.length} models`}
      </p>
      <div className="Catalog__select-wrapper">
        <SortBy />
        <ItemsOnPageSelect />
      </div>
      <div>
        <CardsContainer
          products={productsOnPage}
        />
      </div>
      <Pagination pagesCount={sortedProducts.length / perPage || 1} />
    </>
  )
}
