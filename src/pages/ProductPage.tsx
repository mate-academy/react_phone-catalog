import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProducts } from '../store/index';
import { getProduct } from '../helpers/api';
import './ProductPage.scss';
import Loader from '../helpers/Loader/Loader';
import { PhonesSlider } from '../components/PhonesSlider/PhonesSlider';
import { FavoriteButton } from '../components/Buttons/FavoriveButton';
import { CardButton } from '../components/Buttons/CardButton';

export const ProductPage = () => {
  const { productId } = useParams();
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const [mainImgUrl, setMainImgUrl] = useState<string>(`img/phones/${productId}.0.jpg`);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();
  const products = useSelector(getProducts);
  const prod = products.find((product: Products) => product.id === productId);
  const [type, setType] = useState('');
  const productPrice = prod?.price || 0;
  const productDiscount = prod?.discount || 0;
  const favorites = prod?.favorites;
  const toCard = prod?.toCard;
  const priceWithDiscount = productPrice - productDiscount;

  useEffect(() => {
    switch (prod.type) {
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
  }, [prod.type]);


  useEffect(() => {
    window.scrollTo({ top: 0 });
    try {
      getProduct(productId)
        .then(data => setCurrentProduct(data));
      setIsLoading(true);
    } catch (error) {
      // catch error
    }
  }, [productId]);

  const handleSetMainImg = (imgUrl: string) => {
    setMainImgUrl(imgUrl);
  };

  const backLink = location.pathname.replace(`/${productId}`, '');

  return (
    <>
      {!isLoading ? <Loader /> : (
        <section className="section">

          <div className="container">
            <section className="wrap__container">
              <section className="Breadcrumbs">
                <Link to="/home">
                  <img src="img/Home.png" alt="home_icon" className="Breadcrumbs__icon" />
                </Link>
                <img src="img/stroke_right.png" alt="stroke" className="Breadcrumbs__link-image" />
                <Link to={`/${type}`} className="Breadcrumbs__link">
                  <p className="Breadcrumbs__link-name">{type[0].toUpperCase() + type.slice(1)}</p>
                </Link>
                <img src="img/stroke_right.png" alt="stroke" className="Breadcrumbs__link-image" />
                <p className="Breadcrumbs__active">
                  {prod.name}
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
                {currentProduct?.name}
              </h1>
              <div className="Product__top">
                <div className="Product__img-container">
                  <ul className="Product__images_list">
                    {currentProduct?.images.slice(0, 5).map((img: string) => (
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
                    <h1 className="Product__price_discont">{`$${priceWithDiscount}`}</h1>
                    <p className="Product__price_full">{productDiscount === 0 ? '' : productPrice }</p>
                  </div>
                  <div className="Product__info-wrap">
                    <div className="PhoneCard__buttons-container">
                      <CardButton id={productId} inCard={toCard} className="Product__button PhoneCard__button" />
                      <FavoriteButton id={productId} favorites={favorites} className="Product__button_favorites" />
                    </div>
                    <div className="Product__specs">
                      <div className="Product__group">
                        <p className="Product__spec-name">Screen</p>
                        <p className="Product__spec-info">{currentProduct?.display.screenResolution}</p>
                      </div>
                      <div className="Product__group">
                        <p className="Product__spec-name">Resolution</p>
                        <p className="Product__spec-info">{currentProduct?.display.screenSize}</p>
                      </div>
                      <div className="Product__group">
                        <p className="Product__spec-name">Battery</p>
                        <p className="Product__spec-info">{currentProduct?.battery.type}</p>
                      </div>
                      <div className="Product__group">
                        <p className="Product__spec-name">RAM</p>
                        <p className="Product__spec-info">{currentProduct?.storage.ram || 'no information'}</p>
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
                    <p>{currentProduct?.description}</p>
                  </div>
                  <div className="Product__info-block">
                    <h3 className="Product__info_title">Additional info</h3>
                    <p>{currentProduct?.additionalFeatures}</p>
                  </div>
                </div>
                <div className="Product__info_tech">
                  <h2>Tech specs</h2>
                  <div className="line" style={{ border: '1px solid #E2E6E9' }} />
                  <div className="Product__specs">
                    <div className="Product__group">
                      <p className="Product__spec-name">Screen</p>
                      <p className="Product__spec-info">{currentProduct?.display.screenResolution}</p>
                    </div>
                    <div className="Product__group">
                      <p className="Product__spec-name">Resolution</p>
                      <p className="Product__spec-info">{currentProduct?.display.screenSize}</p>
                    </div>
                    <div className="Product__group">
                      <p className="Product__spec-name">Battery</p>
                      <p className="Product__spec-info">{currentProduct?.battery.type}</p>
                    </div>
                    <div className="Product__group">
                      <p className="Product__spec-name">RAM</p>
                      <p className="Product__spec-info">{currentProduct?.storage.ram || 'no information'}</p>
                    </div>
                    <div className="Product__group">
                      <p className="Product__spec-name">Camera</p>
                      <p className="Product__spec-info">{currentProduct?.camera.primary || 'no information'}</p>
                    </div>
                    <div className="Product__group">
                      <p className="Product__spec-name">OS</p>
                      <p className="Product__spec-info">{currentProduct?.android.os || 'no information'}</p>
                    </div>
                    <div className="Product__group">
                      <p className="Product__spec-name">Bluetooth</p>
                      <p className="Product__spec-info">{currentProduct?.connectivity.bluetooth || 'no information'}</p>
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
