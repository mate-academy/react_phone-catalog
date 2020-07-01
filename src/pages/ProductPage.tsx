import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getProducts, getProduct, loadDetails, getLoading, getErrorMessage,
} from '../store/index';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { ProductInfo } from './ProductInfo';
import { PhonesSlider } from '../components/PhonesSlider/PhonesSlider';
import './ProductPage.scss';
import { NotFoundPage } from './NotFoundPage';
import { GoBackButton } from '../components/Buttons/GoBack';
import Loader from '../helpers/Loader/Loader';

export const ProductPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const product = useSelector(getProduct);
  const errorMessage = useSelector(getErrorMessage);
  const isLoading = useSelector(getLoading);
  const { productId } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0 });

    dispatch(loadDetails(productId));
  }, [productId, dispatch]);

  const existProduct = JSON.stringify(product) !== JSON.stringify({});
  const existId = products.every((item: Products) => item.id !== productId);

  if (existProduct && existId) {
    return <NotFoundPage />;
  }

  if (errorMessage !== '') {
    return (
      <div className="container">
        <div className="wrapper">
          <h1>{errorMessage}</h1>
          <GoBackButton />
        </div>
      </div>

    );
  }

  return (
    <>
      {isLoading
        ? (
          <div className="wrapper">
            <Loader />
          </div>
        )
        : (
          <div className="container">
            <section className="wrap__container">
              <Breadcrumbs />
            </section>
            <GoBackButton />
            <ProductInfo />
            <PhonesSlider title="You may also like" products={products} />
          </div>
        )}

    </>
  );
};
