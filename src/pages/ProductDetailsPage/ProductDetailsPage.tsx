import React, {
  useEffect,
  useState,
  useMemo,
} from 'react';

import { useParams } from 'react-router-dom';

import { getDevice } from '../../api/products';
import { BackButton } from '../../components/BackButton/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductsSlider } from '../../components/ProductSlider/ProductsSlider';
import { Device } from '../../types/Device';
import { Product } from '../../types/Product';

import { useLocalStorage } from '../../utils/useLocalStorage';

import {
  ProductDetailsMainInfo,
} from '../../components/ProductDetailsMainInfo/ProductDetailsMainInfo';

import './ProductDetailsPage.scss';
import {
  ProductDetailsInfo,
} from '../../components/ProductDetailsInfo/ProductDetailsInfo';

export const ProductDetailsPage: React.FC = () => {
  const [products] = useLocalStorage<Product[]>('products', []);
  const params = useParams()['*'] || '';
  const [deviceInfo, setDeviceInfo] = useState<Device | null>(null);

  const device = useMemo(() => {
    return products.find(product => product.phoneId === deviceInfo?.id);
  }, [deviceInfo]);

  const [devicePhoto, setDevicePhoto] = useState(device?.image);

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
                  <img
                    src={`new/${photo}`}
                    alt="#"
                    aria-hidden="true"
                    key={photo}
                    className="product-details__set-photo"
                    onClick={() => setDevicePhoto(`new/${photo}`)}
                  />
                ))}
              </div>

              <img
                src={devicePhoto || `new/${device.image}`}
                alt="#"
                className="product-details__photo"
              />

              <ProductDetailsMainInfo
                deviceInfo={deviceInfo}
                device={device}
              />
            </div>

            <ProductDetailsInfo deviceInfo={deviceInfo} />

          </div>
        )}
      </div>

      <ProductsSlider products={products} title="You may also like" />
    </main>
  );
};
