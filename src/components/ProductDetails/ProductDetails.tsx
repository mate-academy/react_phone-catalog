import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { Back } from '../Back';
import { Loader } from '../Loader';
import { Images } from '../Images';
import { ProductDetailsType } from '../../helpers/types';
import { TechSpecs } from '../TechSpecs';
import { ProductDetailsFavourite } from '../ProductDetailsFavourite';
import { ProductDetailsButton } from '../ProductDetailsButton';
import { ProductPrice } from '../ProductPrice';
import {
  loadGoodDetails,
  getGoodDetails,
  getGoods,
  getLoadingStatus,
} from '../../store';
import './ProductDetails.scss';

export const ProductDetails = () => {
  const dispatch = useDispatch();
  const product: ProductDetailsType = useSelector(getGoodDetails);
  const products = useSelector(getGoods);
  const loading: boolean = useSelector(getLoadingStatus);
  const { productId } = useParams();

  const productData = useMemo(() => (
    products.find(productEl => (productEl.id === productId))
  ), [products, productId]);

  useEffect(() => {
    dispatch(loadGoodDetails(productId));
    // loadProductPrice();
  }, [productId, dispatch]);

  return (
    (loading || !product.id || !productData)
      ? (
        <Loader />
      )
      : (
        <div className="ProductDetails">
          <Breadcrumbs />
          <Back />
          <h1 className="ProductDetails-Title">
            {product.name}
          </h1>
          <div className="Info ProductDetails-Info">
            <div className="Info-DescriptionBlock">
              <Images productImages={product.images.slice(0, 5)} />
              <h2 className="Info-Title">
                About
              </h2>
              <p className="Info-Description">
                {product.description}
              </p>
            </div>

            <div className="Info-TechBlock">
              <span className="Info-Id">
                {`ID: ${product.id}`}
              </span>
              <ProductPrice product={productData} />

              <div className="Info-Wrapper">
                <div className="Buttons Info-Buttons">
                  <ProductDetailsButton product={product} />
                  <ProductDetailsFavourite product={product} />
                </div>

                <div className="Info ProductCard-Info">
                  <div className="Info-Block">
                    <div className="Info-Name">
                      Screen
                    </div>
                    <div className="Info-Value">
                      {product.display.screenSize}
                    </div>
                  </div>

                  <div className="Info-Block">
                    <div className="Info-Name">
                      Capacity
                    </div>
                    <div className="Info-Value">
                      {product.storage.flash}
                    </div>
                  </div>

                  <div className="Info-Block">
                    <div className="Info-Name">
                      RAM
                    </div>
                    <div className="Info-Value">
                      {product.storage.ram}
                    </div>
                  </div>
                </div>
              </div>

              <TechSpecs
                screen={product.display.screenSize}
                cpu={product.hardware.cpu}
                resolution={product.display.screenResolution}
                camera={product.camera.primary}
                flash={product.storage.flash}
                ram={product.storage.ram}
                bluetooth={product.connectivity.bluetooth}
                wifi={product.connectivity.wifi}
              />
            </div>

          </div>
        </div>
      )
  );
};
