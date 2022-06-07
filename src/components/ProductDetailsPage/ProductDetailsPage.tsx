/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getProduct, getProducts, getSuggestedProducts } from '../../api/api';
import { Loader } from '../Loader/Loader';
import { PageHeader } from '../PageHeader';
import { Galery } from '../Galery';
import { PriceBlock } from '../PriceBlock';
import { ControlBlock } from '../ControlBlock';
import { Description, createItem } from '../Description';
import { Product } from '../../types/Product';
import { ProductDetail } from '../../types/ProductDetail';
import { ProductSlider } from '../ProductSlider';
import { BackButton } from '../BackButton';

import './ProductDetailsPage.scss';

export const ProductDetailsPage: React.FC = () => {
  const [isLoad, setIsLoad] = useState(true);
  const [product, setProduct] = useState<Product>();
  const [productDetail, setProductDetail] = useState<ProductDetail>();
  const [products, setProducts] = useState<Product[]>([]);
  const { productId } = useParams();

  const { pathname } = useLocation();
  const type = pathname.split('/')[1].slice(0, -1);

  useEffect(() => {
    getProducts()
      .then(items => (
        items.find((item: { id: string | undefined; }) => (
          item.id === productId
        ))))
      .then(setProduct);
    getProduct(productId)
      .then(setProductDetail)
      .then(() => setIsLoad(false));
    getSuggestedProducts()
      .then(setProducts);
  }, [productId]);

  return (
    <>
      {(productDetail && product) ? (
        <section className="product-details">
          <div className="product-details__top">
            <PageHeader
              title={`${product.type}s`}
              subtitle={productDetail.name}
            />
            <div className="container">
              <div className="product-details__nav-button">
                <BackButton />
              </div>
            </div>
          </div>
          <div className="product-details__content">
            <div className="container">
              {isLoad && <Loader />}
              <h2 className="title product-details__title">
                {productDetail.name}
              </h2>
              <div className="product-details__columns">
                <div className="column product-details__column">
                  <Galery product={productDetail} />
                </div>
                <div className="column product-details__column">
                  <div className="product-info column__product-info">
                    <div className="product-info__variables" />
                    <div className="order-block product-info__order-block">
                      <div className="order-block__price-box">
                        <PriceBlock
                          price={product.price}
                          discount={product.discount}
                          isBig
                          border={false}
                        />
                      </div>
                      <div className="order-block__control-box">
                        <ControlBlock
                          isLarge
                          product={product}
                        />
                      </div>
                    </div>
                    <div className="info-box product-info__info-box">
                      <Description
                        screen={product.screen}
                        capacity={product.capacity}
                        ram={product.ram}
                      />
                    </div>
                  </div>
                  <span className="column__product-id">
                    ID:
                    {productDetail.id}
                  </span>
                </div>
                <div className="column product-details__column">
                  <h3 className="column__title">About</h3>
                  <p className="column__about-text">
                    {productDetail.description}
                  </p>
                </div>
                <div className="column product-details__column">
                  <h3 className="column__title">Tech specs</h3>
                  <ul className="description column__description">
                    {createItem(
                      'Screen',
                      productDetail.display.screenSize,
                      true,
                    )}
                    {createItem(
                      'Resolution',
                      productDetail.display.screenResolution,
                      true,
                    )}
                    {createItem(
                      'Processor',
                      productDetail.hardware.cpu,
                      true,
                    )}
                    {createItem(
                      'RAM',
                      productDetail.storage.ram,
                      true,
                    )}
                    {createItem(
                      'Build in memory',
                      productDetail.storage.flash,
                      true,
                    )}
                    {createItem(
                      'Camera',
                      productDetail.camera.primary,
                      true,
                    )}
                    {createItem(
                      'Cell',
                      productDetail.connectivity.cell,
                      true,
                    )}
                  </ul>
                </div>
              </div>
              <ProductSlider
                title="You may also like"
                products={products}
              />
            </div>
          </div>
        </section>
      ) : (
        <h3 className="info-text product-details__info-text">
          {`${type} was not found`}
        </h3>
      )}
    </>
  );
};
