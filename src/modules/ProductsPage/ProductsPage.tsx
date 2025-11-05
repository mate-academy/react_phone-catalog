import { Link, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { fetchProducts } from '@Fetch';
import { ProductList } from '@GlobalComponents';
import { Products } from 'src/types/products';

import style from './productsPage.module.scss';
import home from '@Images/icons/Home.svg';
import arrow from '@Images/icons/Arrow-black-right.svg';
import { useTimer } from '../../Hooks/useTimer';
import { getFilteredProducts } from './getProducts';

export const ProductsPage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const { start, clear } = useTimer();

  const { categoryName } = useParams();

  useEffect(() => {
    setIsloading(true);

    start(() => {
      setIsloading(false);
    }, 1000);

    fetchProducts().then((data: Products[]) => {
      const result = getFilteredProducts(data, categoryName);

      setProducts(result);
    });

    return () => {
      clear();
    };
  }, [categoryName, start, clear]);

  return (
    <>
      <div className="container">
        <main className={style.main}>
          <nav className={style.nav}>
            <ul className={style.list}>
              <li>
                <Link className={style.link} to="/">
                  <img src={home} alt="" />
                </Link>
              </li>
              <li className={style.item}>
                <img className={style['item__img-arrow']} src={arrow} alt="" />
                <span className={style.item__text}>{categoryName}</span>
              </li>
            </ul>
          </nav>

          <ProductList
            isLoading={isLoading}
            title={categoryName || 'Loading Category'}
            data={products}
          />
        </main>
      </div>
    </>
  );
};
