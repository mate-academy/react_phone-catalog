import { useContext } from 'react';
import {
  DetailedProductContext,
} from '../../../../../../../../context/DetailedProductContext';
import './ProductTextDesc.scss';

export const ProductTextDesc = () => {
  const {
    detailedProduct,
  } = useContext(DetailedProductContext);

  return (
    <div className="product-desc__text">
      <h2 className="product-desc__title">
        About
      </h2>
      <div className="horizontal-line" />
      <ul className="product-desc__list">
        {
          detailedProduct.description.map((one:
          { title: string; text: string[]; }) => {
            return (
              <li key={one.title} className="product-desc__item">
                <h3 className="product-desc__item-title">{one.title}</h3>
                {one.text.map((text: string) => {
                  return (
                    <p key={text} className="product-desc__item-text body14">
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
