import { useContext, useEffect, useState } from 'react';
import {
  NavigationButtons,
} from '../../../../../../common/NavigationButtons/NavigationButtons';
import { NoProducts } from '../../../../../../common/NoProducts/NoProducts';
import { Pagination } from '../../../../../../common/Pagination/Pagination';
import { ProductCard } from '../../../../../../common/ProductCard/ProductCard';
import { TabletCard } from '../../../../../../common/TabletCard/TabletCard';
import {
  SortAndPagesContext,
} from '../../../../../../context/SortAndPagesContext';
import { Product } from '../../../../../../types/types';

import './ProductsCardPage.scss';

type Props = {
  products?: Product[],
  visibleProducts?: Product[],
  title: string,
  searchInput: string,
  setVisibleProducts?: (value: any) => void,
  setProducts?: (value: any) => void,
};

export const ProductsCardPage: React.FC<Props>
  = ({
    products, title, setVisibleProducts,
    visibleProducts, setProducts, searchInput,
  }) => {
    const {
      itemsOnPage,
      setItemsOnPage,
      currentPage,
      setCurrentPage,
      sortingByValue,
      setSortingByValue,
    } = useContext(SortAndPagesContext);

    const [isProducts, setIsProducts] = useState(false);
    const productsAmount = !searchInput && products ? products.length : 1;
    const totalPages = Math.ceil(productsAmount / itemsOnPage);
    const firstIndex = currentPage * itemsOnPage - itemsOnPage;
    const lastIndex = currentPage * itemsOnPage;

    const sortItemsBy = async (value: string) => {
      if (!products || !setProducts) {
        return;
      }

      switch (value) {
        case 'newest':
          setProducts(products.sort((a: Product, b: Product) => {
            return b.year - a.year;
          }));
          setSortingByValue(value);

          return;
        case 'alphabetically':
          setProducts(products.sort((a: Product, b: Product) => {
            return a.name.localeCompare(b.name, 'en', { numeric: true });
          }));
          setSortingByValue(value);

          return;
        case 'cheapest':
          setProducts(products.sort((a: Product, b: Product) => {
            return a.price - b.price;
          }));
          setSortingByValue(value);

          return;

        default:
          setProducts(products);
      }
    };

    useEffect(() => {
      if (!products) {
        return;
      }

      if (products.length && setVisibleProducts) {
        setVisibleProducts(products.filter((
          _product: Product, index: number,
        ) => {
          if (firstIndex > products.length) {
            setCurrentPage(Math.ceil(products.length / itemsOnPage));

            return index > products.length - itemsOnPage;
          }

          return index > firstIndex && index <= lastIndex;
        }));
      }
    }, [itemsOnPage, currentPage, sortingByValue, isProducts]);
    useEffect(() => {
      if (!visibleProducts) {
        return;
      }

      if (visibleProducts.length > 0) {
        setIsProducts(true);
        sortItemsBy(sortingByValue);
      }
    }, [visibleProducts]);

    return (
      <div className="product-page">
        <NavigationButtons title={title.toLowerCase()} />
        <div className="product-page__main">
          <div className="product-page__main-info">
            <h1 className="product-page__title">{title}</h1>
            <p className="product-page__subtitle body14">{`${products ? products.length : 0} models`}</p>
          </div>
          {products && products.length
            ? (
              <>
                <div className="product-page__search">
                  <div className="product-page__sort">
                    <label htmlFor="sortBy">
                      <div className="product-page__sort-title body12">
                        Sort by
                      </div>
                      <select
                        className="product-page__select sort"
                        id="sortBy"
                        style={{
                          backgroundImage:
                            'url("icons/Chevron (Arrow Down).svg")',
                        }}
                        value={sortingByValue}
                        onChange={(event) => {
                          sortItemsBy(event.target.value);
                        }}
                      >
                        <option
                          defaultValue={sortingByValue}
                          value="newest"
                        >
                          Newest
                        </option>
                        <option value="alphabetically">Alphabetically</option>
                        <option value="cheapest">Cheapest</option>
                      </select>
                    </label>
                  </div>
                  <div className="product-page__sort">
                    <label>
                      <div className="product-page__sort-title body12">
                        Items on page
                      </div>
                      <select
                        className="product-page__select pages"
                        value={itemsOnPage}
                        onChange={(event) => {
                          setItemsOnPage(+event.target.value);
                        }}
                        style={{
                          backgroundImage:
                            'url("icons/Chevron (Arrow Down).svg")',
                        }}
                      >
                        <option defaultValue={itemsOnPage} value="4">4</option>
                        <option value="8">8</option>
                        <option value="16">16</option>
                        <option value={products.length}>All</option>
                      </select>
                    </label>
                  </div>
                </div>
                <ul className="product-page__list">
                  {visibleProducts && visibleProducts.length
                    ? visibleProducts.map((product: Product) => {
                      return (
                        <li
                          className="product-page__item"
                          key={product.id}
                        >

                          {product.type === 'tablet' && (
                            <TabletCard
                              product={product}
                              products={products}
                            />
                          )}
                          {product.category === 'phones'
                            && (
                              <ProductCard
                                product={product}
                              />
                            )}
                        </li>
                      );
                    })
                    : <NoProducts />}
                </ul>
                {
                  visibleProducts && totalPages > 1
                  && (
                    <Pagination
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      totalPages={totalPages}
                    />
                  )
                }
              </>
            )
            : <h2>No products found</h2>}
        </div>
      </div>
    );
  };
