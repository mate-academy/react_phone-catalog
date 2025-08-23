import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import productPage from './ProductPage.module.scss';
import { CurrentCategory } from '../../types/CurrentCategory';
import { ProductsContext } from '../../context/ProductsContext';
import { getCategoryProduct, getPhones } from '../../api/getProducts';
import { Breadcrumbs } from '../../modules/shared/Breadcrumbs';
import { CategoryContext } from '../../context/CategoryContext';

export const ProductPage: React.FC = () => {
  const { pathname } = useLocation();
  const [currentProduct, setCurrentProduct] = useState<CurrentCategory | null>(
    null,
  );
  const { categoryProducts, setCategoryProducts } = useContext(ProductsContext);

  const { currentCategory } = useContext(CategoryContext);

  useEffect(() => {
    const categories = ['phones', 'tablets', 'accessories'];

    const found = categories.find(category => pathname.includes(category));

    if (found) {
      setCurrentProduct(found as CurrentCategory);
    }
  }, [currentProduct, pathname]);

  const sortOptions = ['Newest', 'Alphabetically', 'Cheapest'];

  // getCategoryProduct(currentProduct).then(response => console.log(response));

  // getPhones().then(response => console.log(response));

  useEffect(() => {
    if (currentProduct) {
      console.log('Fetching category:', currentProduct);

      getCategoryProduct(currentProduct)
        .then(response => {
          console.log('response', response);

          setCategoryProducts(response);
        })
        .catch(() => {
          console.log('ok');
          'error';
        })
        .finally(() => {
          // eslint-disable-next-line no-console
          console.log('Products fetched successfully');
        });
    }
  }, [currentProduct]);

  function wait(delay: number) {
    return new Promise(resolve => {
      setTimeout(resolve, delay);
    });
  }

  function request<T>(path: string): Promise<T> {
    return wait(300)
      .then(() => fetch(path))
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }

        return response.json() as Promise<T>;
      });
  }

  useEffect(() => {
    request('api/phones.json')
      .then(response => {
        // setPhoneItems(response as Phone[]);
        console.log('ok');
      })
      .catch(() => {
        alert('Error fetching phones');
      });
  }, []);

  console.log(categoryProducts);

  // useEffect(() => {
  //   if (currentProduct) {
  //     console.log('Fetching category:', currentProduct);
  //     const fetchData = async () => {
  //       try {
  //         console.log('Fetching category:', currentProduct);

  //         const response = await getCategoryProduct(currentProduct);

  //         setCategoryProducts(response);
  //       } catch (error) {
  //         console.error('Error fetching products:', error);
  //       } finally {
  //         console.log('Products fetched successfully');
  //       }

  //       fetchData();
  //     };
  //   }
  // }, [currentProduct]);



  function setTitle(product: CurrentCategory) {
    if (!product) {
      return '';
    }

    if (product === 'phones') {
      return 'Mobile phones';
    }

    return product[0].toUpperCase() + product.slice(1);
  }

  const title = setTitle(currentProduct);

  return (
    <div className={productPage['product-page']}>
      <Breadcrumbs />
      <div className={productPage['product-page__wrapper']}>
        <h2 className={productPage['product-page__title']}>{title}</h2>
        <span className={productPage['product-page__quantity']}>95 models</span>
      </div>
      <div className={productPage.sort}>
        <div className={productPage.sort__by}>
          <label htmlFor="sort-by">
            {' '}
            Sort by
            <select
              name=""
              id="sort-by"
              className={productPage['product-page__select']}
            >
              {sortOptions.map(option => (
                <option
                  key={option}
                  className={productPage['product-page__option']}
                >
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};
