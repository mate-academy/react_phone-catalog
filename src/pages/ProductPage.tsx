import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../helpers/api';
import './ProductPage.scss';
import Loader from '../helpers/Loader/Loader';

export const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>();
  const [mainImgUrl, setMainImgUrl] = useState<string>(`img/phones/${productId}.0.jpg`);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setInterval(() => {
      try {
        getProduct(productId)
          .then(data => setProduct(data));
      } catch (error) {
      // catch error
      } finally {
        setIsLoading(true);
      }
    }, 500);
  }, [productId]);

  const handleSetMainImg = (imgUrl: string) => {
    setMainImgUrl(imgUrl);
  };

  return (
    <>
      {!isLoading && <Loader />}
      <section className="container">

        <div className="Product">
          <h1 className="Product__title">
            {product?.name}
          </h1>
          <div className="Product__top">
            <ul className="Product__images_list">
              {product?.images.slice(0, 5).map((img: string) => (
                <li
                  onClick={() => handleSetMainImg(img)}
                  key={img}
                  className="Product__images_item"
                  style={{ backgroundImage: `url(${img})` }}
                />
              ))}
            </ul>
            <div
              className="Product__img_container"
              style={{ backgroundImage: `url(${mainImgUrl})` }}
            />
          </div>
        </div>

      </section>
    </>
  );
};
