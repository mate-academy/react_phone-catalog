import './Catalog.scss';
import React, { useState, useEffect } from 'react';
import { Product } from '../../interfaces';
import { useLocation, useHistory } from 'react-router-dom';
import { MainFrame } from './MainFrame/MainFrame';
import { Pagination } from './Pagination/Pagination';
import { SortBy } from '../SortBy/SortBy';
import { ItemsOnPageSelect } from './ItemsOnPageSelect/ItemsOnPageSelect';

export const Catalog = ({
  products,
}: {products: Product[]}) => {




  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortedProducts, setSortedProducts] = useState(filteredProducts);
  const [productsOnPage, setProductsOnPage] = useState(sortedProducts);
  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const filter = (searchParams.get("filter") || "").toLowerCase();
  const sortType = (searchParams.get("sort_type") || "age").toLowerCase();
  const page = parseInt(searchParams.get("page") || "1");
  const perPage = parseInt(searchParams.get("per_page") || "8");

  useEffect(() => {
    searchParams.set("page", page.toString());
    searchParams.set("per_page", perPage.toString());
    searchParams.set("sort_type", sortType);
    history.push({
      search: searchParams.toString()
    });
  }, [])



  useEffect(() => {
    if (sortType === "") {
      setSortedProducts(filteredProducts);
      return;
    };
    if (sortType === 'name') {
      setSortedProducts([...filteredProducts]
        .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())))
    };
    if (sortType === 'age') {
      setSortedProducts([...filteredProducts]
        .sort((a, b) => a.age - b.age))
    };
    if (sortType === 'low_price') {
      setSortedProducts([...filteredProducts]
        .sort((a, b) => ((a.price * (100 - a.discount) / 100) - (b.price * (100 - b.discount) / 100))))
      console.log(sortedProducts)
    };
    if (sortType === 'high_price') {
      setSortedProducts([...filteredProducts]
        .sort((a, b) => ((b.price * (100 - b.discount) / 100) - (a.price * (100 - a.discount) / 100))))
    };
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
    searchParams.set("page", "1");
    history.push({
      search: searchParams.toString()
    });
  }, [perPage, sortType])


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
        <MainFrame
          products={productsOnPage}
        />

      </div>
      <Pagination pagesCount={sortedProducts.length / perPage || 1} />
    </>
  )
}

