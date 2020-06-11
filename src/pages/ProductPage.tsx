import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useLocation, Link } from 'react-router-dom';
import { loadProductInfo } from '../helpers/api';
import { FavoriteButton } from '../components/Buttons/FavoriveButton';
import { PhonesSlider } from '../components/PhonesSlider/PhonesSlider';
import { CardButton } from '../components/Buttons/CardButton';
import { getProducts } from '../store/index';
import Loader from '../helpers/Loader/Loader';
import './ProductPage.scss';

export const ProductPage = () => {
  const products = useSelector(getProducts);
  const [product, setProduct] = useState<any>({});
  const { productId } = useParams();
  const location = useLocation();
  const [type, setType] = useState('');
  const [mainImgUrl, setMainImgUrl] = useState<string>();

  useEffect(() => {
    switch (product.type) {
      case 'phone':
        setType('phones');
        break;
      case 'tablet':
        setType('tablets');
        break;
      case 'accessories':
        setType('accessories');
        break;
      default:
    }
  }, [product.type]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    try {
      loadProductInfo(productId).then(data => setProduct(data));
    } catch (error) {
      // catch error
    }
  }, [productId]);

  useMemo(() => {
    setMainImgUrl(product.info?.images[0]);
  }, [product.info]);

  const handleSetMainImg = (imgUrl: string) => {
    setMainImgUrl(imgUrl);
  };

  const backLink = location.pathname.replace(`/${productId}`, '');

  return (
    <>
      {product === 'null' ? <Loader /> : (
        <section className="section">
          <div className="container">
            <section className="wrap__container">
              <section className="Breadcrumbs">
                <Link to="/home">
                  <img src="img/Home.png" alt="home_icon" className="Breadcrumbs__icon" />
                </Link>
                <img src="img/stroke_right.png" alt="stroke" className="Breadcrumbs__link-image" />
                <Link to={`/${type}`} className="Breadcrumbs__link">
                  <p className="Breadcrumbs__link-name">{type[0]?.toUpperCase() + type.slice(1)}</p>
                </Link>
                <img src="img/stroke_right.png" alt="stroke" className="Breadcrumbs__link-image" />
                <p className="Breadcrumbs__active">
                  {product.name}
                </p>
              </section>
            </section>
            <Link
              className="backlink"
              to={backLink}
            >
              Back
            </Link>
            <div className="Product">
              <h1 className="Product__title">
                {product.name}
              </h1>
              <div className="Product__top">
                <div className="Product__img-container">
                  <ul className="Product__images_list">
                    {product.info?.images.slice(0, 5).map((img: string) => (
                      <li
                        onClick={() => handleSetMainImg(img)}
                        key={img}
                        className="Product__images_item"
                        style={{ backgroundImage: `url(${img})` }}
                      />
                    ))}
                  </ul>
                  <div
                    className="Product__img_main"
                    style={{ backgroundImage: `url(${mainImgUrl})` }}
                  />
                </div>
                <div className="Product__mainInfo">
                  <div className="Product__price">
                    <h1 className="Product__price_discont">{`$${product.price - product.discount}`}</h1>
                    <p className="Product__price_full">{product.discount === 0 ? '' : `$${product.price}` }</p>
                  </div>
                  <div className="Product__info-wrap">
                    <div className="PhoneCard__buttons-container">
                      <CardButton product={product} className="Product__button PhoneCard__button" />
                      <FavoriteButton item={product} className="Product__button_favorites" />
                    </div>
                    <div className="Product__specs">
                      <div className="Product__group">
                        <p className="Product__spec-name">Screen</p>
                        <p className="Product__spec-info">{product.info?.display.screenResolution}</p>
                      </div>
                      <div className="Product__group">
                        <p className="Product__spec-name">Resolution</p>
                        <p className="Product__spec-info">{product.info?.display.screenSize}</p>
                      </div>
                      <div className="Product__group">
                        <p className="Product__spec-name">Battery</p>
                        <p className="Product__spec-info">{product.info?.battery.type}</p>
                      </div>
                      <div className="Product__group">
                        <p className="Product__spec-name">RAM</p>
                        <p className="Product__spec-info">{product.info?.storage.ram || 'no information'}</p>
                      </div>
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
                    <p>{product.info?.description}</p>
                  </div>
                  <div className="Product__info-block">
                    <h3 className="Product__info_title">Additional info</h3>
                    <p>{product.info?.additionalFeatures}</p>
                  </div>
                </div>
                <div className="Product__info_tech">
                  <h2>Tech specs</h2>
                  <div className="line" style={{ border: '1px solid #E2E6E9' }} />
                  <div className="Product__specs">
                    <div className="Product__group">
                      <p className="Product__spec-name">Screen</p>
                      <p className="Product__spec-info">{product.info?.display.screenResolution}</p>
                    </div>
                    <div className="Product__group">
                      <p className="Product__spec-name">Resolution</p>
                      <p className="Product__spec-info">{product.info?.display.screenSize}</p>
                    </div>
                    <div className="Product__group">
                      <p className="Product__spec-name">Battery</p>
                      <p className="Product__spec-info">{product.info?.battery.type}</p>
                    </div>
                    <div className="Product__group">
                      <p className="Product__spec-name">RAM</p>
                      <p className="Product__spec-info">{product.info?.storage.ram || 'no information'}</p>
                    </div>
                    <div className="Product__group">
                      <p className="Product__spec-name">Camera</p>
                      <p className="Product__spec-info">{product.info?.camera.primary || 'no information'}</p>
                    </div>
                    <div className="Product__group">
                      <p className="Product__spec-name">OS</p>
                      <p className="Product__spec-info">{product.info?.android.os || 'no information'}</p>
                    </div>
                    <div className="Product__group">
                      <p className="Product__spec-name">Bluetooth</p>
                      <p className="Product__spec-info">{product.info?.connectivity.bluetooth || 'no information'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PhonesSlider title="You may also like" products={products} />

        </section>
      )}
    </>
  );
};
