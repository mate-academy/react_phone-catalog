import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getProductsFromServer, getProductInfo } from '../../helpers/api';
import './ProductPage.scss';

export const ProductPage = () => {
  const [product, setProduct] = useState<ProductInfo>({} as ProductInfo);
  const [info, setInfo] = useState<Product>();
  const location = useLocation();
  const currentParams = useParams<CurrentParam>();
  const [currentImg, setCurrentImg] = useState<string>('');

  const getPrice = () => {
    getProductsFromServer()
      .then(data => data.find(item => item.id === currentParams.productId))
      .then(data => setInfo(data));
  };

  const changeBigIamge = (ind: number) => {
    setCurrentImg(product.images[ind]);
  };

  const getInfoFromServer = () => {
    getProductInfo(currentParams.productId)
      .then(data => setProduct(data));
  };

  console.log(info, location, currentImg, location);

  useEffect(() => {
    getInfoFromServer();
    getPrice();
    setCurrentImg(product.images && product.images[0]);
  }, [currentParams, product.name]);

  return (
    <div>
      {
        product
        && (
          <section className="section-product">
            <div className="section-product__container">
              <h2 className="section-product__title">{product.name}</h2>
              <div className="section-product__top">
                <div className="section-product__images">
                  <div className="section-product__mini">
                    {
                      product.images
                      && product.images.map((item, index) => (
                        <img
                          onClick={() => changeBigIamge(index)}
                          key={Math.random() * 1000}
                          src={item}
                          alt="mini-img"
                          className="section-product__img"
                        />
                      ))
                    }
                  </div>
                  <img
                    src={currentImg}
                    alt="great-img"
                    className="section-product__image"
                  />
                </div>
              </div>

            </div>
          </section>
        )
      }
    </div>
  );
};
