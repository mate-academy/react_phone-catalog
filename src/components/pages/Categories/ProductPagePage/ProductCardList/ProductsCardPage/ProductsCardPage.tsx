// import { useState } from 'react';
// import { useEffect } from 'react';
import { useEffect, useState } from 'react';
import { Button } from '../../../../../../helpers/Button/Button';
import {
  NavigationButtons,
} from '../../../../../../helpers/NavigationButtons/NavigationButtons';
import { ProductCard } from '../../../../../../helpers/ProductCard/ProductCard';
import './ProductsCardPage.scss';

export const ProductsCardPage: React.FC<any>
= ({
  products, title, setVisibleProducts, visibleProducts, setProducts,
}) => {
  // const [selectValue, setSelectValue] = useState('');
  const [itemsOnPage, setItemsOnPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsSort, setItemsSort] = useState('');
  const buttonsNumber = Math.ceil(products.length / itemsOnPage);
  const isSelected = (one: any) => {
    return currentPage === one;
  };
  // const [buttonsNumber, setButtonsNumber] = useState(number);
  // const [visibleProducts, setVisibleProducts] = useState([]);

  // let result = getVisibleProducts()
  useEffect(() => {
    const firstIndex = currentPage * itemsOnPage - itemsOnPage;
    const lastIndex = currentPage * itemsOnPage;

    setVisibleProducts(products.filter((
      product: any, index: any) => {
      return index > firstIndex && index <= lastIndex;
    }));
  }, [itemsOnPage, currentPage, itemsSort]);

  const sortItemsBy = async (value: any) => {
    switch (value) {
      case 'newest':
        setProducts(products.sort((a: any, b: any) => {
          return b.year - a.year;
        }));
        setItemsSort(value);

        return;
      case 'alphabetically':
        setProducts(products.sort((a: any, b: any) => {
          return a.name.localeCompare(b.name, 'en', { numeric: true });
        }));
        setItemsSort(value);

        return;
      case 'cheapest':
        setProducts(products.sort((a: any, b: any) => {
          return a.price - b.price;
        }));
        setItemsSort(value);

        return;

      default:
        setProducts(products);
    }
  };

  useEffect(() => {
    sortItemsBy('newest');
  }, []);

  // console.log(buttonsNumber);

  // console.log(setButtonsNumber)
  return (
    <div className="product-page">
      <NavigationButtons product={undefined} id={undefined} />
      <div className="product-page__main">
        <div className="product-page__main-info">
          <h1 className="product-page__title">{title}</h1>
          <p className="product-page__subtitle body14">{`${products.length} models`}</p>
        </div>
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
                  backgroundImage: 'url("/icons/Chevron (Arrow Down).svg")',
                }}
                value={itemsSort}
                onChange={(event) => {
                  sortItemsBy(event.target.value);
                }}
              >
                <option selected value="newest">Newest</option>
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
                  backgroundImage: 'url("/icons/Chevron (Arrow Down).svg")',
                }}
              >
                <option selected value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value={products.length}>All</option>
              </select>
            </label>
          </div>
        </div>
        <ul className="product-page__list">
          {
            visibleProducts.map((product: any) => {
              return (
                <li
                  className="product-page__item"
                  key={product.id}
                >
                  <ProductCard product={product} productImg={`./_new/${product.image}`} />
                </li>
              );
            })
          }
        </ul>

        <div className="product-page__buttons">
          <Button
            className="arrow left small"
            // onClick={moveLeft}
            image="/icons/Chevron (Arrow Left).svg"
            alt="<"
            onClick={() => {
              if (currentPage <= 1) {
                return;
              }

              setCurrentPage(prev => prev - 1);
            }}

          />
          <ul className="product-page__buttons-list">
            {
              [...Array(buttonsNumber)].map((one, index) => {
                one = index + 1;

                return (

                  <li
                    key={one}
                    className="product-page__buttons-item"
                  >
                    <Button
                      className={`arrow small ${isSelected(one) && 'active-button'}`}
                      onClick={() => {
                        setCurrentPage(index + 1);
                      }}
                      num={index + 1}
                      alt={index + 1}
                    />
                  </li>
                );
              })
            }
          </ul>
          <Button
            className="arrow right small"
            image="/icons/Chevron (Arrow Right).svg"
            onClick={() => {
              if (currentPage >= buttonsNumber) {
                return;
              }

              setCurrentPage(prev => prev + 1);
            }}
            alt=">"
          />
        </div>

      </div>
    </div>
  );
};
