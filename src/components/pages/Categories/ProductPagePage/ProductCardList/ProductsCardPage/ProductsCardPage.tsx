import { useEffect, useState } from 'react';
import {
  NavigationButtons,
} from '../../../../../../common/NavigationButtons/NavigationButtons';
import { NoProducts } from '../../../../../../common/NoProducts/NoProducts';
import { PagesList } from '../../../../../../common/PagesList/PagesList';
import { ProductCard } from '../../../../../../common/ProductCard/ProductCard';
import { Product } from '../../../../../../types/types';

import './ProductsCardPage.scss';

type Props = {
  products?: any,
  visibleProducts?: any,
  title: string,
  setVisibleProducts?: any,
  setProducts?: any,
  searchInput: string,
};

export const ProductsCardPage: React.FC<Props>
  = ({
    products, title, setVisibleProducts,
    visibleProducts, setProducts, searchInput,
  }) => {
    const [itemsOnPage, setItemsOnPage] = useState(16);
    const [isProducts, setIsProducts] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsSort, setItemsSort] = useState('newest');
    const productsAmount = searchInput ? 1 : products.length;
    const buttonsNumber = Math.ceil(productsAmount / itemsOnPage);
    const firstIndex = currentPage * itemsOnPage - itemsOnPage;
    const lastIndex = currentPage * itemsOnPage;

    const sortItemsBy = async (value: string) => {
      switch (value) {
        case 'newest':
          setProducts(products.sort((a: Product, b: Product) => {
            return b.year - a.year;
          }));
          setItemsSort(value);

          return;
        case 'alphabetically':
          setProducts(products.sort((a: Product, b: Product) => {
            return a.name.localeCompare(b.name, 'en', { numeric: true });
          }));
          setItemsSort(value);

          return;
        case 'cheapest':
          setProducts(products.sort((a: Product, b: Product) => {
            return a.price - b.price;
          }));
          setItemsSort(value);

          return;

        default:
          setProducts(products);
      }
    };

    useEffect(() => {
      if (products.length) {
        setVisibleProducts(products.filter((
          _product: Product[], index: number,
        ) => {
          if (firstIndex > products.length) {
            setCurrentPage(Math.ceil(products.length / itemsOnPage));

            return index > products.length - itemsOnPage;
          }

          return index > firstIndex && index <= lastIndex;
        }));
      }
    }, [itemsOnPage, currentPage, itemsSort, isProducts]);
    useEffect(() => {
      if (visibleProducts.length > 0) {
        setIsProducts(true);
        sortItemsBy(itemsSort);
      }
    }, [visibleProducts]);

    return (
      <div className="product-page">
        <NavigationButtons title={title.toLowerCase()} />
        <div className="product-page__main">
          <div className="product-page__main-info">
            <h1 className="product-page__title">{title}</h1>
            <p className="product-page__subtitle body14">{`${products.length} models`}</p>
          </div>
          {products.length
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
                        value={itemsSort}
                        onChange={(event) => {
                          sortItemsBy(event.target.value);
                        }}
                      >
                        <option
                          defaultValue={itemsSort}
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
                  {visibleProducts.length
                    ? visibleProducts.map((product: Product) => {
                      return (
                        <li
                          className="product-page__item"
                          key={product.id}
                        >
                          <ProductCard
                            product={product}
                          />
                        </li>
                      );
                    })
                    : <NoProducts />}
                </ul>
                {
                  !!visibleProducts.length
            && (
              <PagesList
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                buttonsNumber={buttonsNumber}
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
