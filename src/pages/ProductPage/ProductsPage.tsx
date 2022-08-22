import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductsPage.scss';
import * as request from '../../api/request';
import { Product } from '../../types/Product';

import { Loader } from '../../components/Loader/Loader';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Pagination } from '../../components/Pagination/Pagination';

type Props = {
  type: string,
};

export const ProductsPage: React.FC<Props> = ({ type }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productType, setProductType] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [scroll, setScroll] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy') || '';
  const perPage = searchParams.get('perPage')
    || (products.length > 4 ? '8' : '4');
  const currentPage = searchParams.get('page') || '';
  const searchQuery = searchParams.get('query') || '';
  const itemsPerLine = 4;
  const step = itemsPerLine / (products.length / +perPage);
  const frameSize = +perPage / itemsPerLine;
  const itemHeight = 547;
  const animationDuration = 1000;

  let filteredProducts;

  useEffect(() => {
    const getData = async () => {
      let data;

      if (type === 'phones') {
        data = await request.getPhones().then(result => setProducts(result));
        setProductType('Phones');
      } else if (type === 'tablets') {
        data = await request.getTablets().then(result => setProducts(result));
        setProductType('Tablets');
      } else if (type === 'accessorie') {
        data = await request.getAccessories()
          .then(result => setProducts(result));
        setProductType('Accessories');
      }

      setIsLoaded(true);

      return data;
    };

    getData();
  }, [type]);

  const slideNextPage = () => {
    if (scroll === products.length - frameSize) {
      setScroll(0);
    } else if (scroll + step >= products.length - frameSize) {
      setScroll(products.length - frameSize);
    } else {
      setScroll((prevState) => {
        return prevState + step;
      });
    }
  };

  const slidePreviousPage = () => {
    if (scroll === 0) {
      setScroll(products.length - frameSize);
    } else if (scroll - step < 0) {
      setScroll(0);
    } else {
      setScroll((prevState) => {
        return prevState - step;
      });
    }
  };

  const slideSelectedPage = (selectedPage: number) => {
    if (+perPage === 4) {
      setScroll(selectedPage - step);
    } else if (selectedPage < scroll) {
      setScroll(0);
    } else if (selectedPage !== 1) {
      setScroll(selectedPage);
    }
  };

  const productSliderList = {
    marginTop: `-${scroll * itemHeight}px`,
    transition: `${animationDuration}ms`,
  };

  const productStyleContainer = {
    height: `${itemHeight * frameSize}px`,
  };

  const resetPageView = () => {
    searchParams.set('page', '1');
    setScroll(0);
  };

  const handleSortBy = (sortValue: string) => {
    resetPageView();
    searchParams.set('sortBy', sortValue);
    navigate(`?${searchParams.toString()}`);
  };

  const handleItemsPerPage = (number: string) => {
    resetPageView();
    searchParams.set('perPage', `${number}`);
    navigate(`?${searchParams.toString()}`);
  };

  const handleCurrentPage = (number: number) => {
    searchParams.set('page', `${number}`);

    navigate(`?${searchParams.toString()}`);
  };

  if (sortBy) {
    products.sort((a, b): number => {
      switch (sortBy) {
        case 'age':
          return a.age - b.age;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          if (a.discount && b.discount) {
            return (a.price - (a.price / a.discount))
              - (b.price - (b.price / b.discount));
          }

          return a.price - b.price;
        default:
          return 0;
      }
    });
  }

  if (searchQuery) {
    filteredProducts = products
      .filter(product => (
        product.name !== null
        && product.id !== null
      )
        && (product.name
          .toLowerCase().includes(searchQuery)
          || product.id
            .toLowerCase().includes(searchQuery)));
  } else {
    filteredProducts = products;
  }

  if (!isLoaded) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <div className="products-page">
        {products.length === 0
          ? (
            <div className="title-container">
              <h1 className="title-not-found">{`${productType} not found`}</h1>
            </div>
          )
          : (
            <div className="products-page-wrapper">
              <i className="fa-solid fa-house icon" />
              <i className="fa-solid fa-angle-right icon" />
              <span className="icon-title">{productType}</span>
              <div className="header-container">
                <h1 className="mobile-title">{productType}</h1>
                <p className="models-title">{`${products.length} models`}</p>
              </div>
              <div className="products-sort-container">
                <div className="select-container">
                  <p className="select-title">Sort by</p>
                  <select
                    name="sortBy"
                    value={sortBy}
                    className="select"
                    onChange={(event) => handleSortBy(event.target.value)}
                  >
                    <option hidden value="">Sort by</option>
                    <option
                      className="option"
                      value="age"
                    >
                      Newest
                    </option>
                    <option
                      className="option"
                      value="name"
                    >
                      Alphabetically
                    </option>
                    <option
                      className="option"
                      value="price"
                    >
                      Cheapest
                    </option>
                  </select>
                </div>
                <div className="select-container">
                  <p className="select-title">Items on page</p>
                  <select
                    name="pagination"
                    className="select"
                    value={perPage}
                    onChange={(event) => {
                      handleItemsPerPage(event.target.value);
                    }}
                  >
                    {products.length >= 16 && (<option value="16">16</option>)}
                    {products.length >= 8 && (<option value="8">8</option>)}
                    {products.length >= 4 && (<option value="4">4</option>)}
                    <option value={products.length}>All</option>
                  </select>
                </div>
              </div>
              <div
                className="products-list-container"
                data-cy="productList"
                style={productStyleContainer}
              >
                <div
                  className="products-list"
                  style={productSliderList as React.CSSProperties}
                >
                  <ProductsList products={filteredProducts} />
                </div>
              </div>
              <div>
                <Pagination
                  total={products.length}
                  perPage={perPage ? +perPage : 4}
                  page={currentPage ? +currentPage : 1}
                  onPageChange={handleCurrentPage}
                  slideNextPage={slideNextPage}
                  slidePreviousPage={slidePreviousPage}
                  slideSelectedPage={slideSelectedPage}
                />
              </div>
            </div>
          )}
      </div>
    </>
  );
};
