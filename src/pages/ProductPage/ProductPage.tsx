import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { Pagination } from '../../components/Pagination';
import { SearchIn } from '../../components/SearchIn';
import { Product } from '../../types/Product';
import { NoResults } from '../../components/NoResults';
import './ProductPage.scss';

type Props = {
  products: Product[],
  titlePage: string,
  activePage: string,
};
export const ProductPage: React.FC<Props> = ({
  products,
  titlePage,
  activePage,
}) => {
  const [visibleProducts, setVisibleProducts] = useState(products);

  const [notProducts, setNotProducts] = useState(false);

  // #region productsOnPage
  const itemsAll = visibleProducts.length;
  const [productsOnPage, setProductsOnPage] = useState(visibleProducts);
  const [itemsOnPage, setItemsOnPage] = useState(itemsAll);
  const [offset, setOffset] = useState(0);

  const handlerClick = (currentPage: number) => {
    setOffset((currentPage - 1) * itemsOnPage);
  };

  useEffect(() => {
    setOffset(0);
  }, [itemsOnPage]);
  // #endregion

  // #region sorted
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const sort = searchParams.get('sort') || 'age';

  const handleSortChange = (param: string) => {
    if (param) {
      searchParams.set('sort', param);
    } else {
      searchParams.delete('sort');
    }

    navigate(`?${searchParams.toString()}`);
  };

  const getSorted = (sortParam: string) => {
    switch (sortParam) {
      case 'age':
        productsOnPage.sort((a, b) => a.age - b.age);
        break;

      case 'name':
        productsOnPage.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'price':
        productsOnPage.sort((a, b) => a.price - b.price);
        break;

      default:
        break;
    }
  };
  // #endregion

  const searchProducts = (query: string) => {
    if (query) {
      const lowerQuery = query.toLowerCase();

      setVisibleProducts([...products].filter(
        product => product.name.toLowerCase().includes(lowerQuery),
      ));
    } else {
      setVisibleProducts(products);
    }

    setNotProducts(false);
  };

  useEffect(() => {
    setProductsOnPage(visibleProducts);
    setItemsOnPage(itemsAll);
    setOffset(0);
    if (!visibleProducts.length) {
      setNotProducts(true);
    }
  }, [visibleProducts]);

  useEffect(() => {
    setProductsOnPage(
      [...visibleProducts].slice(offset, offset + itemsOnPage),
    );
  }, [itemsOnPage, offset]);

  return (
    <div className="ProductPage" data-cy="productList">
      <SearchIn
        activePage={activePage.toLowerCase()}
        searchProducts={searchProducts}
      />
      {notProducts ? (
        <NoResults category="The item you requested was" />
      ) : (
        <>
          <BreadCrumbs
            url={`/${activePage.toLowerCase()}s`}
            page={activePage}
            title=""
          />
          <h1 className="ProductPage__title">{titlePage}</h1>
          <p className="ProductPage__numberOfModels">
            {itemsAll}
            {' '}
            models
          </p>
          <div className="ProductPage__sortBlocks">
            <div className="ProductPage__sortBlock">
              <label
                htmlFor="sort"
                className="ProductPage__sortBlock-label"
              >
                Sort by
              </label>
              <select
                className="ProductPage__sort-select"
                name="itemsOnPage"
                id="itemsOnPage"
                value={sort}
                onChange={(event) => {
                  handleSortChange(event.target.value);
                  getSorted(event.target.value);
                }}
              >
                <option className="ProductPage__option" value="age">
                  Newest
                </option>
                <option className="ProductPage__option" value="name">
                  Alphabetically
                </option>
                <option className="ProductPage__option" value="price">
                  Cheapest
                </option>
              </select>
            </div>

            <div className="ProductPage__sortBlock">
              <label
                htmlFor="itemsOnPage"
                className="ProductPage__sortBlock-label"
              >
                Items on page
              </label>
              <select
                className="ProductPage__items-select"
                name="itemsOnPage"
                id="itemsOnPage"
                value={itemsOnPage}
                onChange={(event) => {
                  setItemsOnPage(+event.target.value);
                }}
              >
                <option className="ProductPage__option" value={itemsAll}>
                  all
                </option>
                {products.length > 4 && (
                  <option className="ProductPage__option" value={4}>
                    4
                  </option>
                )}
                {products.length >= 8 && (
                  <option className="ProductPage__option" value={8}>
                    8
                  </option>
                )}
                {products.length > 16 && (
                  <option className="ProductPage__option" value={16}>
                    16
                  </option>
                )}
              </select>
            </div>
          </div>
          <div className="ProductPage__conteiner">
            <div className="ProductPage__list">
              {productsOnPage.map(product => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </div>
          </div>

          <Pagination
            total={visibleProducts.length}
            perPage={itemsOnPage}
            handlerClick={handlerClick}
          />
        </>
      )}
    </div>
  );
};
