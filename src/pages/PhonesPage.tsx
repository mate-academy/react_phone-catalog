import React, { useEffect } from 'react';
import {
  useSelector,
} from 'react-redux';
import { Sort } from '../components/Sort/Sort';
import PhoneCard from '../components/PhoneCard/PhoneCard';
import Loader from '../helpers/Loader/Loader';
import Pagination from '../components/Pagination/Pagination';
import {
  getVisibleProducts,
  getLoading,
  RootState,
  getQuantity,
  getPerPage,
} from '../store';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { ProductsQuantity } from '../components/ProductsQuantity/ProductsQuantity';

export const PhonesPage = () => {
  const isLoaded = useSelector(getLoading);
  const phonesQuatnity = useSelector((state: RootState) => getQuantity(state, 'phone'));
  const phones = useSelector((state: RootState) => getVisibleProducts(state, 'phone'));
  const perPage = useSelector(getPerPage);
  const pageNumbers = Math.ceil(phonesQuatnity / perPage);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <div className="container">
        <div className="Products__article">
          <Breadcrumbs />
          <h1 className="PhonesPage__head">Mobile phones</h1>
          <ProductsQuantity quantity={phonesQuatnity} />
          <Sort />
        </div>
      </div>
      {isLoaded ? <Loader />
        : (
          <section className="section">
            <div className="container">
              <section className="PhonesPage__list">
                {phones.map((phone: Products) => (
                  <PhoneCard key={phone.age} phone={phone} />
                ))}
              </section>
            </div>
            <div>
              {
                phonesQuatnity > perPage
                && <Pagination pageNumbers={pageNumbers} />
              }
            </div>
          </section>
        )}
    </>
  );
};
