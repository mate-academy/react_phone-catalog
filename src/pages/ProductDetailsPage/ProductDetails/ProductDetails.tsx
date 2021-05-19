import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../../api/getProduct';
import { getProducts } from '../../../api/getProducts';
import { Breadcrumbs } from '../../Phones/components/Breadcrumbs/Breadcrumbs';
import { Back } from '../Back/Back';
import { Loader } from '../../Phones/components/Loader/Loader';
import { Images } from '../Images/Images';
import { ProductDetailsType, Product } from '../../../helpers/types';
import { TechSpecs } from '../TechSpecs/TechSpecs';
import './ProductDetails.scss';
import { ProductDetailsFavourite } from '../ProductDetailsFavourite/ProductDetailsFavourite';
import { ProductDetailsButton } from '../ProductDetailsButton/ProductDetailsButton';

export const ProductDetails = () => {
  const [product, setProduct] = useState<ProductDetailsType>();
  const [oldPrice, setOldPrice] = useState<number>();
  const [newPrice, setNewPrice] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const { productId } = useParams();

  const loadProduct = async () => {
    setLoading(true);
    const loadedProduct = await getProduct(productId);

    setProduct(loadedProduct);
    setLoading(false);
  };

  const loadProductPrice = async () => {
    setLoading(true);
    const loadedProducts = await getProducts();
    const productObj = loadedProducts.find((productEl: Product) => productEl.id === productId);
    const productOldPrice = productObj.price;
    const productNewPrice = productObj.price * (1 - productObj.discount / 100);

    setOldPrice(productOldPrice);
    setNewPrice(productNewPrice);
    setLoading(false);
  };

  useEffect(() => {
    loadProduct();
    loadProductPrice();
  }, [productId]);

  return (
    (loading || !product)
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
              <div className="Info-Price">
                <span className="Info-NewPrice">{`$${newPrice}`}</span>
                {newPrice !== oldPrice
                  && (
                    <s className="Info-OldPrice">{`$${oldPrice}`}</s>
                  )}

              </div>

              <div className="Info-Wrapper">
                <div className="Actions Info-Actions">
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
