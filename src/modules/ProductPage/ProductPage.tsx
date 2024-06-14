/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { client } from '../../api';
import { Device } from '../../types/Device';
import { AddBlock } from '../shared/Buttons/AddBlock';
import { Price } from '../shared/Price';
import { SpecsItem } from '../shared/SpecsItem';
import { DescriptionList } from './DescriptionList';
import { ProductListCarousel } from '../shared/ProductListCarousel';
import { Product } from '../../types/Product';
import { PRODUCT_URL } from "../constants/URL's/URL's";
import { getRandomNumbers } from '../../services/getRandomNumbers';
import { BackButton } from '../shared/Buttons/MoveButtons';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { Loader } from '../shared/Loader';
import { AvaliableItems } from './AvaliableItems';
import { ImagePreview } from './ImagePreview';
import { getSimilarDevices } from '../../services/getSimilarDevice';
import { CartItem } from '../../types/CartItem';

type Specs = {
  [key: string]: string | string[];
};

export const ProductPage: React.FC = React.memo(() => {
  const { itemId } = useParams();
  const { state, pathname } = useLocation();
  const navigate = useNavigate();

  const category = pathname.split('/')[1];
  const nameDevice = pathname.split('/')[2].split('-').slice(0, -2).join('-');

  const [device, setDevice] = useState<Device>();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  const [shortSpecs, setShortSpecs] = useState<Specs>();
  const [fullSpecs, setFullSpecs] = useState<Specs>();

  const [loadedDevice, setLoadedDevice] = useState(false);
  const [errorLoadedDevice, setErrorLoadedDevice] = useState(false);
  const [updatedDevice, setUpdatedDevice] = useState(false);
  const [loadedSuggestedProduct, setLoadedSuggestedProduct] = useState(false);

  const heightPreview = useRef<HTMLDivElement>(null);

  const cartItem: CartItem = {
    itemId: itemId || '',
    name: device?.name || '',
    image: device?.images[0] || '',
    currentPrice: state
      ? device?.priceDiscount || 0
      : device?.priceRegular || 0,
    discount: state,
    id: 0,
  };

  useEffect(() => {
    setErrorLoadedDevice(false);

    if (!device || device.namespaceId !== nameDevice) {
      setLoadedDevice(false);
    }

    client
      .get<Device[]>(`api/${category}.json`)
      .then(data => {
        const getDevice = data.find(dev => itemId === dev.id);

        if (!getDevice) {
          setErrorLoadedDevice(true);

          return;
        }

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
        setLoadedDevice(true);
        setUpdatedDevice(true);
      })
      .catch(() => setErrorLoadedDevice(true));
  }, [category, itemId, nameDevice]);

  useEffect(() => {
    setLoadedSuggestedProduct(false);

    client
      .get<Product[]>(PRODUCT_URL)
      .then(data => {
        const idxSmlrDvcs: number[] = [];

        data.forEach((product, i) => {
          getSimilarDevices(product, nameDevice, idxSmlrDvcs, i);
        });

        const randomNumbers = getRandomNumbers(0, data.length, 30, idxSmlrDvcs);

        const randomSuggestedProducts = randomNumbers.map(index => data[index]);

        setSuggestedProducts(randomSuggestedProducts);
        setLoadedSuggestedProduct(true);
      })
      .catch(() => {}); // setError
  }, [nameDevice]);

  return (
    <div className="product-page">
      <div className="product-page__route">
        <Breadcrumbs category={category} name={device?.name} />
      </div>

      <div className="product-page__back">
        <BackButton move={() => navigate(-1)} />
      </div>

      {loadedDevice && !errorLoadedDevice && device && (
        <div
          className="product-page__container"
          style={
            loadedDevice ? { transition: 'none' } : { transition: 'all 0.3s' }
          }
        >
          <h1 className="product-page__title secondary-title">{device.name}</h1>

          <div
            className="product-page__image-preview"
            ref={heightPreview}
            style={
              updatedDevice
                ? {}
                : { height: `${heightPreview.current?.clientHeight}px` }
            }
          >
            {updatedDevice ? <ImagePreview device={device} /> : <Loader />}
          </div>

          <div
            className="product-page__avaliable-container
                product-page__avaliable-container--1"
          >
            <div className="product-page__avaliable-title">
              <span>Avaliable colors</span>
              <span>ID: 496827</span>
            </div>
            <AvaliableItems
              device={device}
              colors
              discount={state}
              onUpdateDevice={() => setUpdatedDevice(false)}
            />
          </div>

          <div
            className="product-page__avaliable-container
                product-page__avaliable-container--2"
          >
            <div className="product-page__avaliable-title">Selest capacity</div>
            <AvaliableItems
              device={device}
              colors={false}
              discount={state}
              onUpdateDevice={() => setUpdatedDevice(false)}
            />
          </div>

          <div className="product-page__price">
            <Price
              discount={state}
              priceDiscount={device.priceDiscount}
              fullPrice={device.priceRegular}
            />
          </div>

          <div className="product-page__add-block">
            <AddBlock cartItem={cartItem} />
          </div>

          <div
            className="product-page__tech-specs
                product-page__tech-specs--1"
          >
            {shortSpecs &&
              Object.entries(shortSpecs).map(prop => (
                <SpecsItem prop={prop} key={prop[0]} />
              ))}
          </div>

          <div className="product-page__description">
            <h3 className="product-page__description-title tertiary-title">
              About
            </h3>
            <DescriptionList description={device.description} />
          </div>

          <div
            className="product-page__tech-specs
                product-page__tech-specs--2"
          >
            <h3 className="product-page__description-title tertiary-title">
              Tech specs
            </h3>
            {fullSpecs &&
              Object.entries(fullSpecs).map(
                prop => prop[1] && <SpecsItem prop={prop} key={prop[0]} />,
              )}
          </div>
        </div>
      )}

      {!loadedDevice && !errorLoadedDevice && (
        <div className="product-page__loader">
          <Loader />
        </div>
      )}

      {errorLoadedDevice && (
        <div className="product-page__not-found-wrapper">
          <img
            src="/img/product-not-found.png"
            alt="Device not found"
            className="product-page__product-not-found"
          />
        </div>
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
