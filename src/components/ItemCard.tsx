import React from 'react';
import { useSelector } from 'react-redux';
import { Phone } from '../interfaces';
import { getPhones } from '../store/index';
import { AddButton } from './AddButton';
import { About } from './About';
import { Gallery } from './Gallery';
import { Carousel } from './Carousel';
import { useWindowSize } from '../helpers/useWindowSize';
import { Options } from './Options';
import { Price } from './Price';
import { Path } from './Path';

interface Props {
  id: string;
}

export const ItemCard: React.FC<Props> = ({ id }) => {
  const phones: Phone[] = useSelector(getPhones);
  const activePhone = phones.find(phone => phone.id === id);
  const width = useWindowSize();
  const perRow = Math.floor((+width - 300) / 285);
  const carouselListWidth = perRow * 285;
  const techDetails = [
    { title: 'Screen', option: activePhone?.screen },
    { title: 'Resolution', option: activePhone?.details?.display.screenResolution },
    { title: 'ScreenSize', option: activePhone?.details?.display.screenSize },
    { title: 'Camera', option: activePhone?.details?.camera.primary },
    { title: 'Ram', option: activePhone?.ram },
    { title: 'Capacity', option: activePhone?.capacity },
    { title: 'Screen', option: activePhone?.screen },
  ];

  const generalDetails = [
    { title: 'Screen', option: activePhone?.screen },
    { title: 'Ram', option: activePhone?.ram },
    { title: 'Capacity', option: activePhone?.capacity },
    { title: 'Screen', option: activePhone?.screen },
  ];

  return (
    <div className="product-card">
      {
        activePhone && (
          <>
            <Path activePhone={activePhone} />
            <h2 className="product-card__title">{activePhone.name}</h2>
            <div className="product-card__container">
              <Gallery activePhone={activePhone} />
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
                  {activePhone.ram}
                </button>
                <span className="line" />
                <Price price={activePhone.price} discount={activePhone.discount} />
                <AddButton goodItem={activePhone} />
                <div className="product-card__details">
                  <Options optionsList={generalDetails} />
                </div>
              </div>
            </div>
            <div className="product-card__container">
              <About
                info={activePhone.details?.additionalFeatures || ''}
                description={activePhone.details?.description || ''}
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
              phones={phones}
              title="Hot You may also like"
            />
          </>
        )
      }

    </div>
  );
};
