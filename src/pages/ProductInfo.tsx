import React, { useState, useMemo } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { FavoriteButton } from '../components/Buttons/FavoriveButton';
import { CardButton } from '../components/Buttons/CardButton';
import { getProduct } from '../store/index';
import './ProductPage.scss';


export const ProductInfo = () => {
  const [mainImgUrl, setMainImgUrl] = useState<string>();
  const product = useSelector(getProduct);

  useMemo(() => {
    setMainImgUrl(product.images?.[0]);
  }, [product.images]);

  const handleSetMainImg = (imgUrl: string) => {
    setMainImgUrl(imgUrl);
  };

  const PRODUCT_SPEC = [
    {
      spec: 'Screen',
      field: product.display?.screenSize,
    },
    {
      spec: 'Resolution',
      field: product.display?.screenResolution,
    },
    {
      spec: 'Battery',
      field: product.battery?.type,
    },
    {
      spec: 'RAM',
      field: product.storage?.ram,
    },
  ];

  const PRODUCT_SPEC_ADDITIONAL = [
    {
      spec: 'Camera',
      field: product.display?.screenSize,
    },
    {
      spec: 'OS',
      field: product.display?.screenResolution,
    },
    {
      spec: 'Bluetooth',
      field: product.battery?.type,
    },
    {
      spec: 'RAM',
      field: product.storage?.ram,
    },
  ];

  return (
    <>
      <div className="Product">
        <h1 className="Product__title">
          {product.name}
        </h1>
        <div className="Product__top">
          <div className="Product__img-container">
            <ul className="Product__images_list">
              {product.images?.slice(0, 5).map((img: string) => (
                <button
                  className="Product__images_btn"
                  type="button"
                  onClick={() => handleSetMainImg(img)}
                >
                  <li
                    key={img}
                    className={cn('Product__images_item', { Product__image_active: img === mainImgUrl })}
                    style={{ backgroundImage: `url(${img})` }}
                  />
                </button>
              ))}
            </ul>
            <img src={mainImgUrl} alt="main_img" className="Product__img_main" />
          </div>
          <div className="Product__mainInfo">
            <div className="Product__price">
              <h1 className="Product__price_discont">{`$${product.price - product.discount}`}</h1>
              <p className="Product__price_full">{product.discount === 0 ? '' : `$${product.price}` }</p>
            </div>
            <div className="Product__info-wrap">
              <div className="PhoneCard__buttons-container">
                <CardButton product={product} className="Product__button_cart PhoneCard__button" />
                <FavoriteButton item={product} className="Product__button_favorites PhoneCard__button btn" />
              </div>
              <div className="Product__specs">
                {PRODUCT_SPEC.map(spec => (
                  <div className="Product__group">
                    <p className="Product__spec-name">{spec.spec}</p>
                    <p className="Product__spec-info">{spec.field || 'No information'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="Product__info_container">
          <div className="Product__info">
            <h2>About</h2>
            <div className="line" style={{ border: '1px solid #E2E6E9' }} />
            <div className="Product__info-block">
              <h3 className="Product__info_title">Description</h3>
              <p>{product.description}</p>
            </div>
            <div className="Product__info-block">
              <h3 className="Product__info_title">Additional info</h3>
              <p>{product.additionalFeatures}</p>
            </div>
          </div>
          <div className="Product__info_tech">
            <h2>Tech specs</h2>
            <div className="line" style={{ border: '1px solid #E2E6E9' }} />
            <div className="Product__specs">
              {PRODUCT_SPEC.map(({ spec, field }) => (
                <div className="Product__group" key={spec}>
                  <p className="Product__spec-name">{spec}</p>
                  <p className="Product__spec-info">{field || 'No information'}</p>
                </div>
              ))}
              {PRODUCT_SPEC_ADDITIONAL.map(({ spec, field }) => (
                <div className="Product__group" key={spec}>
                  <p className="Product__spec-name">{spec}</p>
                  <p className="Product__spec-info">{field || 'No information'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};
