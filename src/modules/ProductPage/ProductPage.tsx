/* eslint-disable max-len */
// #region import
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import cn from 'classnames';
import { client } from '../../api';
import { Device } from '../../types/Device';
import { AddBlock } from '../shared/Buttons/AddBlock';
import { AvaliableContainer } from './AvaliableContainer';
import { Price } from '../shared/Price';
import { SpecsList } from '../shared/SpecsList';
import { DescriptionList } from './DescriptionList';
import { ProductListCarousel } from '../shared/ProductListCarousel';
import { Product } from '../../types/Product';
import { PRODUCT_URL } from "../constants/URL's/URL's";
import { getRandomNumbers } from '../../services/getRandomNumbers';
import { BackButton } from '../shared/Buttons/MoveButtons';
import { Route } from '../shared/Route';
import { Loader } from '../shared/Loader';
// #endregion import

type Props = {
  category: string;
};

type Specs = {
  [key: string]: string | string[];
};

export const ProductPage: React.FC<Props> = React.memo(({ category }) => {
  const { itemId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [device, setDevice] = useState<Device>();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  const [shortSpecs, setShortSpecs] = useState<Specs>();
  const [fullSpecs, setFullSpecs] = useState<Specs>();

  const [dataLoadedDevice, setDataLoadedDevice] = useState(false);
  const [loadedSuggestedProduct, setLoadedSuggestedProduct] = useState(false);

  useEffect(() => {
    setDataLoadedDevice(false);

    client
      .get<Device[]>(`api/${category}.json`)
      .then(data => {
        const getDevice = data.find(dev => itemId === dev.id);

        if (getDevice) {
          const {
            screen,
            resolution,
            processor,
            ram,
            capacity,
            camera,
            zoom,
            cell,
          } = getDevice;

          setShortSpecs({ screen, resolution, processor, ram });
          setFullSpecs({
            screen,
            resolution,
            processor,
            ram,
            capacity,
            camera,
            zoom,
            cell,
          });
        }

        setDevice(getDevice);
        setDataLoadedDevice(true);
      })
      .catch(() => {
        // console.log('error');
      });
  }, [category, itemId]);

  useEffect(() => {
    setLoadedSuggestedProduct(false);

    client
      .get<Product[]>(PRODUCT_URL)
      .then(data => {
        const randomNumbers = getRandomNumbers(0, 194, 30);
        const randomsuggestedProducts = randomNumbers.map(index => data[index]);

        setSuggestedProducts(randomsuggestedProducts);
        setLoadedSuggestedProduct(true);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="product-page">
      <div className="product-page__route">
        <Route category={category} name={device?.name} />
      </div>

      <div className="product-page__back">
        <BackButton move={() => navigate(-1)} />
      </div>

      {!dataLoadedDevice ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        device && (
          <div className="product-page__container">
            <h1 className="product-page__title secondary-title">
              {device.name}
            </h1>

            <div className="product-page__main-img-wrapper">
              <img
                className="product-page__main-img"
                src={device.images[0]}
                alt={device.namespaceId}
              />
            </div>

            <div className="product-page__preview">
              {device.images.map(img => (
                <div
                  className={cn('product-page__img-wrapper', {
                    // 'is-active': true,
                  })}
                  key={img}
                >
                  <img
                    src={img}
                    alt={device.name}
                    className="product-page__img"
                  />
                </div>
              ))}
            </div>

            <div className="product-page__avaliable-container product-page__avaliable-container--1">
              <div className="product-page__avaliable-title">
                <span>Avaliable colors</span>
                <span>ID: 496827</span>
              </div>
              <AvaliableContainer property={device.colorsAvailable} colors />
            </div>

            <div className="product-page__avaliable-container product-page__avaliable-container--2">
              <div className="product-page__avaliable-title">
                Selest capacity
              </div>
              <AvaliableContainer
                property={device.capacityAvailable}
                colors={false}
              />
            </div>

            <div className="product-page__price">
              <Price
                discount={state.discount}
                priceDiscount={device.priceDiscount}
                fullPrice={device.priceRegular}
              />
            </div>

            <div className="product-page__add-block">
              <AddBlock />
            </div>

            <div className="product-page__tech-specs product-page__tech-specs--1">
              {shortSpecs &&
                Object.entries(shortSpecs).map(prop => (
                  <SpecsList prop={prop} key={prop[0]} />
                ))}
            </div>

            <div className="product-page__description">
              <h3 className="product-page__description-title tertiary-title">
                About
              </h3>
              <DescriptionList description={device.description} />
            </div>

            <div className="product-page__tech-specs product-page__tech-specs--2">
              <h3 className="product-page__description-title tertiary-title">
                Tech specs
              </h3>
              {fullSpecs &&
                Object.entries(fullSpecs).map(
                  prop => prop[1] && <SpecsList prop={prop} key={prop[0]} />,
                )}
            </div>
          </div>
        )
      )}

      {loadedSuggestedProduct && (
        <ProductListCarousel
          title="You may also like"
          products={suggestedProducts}
          dataLoaded={loadedSuggestedProduct}
          discount={false}
        />
      )}
    </div>
  );
});
