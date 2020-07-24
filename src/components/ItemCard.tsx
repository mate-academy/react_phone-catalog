import React from 'react';
import { Phone }  from '../interfaces';
import { getPhones } from '../store/index';
import { useSelector } from 'react-redux';
import { AddButton } from './AddButton';
import { About } from './About';
import { Gallery } from './Gallery';
import { Carousel } from './Carousel';
import { useWindowSize } from "../helpers/useWindowSize";
// import { NavLink } from 'react-router-dom';

interface Props {
  id: string;
}

export const ItemCard: React.FC<Props> = ({ id }) => {
  const phones: Phone[] = useSelector(getPhones);
  const activePhone = phones.find(phone => phone.id === id);
  const width = useWindowSize();
  const perRow = Math.floor((+width - 300) / 285)
  const carouselListWidth = perRow * 285;

  return (
    <div className="product-card">
      {
        activePhone &&   (
          <>
            <h2 className="product-card__title">{activePhone.name}</h2>
            <div className="product-card__container">
            <Gallery activePhone={activePhone}/>
              <div className="product-card__description description">
                <p className="description__text">Available colors</p>
                <div className="description__colors">
                  <div className="description__color"></div>
                  <div className="description__color"></div>
                </div>
                <div className="line"></div>

                <p className="description__text">Select capacity</p>
                <button className="description__capacity">{activePhone.ram}</button>
                <span className="line"></span>
                <div className="description__price card__price">
                  <p className="description__price--old card__price--old">&#x24;{activePhone.price}</p>
                  <p className="description__price--new card__price--new">&#x24;{+activePhone.price * (1 - +activePhone.discount / 100)}</p>
                </div>
                <AddButton />
                <div className="product-card__details details">
                  <span className="details__wrapper">
                    <p className="details__option">Screen</p>
                    <p className="details__value">{activePhone.screen}</p>
                  </span>
                  <span className="details__wrapper">
                    <p className="details__option">Resolution</p>
                    <p className="details__value">{activePhone.details?.display.screenResolution}</p>
                  </span>
                  <span className="details__wrapper">
                    <p className="details__option">ScreenSize</p>
                    <p className="details__value">{activePhone.details?.display.screenSize}</p>
                  </span>
                  <span className="details__wrapper">
                    <p className="details__option">RAM</p>
                    <p className="details__value">{activePhone.ram}</p>
                  </span>
                </div>
              </div>
            </div>
            <div className="product-card__container">
              <About info={activePhone.details?.additionalFeatures || ''} description={activePhone.details?.description || ''}/>
              <div className="details__container">
                <div className="product-card__details details">
                <h3 className="about__title">Tech specs</h3>
                <div className="line"></div>
                    <span className="details__wrapper">
                      <p className="details__option">Screen</p>
                      <p className="details__value">{activePhone.screen}</p>
                    </span>
                    <span className="details__wrapper">
                      <p className="details__option">Resolution</p>
                      <p className="details__value">{activePhone.details?.display.screenResolution}</p>
                    </span>
                    <span className="details__wrapper">
                      <p className="details__option">ScreenSize</p>
                      <p className="details__value">{activePhone.details?.display.screenSize}</p>
                    </span>
                    <span className="details__wrapper">
                      <p className="details__option">RAM</p>
                      <p className="details__value">{activePhone.ram}</p>
                    </span>
                    <span className="details__wrapper">
                      <p className="details__option">Camera</p>
                      <p className="details__value">{activePhone.details?.camera.primary}</p>
                    </span>
                    <span className="details__wrapper">
                      <p className="details__option">Dimensions</p>
                      <p className="details__value">{activePhone.details?.sizeAndWeight.dimensions}</p>
                    </span>
                    <span className="details__wrapper">
                      <p className="details__option">RAM</p>
                      <p className="details__value">{activePhone.ram}</p>
                    </span>
                  </div>
              </div>
            </div>
            <Carousel
              width={`${carouselListWidth}`}
              phones={phones}
              title={'Hot You may also like'}
            />
          </>
        )
      }

    </div>
  )
}




      {/* <div className="path-wrapper">
        <NavLink to="/">
          <img src="../../img/image/home/home" alt="home-logo"/>
        </NavLink>
        <NavLink to="/phones">
          Phones
        </NavLink>
        {
          activePhone && (
            <NavLink to={`phones/${activePhone.id}`}>
            Phones
          </NavLink>
          )
        }

      </div> */}
