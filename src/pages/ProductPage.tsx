import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProducts, getProduct } from '../store/index';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { loadProductInfo } from '../helpers/api';
import { ProductInfo } from './ProductInfo';
import { PhonesSlider } from '../components/PhonesSlider/PhonesSlider';
import './ProductPage.scss';
import { NotFoundPage } from './NotFoundPage';
import { setProduct } from '../store/product';
import { GoBackButton } from '../components/Buttons/GoBack';
import Loader from '../helpers/Loader/Loader';

export const ProductPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const product = useSelector(getProduct);
  const { productId } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0 });

    try {
      loadProductInfo(productId).then(data => dispatch(setProduct(data)));
    } catch (error) {
      // rer
    }
  }, [productId, dispatch]);

  const existProduct = JSON.stringify(product) !== JSON.stringify({});
  const existId = products.every((item: Products) => item.id !== productId);

  if (existProduct && existId) {
    return <NotFoundPage />;
  }

  return (
    <>
      {!existProduct ? <Loader /> : (
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
