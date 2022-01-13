import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDevice } from '../../api/api';
import { BackButton } from '../../Components/BackButton/BackButton';
import { Breadcrumbs } from '../../Components/Breadcrumbs/Breadcrumbs';
import { Footer } from '../../Components/Footer/Footer';
import { Header } from '../../Components/Header/Header';
import { ProductsSlider } from '../../Components/ProductsSlider/ProductsSlider';
import { Device } from '../../types/Device';
import { Product } from '../../types/Product';

import './ProductDetailsPage.scss';
import { AddCartButton } from '../../Components/AddCartButton/AddCartButton';
import { AddFavoriteButton } from '../../Components/AddFavoriteButton/AddFavoriteButton';

type Props = {
  products: Product[],
};

export const ProductDetailsPage: React.FC<Props> = ({ products }) => {
  const params = useParams()['*'] || '';
  const [deviceInfo, setDeviceInfo] = useState<Device | null>(null);

  const device = products.find(product => product.id === deviceInfo?.id);

  const [devicePhoto, setDevicePhoto] = useState(device?.imageUrl);

  const fetchDevice = async () => {
    try {
      const deviceFromServer = await getDevice(params);

      setDeviceInfo(deviceFromServer);
    } catch {
      Promise.reject(new Error('error'));
    }
  };

  useEffect(() => {
    fetchDevice();
    setDevicePhoto('');
  }, [params]);

  return (
    <>
      <Header />
      <main className="container">
        <div className="product-details-page">
          <Breadcrumbs />
          <BackButton />
          {device && deviceInfo && (
            <div className="product-details">
              <h2 className="product-details__title">{deviceInfo.name}</h2>
              <div className="product-details__content">
                <div className="product-details__photos">
                  {deviceInfo.images.map(photo => (
                    <button
                      type="button"
                      onClick={() => setDevicePhoto(photo)}
                      key={photo}
                      className="product-details__set-photo"
                    >
                      <img
                        src={photo}
                        alt="#"
                      />
                    </button>
                  ))}
                </div>
                <img src={devicePhoto || device.imageUrl} alt="#" className="product-details__photo" />
                <div className="product-details__main-info">
                  <p className="products-slider__item-price">
                    <span className="products-slider__item-current-price">{`$${device.newPrice}`}</span>
                    {device?.price !== device?.newPrice && (
                      <span className="products-slider__item-old-price">{`$${device.price}`}</span>
                    )}
                  </p>
                  <div className="products-slider__item-buttons">
                    <AddCartButton product={device} />
                    <AddFavoriteButton product={device} />
                  </div>
                  <br />
                  <p className="product-details__data">
                    Screen
                    <span>
                      {deviceInfo.display.screenSize}
                    </span>
                  </p>
                  <p className="product-details__data">
                    Resolution
                    <span>
                      {deviceInfo.display.screenResolution}
                    </span>
                  </p>
                  <p className="product-details__data">
                    Processor
                    <span>
                      {deviceInfo.hardware.cpu}
                    </span>
                  </p>
                  <p className="product-details__data">
                    RAM
                    <span>
                      {deviceInfo.storage.ram}
                    </span>
                  </p>
                </div>
              </div>
              <div className="product-details__info">
                <div className="product-details__about">
                  <h2 className="product-details__subtitle">About</h2>
                  <br />
                  <p className="product-details__text">{deviceInfo.description}</p>
                </div>
                <div className="product-details__specs">
                  <h2 className="product-details__subtitle">Tech specs</h2>
                  <br />
                  <p className="product-details__data">
                    Screen
                    <span>
                      {deviceInfo.display.screenSize}
                    </span>
                  </p>
                  <p className="product-details__data">
                    Resolution
                    <span>
                      {deviceInfo.display.screenResolution}
                    </span>
                  </p>
                  <p className="product-details__data">
                    Processor
                    <span>
                      {deviceInfo.hardware.cpu}
                    </span>
                  </p>
                  <p className="product-details__data">
                    RAM
                    <span>
                      {deviceInfo.storage.ram}
                    </span>
                  </p>
                  <p className="product-details__data">
                    Built in memory
                    <span>
                      {deviceInfo.storage.flash}
                    </span>
                  </p>
                  <p className="product-details__data">
                    Camera
                    <span>
                      {deviceInfo.camera.primary}
                    </span>
                  </p>
                  <p className="product-details__data">
                    Cell
                    <span>
                      {deviceInfo.connectivity.cell || '-'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <ProductsSlider products={products} title="You may also like" />
      </main>
      <Footer />
    </>
  );
};
