import React from 'react';
import './Descriptions.scss';
import { ProductDetails } from '../../../../types/ProductDetails';

type Props = {
  product: ProductDetails | null;
};

export const Descriptions: React.FC<Props> = ({ product }) => {
  return (
    <div className="descriptions">
      <p className="descriptions__title">About</p>
      <span className="descriptions__detail"></span>

      <div className="descriptions__content">
        {product?.description.map(section => (
          <div key={section.title} className="descriptions__section">
            <p className="h4 descriptions__sectionTitle">{section.title}</p>
            {section.text.map((paragraph, index) => (
              <p key={index} className="descriptions__paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
