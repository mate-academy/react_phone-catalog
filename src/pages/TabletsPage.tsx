import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Sort } from '../components/Sort/Sort';
import {
  getLoading,
  getPerPage,
  getVisibleProducts,
  getQuantity,
  RootState,
} from '../store';
import Loader from '../helpers/Loader/Loader';
import PhoneCard from '../components/PhoneCard/PhoneCard';
import Pagination from '../components/Pagination/Pagination';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { ProductsQuantity } from '../components/ProductsQuantity/ProductsQuantity';


export const TabletsPage = () => {
  const isLoaded = useSelector(getLoading);
  const tabletsQuatnity = useSelector((state: RootState) => getQuantity(state, 'tablet'));
  const tablets = useSelector((state: RootState) => getVisibleProducts(state, 'tablet'));
  const perPage = useSelector(getPerPage);
  const pageNumbers = Math.ceil(tabletsQuatnity / perPage);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <div className="container">
        <div className="Products__article">
          <Breadcrumbs />
          <h1>Tablets page</h1>
          <ProductsQuantity quantity={tabletsQuatnity} />
          <Sort />
        </div>
      </div>
      {isLoaded ? <Loader />
        : (
          <section className="section">
            <div className="container">
              <section className="TabletsPage__list">
                {tablets.map((phone: Products) => (
                  <PhoneCard key={phone.age} phone={phone} />
                ))}
              </section>
            </div>
          </section>
        )}
      <div>
        {
          tabletsQuatnity > perPage
          && <Pagination pageNumbers={pageNumbers} />
        }
      </div>

    </>
  );
};
