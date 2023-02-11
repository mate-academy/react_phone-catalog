import { useContext } from 'react';
import {
  DetailedProductContext,
} from '../../../../../../../../context/DetailedProductContext';
import './ProductTextDesc.scss';

export const ProductTextDesc = () => {
  const {
    detailedProduct,
  } = useContext<any>(DetailedProductContext);

  return (
    <div className="product-desc__text">
      <h2 className="product-desc__title">
        About
      </h2>
      <div className="horizontal-line" />
      <ul className="product-desc__list">
        {
          detailedProduct.description.map((one: any) => {
            return (
              <li className="product-desc__item" key={one}>
                <h3 className="product-desc__item-title">{one.title}</h3>
                {one.text.map((text: string) => {
                  return (
                    <p className="product-desc__item-text body14">
                      {text}
                    </p>
                  );
                })}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};
