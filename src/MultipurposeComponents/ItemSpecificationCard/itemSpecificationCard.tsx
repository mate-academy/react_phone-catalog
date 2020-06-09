import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { BreadCrumb } from '../BreadCrumb/breadCrumb';
import './itemSpecificationCard.scss';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import { GadgetDetails, Phone } from '../../Additional/interfaces';

type Params = {
  page: string;
  gadget: Phone;
  allGadgets: Phone[];
  route: string;
};

export const ItemSpecificationCard: FC<Params> = ({
  page, gadget, allGadgets, route,
}) => {
  const [item, setItem] = useState<GadgetDetails>({} as GadgetDetails);
  const [activeImage, setActiveImage] = useState('');
  const PRODUCT_API_URL = `https://mate-academy.github.io/react_phone-catalog/api/products/${gadget.id}.json`;

  useEffect(() => {
    fetch(PRODUCT_API_URL).then(response => response.json().then(data => setItem(data)));
  }, [PRODUCT_API_URL]);


  const handleActiveImage = (img: string) => {
    setActiveImage(img);
  };

  return (
    <div className="Item">
      <BreadCrumb page={page} route={route} />
      <h1 className="Item__title">{item.name}</h1>
      <div className="Item__specs_upper ISU">
        <div className="ISU__photos">
          <div className="ISU__slider">
            <ul className="ISU__slider_list">
              {item.images && item.images.map(img => (
                <button key={img.trim().toLocaleLowerCase()} type="button" className="ISU__slider_button" onClick={() => handleActiveImage(img)}>
                  <img
                    key={img}
                    src={img}
                    alt={img}
                    className="ISU__slider_image"
                  />
                </button>
              ))}
            </ul>
          </div>
          <img
            src={item.images && activeImage === '' ? item.images[0] : activeImage}
            alt={activeImage}
            className="ISU__photos_main"
          />
        </div>
        <div className="ISU__specification">
          <div className="card__price ISU__specification_price-wrapper">
            {gadget.discount ? (
              <span className="ISU__specification_price">
                $
                {gadget.price * (1 - (gadget.discount / 100))}
              </span>
            ) : ''}
            <span className={cn(gadget.discount ? 'ISU__specification_price ISU__specification_priceOld' : 'ISU__specification_price')}>
              $
              {gadget.price}
            </span>
          </div>
          <div className="discount__list_item-action action">
            <button
              type="button"
              className="action__buy ISU__specification_buy"
            >
              Add to cart
            </button>
            <img
              className="action__add-to-fav"
              alt="favourites"
              src="img/icons/fav.svg"
            />
          </div>

          <div className="ISU__specification_description-wrapper">
            <div className="card__specification ISU__specification_description">
              <span className="card__specification_title">Screen</span>
              <span className="card__specification_description">
                {gadget.screen !== '' ? gadget.screen : 'N/A'}
              </span>
            </div>
            <div className="card__specification ISU__specification_description">
              <span className="card__specification_title">Capacity</span>
              <span className="card__specification_description">
                {gadget.capacity !== '' ? gadget.capacity : 'N/A'}
              </span>
            </div>
            <div className="card__specification ISU__specification_description">
              <span className="card__specification_title">RAM</span>
              <span className="card__specification_description">
                {gadget.ram !== '' ? gadget.ram : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="Item__specs_lower ISL">
        <div className="ISL__about">
          <h2 className="ISL__about_title">About</h2>
          <p className="ISL__about_description">{item.description}</p>
        </div>
        <div className="ISL__technical">
          <h2 className="ISL__about_title">Tech specs</h2>
          <div className="ISU__specification_description-wrapper">
            <div className="card__specification ISU__specification_description">
              <span className="card__specification_title">Screen</span>
              <span className="card__specification_description">
                {gadget.screen}
              </span>
            </div>
            <div className="card__specification ISU__specification_description">
              <span className="card__specification_title">Resolution</span>
              <span className="card__specification_description">
                {item.display && item.display.screenResolution}
              </span>
            </div>
            <div className="card__specification ISU__specification_description">
              <span className="card__specification_title">OS</span>
              <span className="card__specification_description">
                {item.android && item.android.os}
              </span>
            </div>
            <div className="card__specification ISU__specification_description">
              <span className="card__specification_title">RAM</span>
              <span className="card__specification_description">
                {gadget.ram}
              </span>
            </div>
            <div className="card__specification ISU__specification_description">
              <span className="card__specification_title">Built in memory</span>
              <span className="card__specification_description">
                {item.storage && item.storage.flash}
              </span>
            </div>
            <div className="card__specification ISU__specification_description">
              <span className="card__specification_title">Cell</span>
              <span className="card__specification_description">
                {item.connectivity && item.connectivity.cell}
              </span>
            </div>
          </div>
        </div>
      </div>
      <ProductSlider title="You may also like" phones={allGadgets} />
    </div>
  );
};
