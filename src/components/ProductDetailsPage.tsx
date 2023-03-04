/* eslint-disable max-len */
import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../api/api';
import { Device } from '../types/Device';
import { Product } from '../types/Product';
import { Header } from './Header';
import '../styles/productDetailsPage.scss';
import { Breadcrumbs } from './Breadcrumbs';
import { BackButton } from './BackButton';
import { CartButton } from './CartButton';
import { LikeButton } from './LikeButton';
import { ProductsSlider } from './ProductsSlider';
import { Footer } from './Footer';

type Props = {
  products: Product[],
};

export const ProductDetailsPage: FC<Props> = ({ products }) => {
  const { productId = '' } = useParams();
  const [foundGadget, setFoundGadget] = useState<Device | null>(null);
  const device = products.find(product => product.id === foundGadget?.id);
  const [gadgetPhoto, setgGadgetPhoto] = useState(device?.imageUrl);
  const [isloading, setIsLoading] = useState(false);

  const foundId = products.find((product) => product.id === productId);

  const loadDevices = async () => {
    try {
      setIsLoading(true);
      const data = await getProduct(productId);

      setFoundGadget(data);
    } catch {
      Promise.reject(new Error('error'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDevices();
  }, []);

  return (
    <>
      <Header />
      <main className="container">
        {!isloading ? (
          <>
            <div className="product-details-page">
              <Breadcrumbs />
              <BackButton />
              {!foundId && (
                <>
                  <h2 className="product-details__problem">It&apos;s fuckin problem</h2>
                </>
              )}
              {foundId && device && foundGadget && (
                <div className="product-details">
                  <h2 className="product-details__title">{foundGadget.name}</h2>
                  <div className="product-details__content">
                    <div className="product-details__photos">
                      {foundGadget.images.map(photo => (
                        <button
                          type="button"
                          onClick={() => setgGadgetPhoto(photo)}
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
                    <img
                      src={gadgetPhoto || device.imageUrl}
                      alt="#"
                      className="product-details__photo"
                    />
                    <div className="product-details__main-info">
                      <p className="products-slider__item-price">
                        <span className="products-slider__item-current-price">
                          {`$${device.price - ((device.price / 100) * device.discount)}`}
                        </span>
                        {device.price !== (device.price - ((device.price / 100) * device.discount)) && (
                          <span className="products-slider__item-old-price">
                            {`$${device.price}`}
                          </span>
                        )}
                      </p>
                      <div className="products-slider__item-buttons">
                        <CartButton product={device} />
                        <LikeButton id={device.id} product={device} />
                      </div>
                      <br />
                      <p className="product-details__data">
                        Screen
                        <span>
                          {foundGadget.display.screenSize}
                        </span>
                      </p>
                      <p className="product-details__data">
                        Resolution
                        <span>
                          {foundGadget.display.screenResolution}
                        </span>
                      </p>
                      <p className="product-details__data">
                        Processor
                        <span>
                          {foundGadget.hardware.cpu}
                        </span>
                      </p>
                      <p className="product-details__data">
                        RAM
                        <span>
                          {foundGadget.storage.ram}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="product-details__info">
                    <div className="product-details__about" data-cy="productDescription">
                      <h2 className="product-details__subtitle">About</h2>
                      <br />
                      <p className="product-details__text">{foundGadget.description}</p>
                    </div>
                    <div className="product-details__specs">
                      <h2 className="product-details__subtitle">Tech specs</h2>
                      <br />
                      <p className="product-details__data">
                        Screen
                        <span>
                          {foundGadget.display.screenSize}
                        </span>
                      </p>
                      <p className="product-details__data">
                        Resolution
                        <span>
                          {foundGadget.display.screenResolution}
                        </span>
                      </p>
                      <p className="product-details__data">
                        Processor
                        <span>
                          {foundGadget.hardware.cpu}
                        </span>
                      </p>
                      <p className="product-details__data">
                        RAM
                        <span>
                          {foundGadget.storage.ram}
                        </span>
                      </p>
                      <p className="product-details__data">
                        Built in memory
                        <span>
                          {foundGadget.storage.flash}
                        </span>
                      </p>
                      <p className="product-details__data">
                        Camera
                        <span>
                          {foundGadget.camera.primary}
                        </span>
                      </p>
                      <p className="product-details__data">
                        Cell
                        <span>
                          {foundGadget.connectivity.cell || '-'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <ProductsSlider products={products} title="You may also like" />
          </>
        ) : (
          <div className="product-details__loader">
            <i className="fas fa-circle-notch fa-spin" />
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};
