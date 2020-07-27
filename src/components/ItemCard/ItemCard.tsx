import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Product, ProductDetails } from '../../interfaces';
import { getProducts } from '../../store/index';
import { AddButton } from './AddButton';
import { About } from './About';
import { Gallery } from '../Gallery';
import { Carousel } from '../Carousel';
import { useWindowSize } from '../../helpers/useWindowSize';
import { Options } from './Options';
import { Price } from './Price';
import { Path } from '../Path';
import { getDetails } from '../../helpers/Api';

interface Props {
  id: string;
}

interface ProductWithDetails {
  device: Product;
  details: ProductDetails;
}

export const ItemCard: React.FC<Props> = ({ id }) => {
  const phones: Product[] = useSelector(getProducts);
  const activeDevice = phones.find(phone => phone.id === id);
  const [activeDeviceWithDetails, setActiveDeviceWithDetails] = useState<ProductWithDetails>();
  const width = useWindowSize();
  const perRow = Math.floor((+width - 300) / 285);
  const carouselListWidth = perRow * 285;
  const techDetails = [
    { title: 'Screen', option: activeDeviceWithDetails?.device.screen },
    { title: 'Resolution', option: activeDeviceWithDetails?.details.display.screenResolution },
    { title: 'ScreenSize', option: activeDeviceWithDetails?.details?.display.screenSize },
    { title: 'Camera', option: activeDeviceWithDetails?.details?.camera.primary },
    { title: 'Ram', option: activeDeviceWithDetails?.device.capacity },
    { title: 'Capacity', option: activeDevice?.capacity },
    { title: 'Screen', option: activeDevice?.screen },
  ];

  const generalDetails = [
    { title: 'Screen', option: activeDevice?.screen },
    { title: 'Ram', option: activeDevice?.ram },
    { title: 'Capacity', option: activeDevice?.capacity },
    { title: 'Screen', option: activeDevice?.screen },
  ];

  useEffect(() => {
    const getPhonesDetails = async () => {
      const options = await getDetails<ProductDetails>(id);

      if (activeDevice && options) {
        setActiveDeviceWithDetails({
          device: activeDevice,
          details: options,
        });
      }
    };

    getPhonesDetails();
  }, [id, phones]);

  return (
    <div className="product-card">
      {
        activeDeviceWithDetails && activeDevice && (
          <>
            <Path
              name={activeDeviceWithDetails.device.name}
              id={activeDeviceWithDetails.device.id}
            />
            <h2 className="product-card__title">{activeDeviceWithDetails.device.name}</h2>
            <div className="product-card__container">
              <Gallery
                images={activeDeviceWithDetails.details.images}
                imageUrl={activeDeviceWithDetails.device.imageUrl}
                name={activeDeviceWithDetails.device.name}
              />
              <div className="product-card__description description">
                <p className="description__text">Available colors</p>
                <div className="description__colors">
                  <div className="description__color" />
                  <div className="description__color" />
                </div>
                <div className="line" />

                <p className="description__text">Select capacity</p>
                <button
                  type="button"
                  className="description__capacity"
                >
                  {activeDeviceWithDetails.device.ram}
                </button>
                <span className="line" />
                <Price
                  price={activeDeviceWithDetails.device.price}
                  discount={activeDeviceWithDetails.device.discount}
                />
                <AddButton goodItem={activeDevice} />
                <div className="product-card__details">
                  <Options optionsList={generalDetails} />
                </div>
              </div>
            </div>
            <div className="product-card__container">
              <About
                info={activeDeviceWithDetails.details.additionalFeatures || ''}
                description={activeDeviceWithDetails.details.description || ''}
              />
              <div className="details__container">
                <div className="product-card__details">
                  <h3 className="about__title">Tech specs</h3>
                  <div className="line" />
                  <Options optionsList={techDetails} />
                </div>
              </div>
            </div>
            <Carousel
              width={`${carouselListWidth}`}
              products={phones}
              title="You may also like"
            />
          </>
        )
      }

    </div>
  );
};
