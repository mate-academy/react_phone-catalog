import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ProductList } from '../../components/ProductList/ProductList';
import { ApiContext } from '../../context/ApiContext';
import { ProductType } from '../../types/ProductType';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { DetailsPreview } from '../../components/DetailsPreview';
import { DetailsSelect } from '../../components/DetailsSelect';
import { DetailsTextContent } from '../../components/DetailsTextContent';
import { Breadcrumbs } from '../../components/Breadcrumbs';

import './productDetails.scss';

export const NotFind = () => {
  const navi = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navi('..', { replace: true });
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [navi]);

  return (
    <div className="container">
      <h1 className="productDetails-title"> Product not found</h1>
      <span className="productDetails-not-find"></span>
    </div>
  );
};

export type Description = {
  title: string;
  text: string[];
};

export type ProductDetail = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: Description[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell: string;
};

export const ProductDetails: React.FC = () => {
  const products = useContext(ApiContext);
  const { id, category } = useParams();
  const [productDetails, setProductDetails] = useState<ProductDetail[]>([]);

  const location = useLocation();
  const from = location.state?.from;
  const navigate = useNavigate();

  const navBack = () => {
    navigate(from ? from : '/');
  };

  useEffect(() => {
    fetch(`/api/${category}.json`)
      .then(res => {
        if (!res.ok) {
          navigate('..');
        }

        return res.json();
      })
      .then(setProductDetails)
      .catch(() => navigate('..'));
  }, [category, navigate]);

  const SALE = 100;

  const findProduct = useMemo(
    () => productDetails.find(p => p.id === id?.slice(1)),
    [productDetails, id],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [findProduct]);

  const lowestPrice = useMemo(
    () =>
      products.filter(
        (product: ProductType) => product.fullPrice - product.price > SALE,
      ),
    [products],
  );

  if (productDetails.length && !findProduct) {
    return <NotFind />;
  }

  return (
    <>
      {findProduct && (
        <div className="container">
          <Breadcrumbs />
          <button
            onClick={navBack}
            className="common-navigation common-navigation--margin"
          >
            <img
              className="common-navigation__img"
              src="./img/icons/cards-back.svg"
              alt=""
            />
          </button>
          <div className="productDetails">
            <h2 className="productDetails-title">{findProduct.name}</h2>

            <article className="productDetails-preview">
              <DetailsPreview product={findProduct} />
              <DetailsSelect product={findProduct} category={productDetails} />
            </article>
          </div>

          <DetailsTextContent product={findProduct} />

          <ProductList title={'You may also like'} productList={lowestPrice} />
        </div>
      )}
    </>
  );
};
