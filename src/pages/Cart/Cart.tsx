import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { getDevice } from '../../api/api';
import { Device, Product } from '../../type';
import '../../container.scss';
import '../../styles/styles.scss';
import './Cart.scss';
import { NavPages } from '../../components/NavPages/NavPages';
import { SliderProducts } from '../../components/SliderProducts/SliderProducts';
import { AddButtonCard } from '../../helpers/AddButtonCard/AddButtonCard';
import { FavouritesButton } from
  '../../helpers/FavouritesButton/FavouritesButton';
import { Back } from '../../components/Back/Back';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

interface Props {
  products: Product[]
}

export const Cart: React.FC<Props> = ({ products }) => {
  const params = useParams()['*'] || '';
  const [productInf, setProductInf] = useState<Device>();
  const location = useLocation();
  const pathname = location.pathname.split('/');
  const productCart = products.find(product => product.id === pathname[2]);
  const [imageCart, setImage] = useState(productCart?.imageUrl);

  useEffect(() => {
    getDevice(params)
      .then(setProductInf);
  }, [params]);

  return (
    <>
      <Header />
      <main className="cart">
        <div className="container">
          <NavPages />
          <Back />
          <h1 className="cart__title h1">{productCart?.name}</h1>
          <div className="cart__wrapper">
            <div className="cart__list">
              {productInf?.images.map(image => (
                <button
                  type="button"
                  key={image}
                  className="cart__item"
                  onClick={() => setImage(image)}
                >
                  <img src={image} alt="imageCart" />
                </button>
              ))}
            </div>
            <img
              src={imageCart || productCart?.imageUrl}
              alt="pictureCart"
              className="cart__image"
            />
            <div className="cart__functional">
              <div className="cart__price">
                {productCart?.newPrice !== productCart?.price && (
                  <p className="cart__newPrice">
                    $
                    {productCart?.newPrice}
                  </p>
                )}
                <p className={classNames({
                  cart__oldPrice: productCart?.newPrice !== productCart?.price,
                  cart__newPrice: productCart?.newPrice === productCart?.price,
                })}
                >
                  $
                  {productCart?.price}
                </p>
              </div>
              <div className="cart__button">
                {productCart
                  && (
                    <AddButtonCard
                      cart={false}
                      product={productCart}
                    />
                  )}
                {productCart
                  && (
                    <FavouritesButton
                      cart={false}
                      product={productCart}
                    />
                  )}
              </div>
              <div className="cart__characteristic smalltext">
                <p className="cart__name">Screen</p>
                <p className="cart__value">{productCart?.screen}</p>
              </div>
              <div className="cart__characteristic smalltext">
                <p className="cart__name">Resolution</p>
                <p className="cart__value">
                  {productInf?.display.screenResolution}
                </p>
              </div>
              <div className="cart__characteristic smalltext">
                <p className="cart__name">Processor</p>
                <p className="cart__value">{productInf?.hardware.cpu}</p>
              </div>
              <div className="cart__characteristic smalltext">
                <p className="cart__name">RAM</p>
                <p className="cart__value">{productCart?.ram}</p>
              </div>
            </div>
          </div>
          <div className="cart__content">
            <div className="cart__about">
              <h2 className="cart__subtitle h2">About</h2>
              <div className="cart__line" />
              <div className="cart__about--text bodytext">
                {productInf?.description}
              </div>
            </div>
            <div className="cart__specs">
              <h2 className="cart__subtitle h2">Tech specs</h2>
              <div className="cart__line cart__specs--line" />
              <div className="cart__characteristic smalltext">
                <p className="cart__name">Screen</p>
                <p className="cart__value">{productCart?.screen}</p>
              </div>
              <div className="cart__characteristic smalltext">
                <p className="cart__name">Resolution</p>
                <p className="cart__value">
                  {productInf?.display.screenResolution}
                </p>
              </div>
              <div className="cart__characteristic smalltext">
                <p className="cart__name">Processor</p>
                <p className="cart__value">{productInf?.hardware.cpu}</p>
              </div>
              <div className="cart__characteristic smalltext">
                <p className="cart__name">RAM</p>
                <p className="cart__value">{productCart?.ram}</p>
              </div>
              <div className="cart__characteristic smalltext">
                <p className="cart__name">Built in memory</p>
                <p className="cart__value">{productInf?.storage.flash}</p>
              </div>
              <div className="cart__characteristic smalltext">
                <p className="cart__name">Camera</p>
                <p className="cart__value">{productInf?.camera.primary}</p>
              </div>
              <div className="cart__characteristic smalltext">
                <p className="cart__name">Battery</p>
                <p className="cart__value">{productInf?.battery.type}</p>
              </div>
            </div>
          </div>
          <SliderProducts products={products} title="You may also like" />
        </div>
      </main>
      <Footer />
    </>
  );
};
