/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useContext, useEffect, useState } from 'react';
import './ProductDetails.scss';
import { CatalogContext } from '../../../context/CatalogContext';
import { useLocation } from 'react-router-dom';
import { NavigationPath } from '../NavigationPath/NavigationPath';
import { Slider } from '../../Slider';
import { NotFoundPage } from '../NotFoundPage';
import { ImageBlock } from './ImageBlock';
import { ColorsBlock } from './ColorsBlock';
import { CapacityBlock } from './CapacityBlock';
import { PriceBlock } from './PriceBlock';
import { DetailsBlock } from './DetailsBlock';
import { AboutBlock } from './AboutBlock';
import { TechBlock } from './TechBlock';
import * as Types from '../../../types';
import * as Service from '../../../utils/service';
import * as apiClient from '../../../api/api';
import { Loader } from '../../Loader';

export const ProductDetails = () => {
  const { pathname } = useLocation();
  const { allProducts } = useContext(CatalogContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<Types.ProductDetails | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);

        const [phones, tablets, accessories] = await Promise.all([
          apiClient.getPhones(),
          apiClient.getTablets(),
          apiClient.getAccessories(),
        ]);

        const productId = pathname.split('/').slice(-1).toString();

        const product = [...phones, ...tablets, ...accessories].find(
          ({ id }) => id === productId,
        ) as Types.ProductDetails;

        if (product) {
          setSelectedProduct(product);
        } else {
          setIsNotFound(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [pathname]);

  const { id, name, category, images } = selectedProduct || {};
  const [randomProducts, setRandomProducts] = useState<Types.Product[]>([]);

  useEffect(() => {
    selectedProduct && (document.title = selectedProduct.name);
  }, [selectedProduct]);

  useEffect(() => {
    setRandomProducts(Service.getRandomProducts(allProducts, category));
  }, [allProducts, category]);

  if (isNotFound) {
    return <NotFoundPage title={Types.NotFound.Product} />;
  }

  return (
    <section className="container product-details">
      {isLoading ? (
        <Loader selectedProduct={true} />
      ) : (
        !isLoading &&
        !isNotFound &&
        selectedProduct && (
          <>
            <NavigationPath selectedProduct={selectedProduct} />
            <h2>{name}</h2>

            <article className="product-details__product">
              <ImageBlock images={images} />

              <div
                className="
                  product-details__product--paramsBlock paramsBlock
                "
              >
                <ColorsBlock selectedProduct={selectedProduct} />
                <CapacityBlock selectedProduct={selectedProduct} />
                <PriceBlock selectedProduct={selectedProduct} />
                <DetailsBlock selectedProduct={selectedProduct} />
              </div>

              {id && (
                <span className="small-text product-details__product--id">
                  {`ID: ${Service.getIdForProduct(id, allProducts)}`}
                </span>
              )}
            </article>

            <article className="product-details__info">
              <AboutBlock selectedProduct={selectedProduct} />
              <TechBlock selectedProduct={selectedProduct} />
            </article>

            <article className="product-details__slider">
              <Slider title={Types.PageTitle.Like} products={randomProducts} />
            </article>
          </>
        )
      )}
    </section>
  );
};
