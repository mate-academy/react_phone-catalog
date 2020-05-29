import React, { FC, useEffect, useState } from 'react';
import { BreadCrumb } from '../BreadCrumb/breadCrumb';
import './itemSpecificationCard.scss';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import { GadgetDetails, Phones } from '../../Additional/interfaces';

type Params = {
  page: string;
  gadget: Phones;
  allGadgets: Phones[];
};

export const ItemSpecificationCard: FC<Params> = ({ page, gadget, allGadgets }) => {
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
      <BreadCrumb page={page} />
      <h1 className="Item__title">{item.name}</h1>
      <div className="Item__specs_upper ISU">
        <div className="ISU__photos">
          <div className="ISU__slider">
            <ul className="ISU__slider_list">
              {item.images && item.images.map(img => (
                <button type="button" className="ISU__slider_button" onClick={() => handleActiveImage(img)}><img key={img} src={img} alt={img} className="ISU__slider_image" /></button>
              ))}
            </ul>
          </div>
          <img src={item.images && activeImage === '' ? item.images[0] : activeImage} alt={activeImage} className="ISU__photos_main" />
        </div>
        <div className="ISU__specification" />
      </div>
      <div className="Item__specs_lower ISL">
        <div className="ISL__about" />
        <div className="ISL__technical" />
      </div>
      <ProductSlider title="You may also like" phones={allGadgets} />
    </div>
  );
};
