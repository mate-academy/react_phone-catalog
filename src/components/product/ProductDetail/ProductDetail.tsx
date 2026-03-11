import './ProductDetail.scss';
import { DescriptionSection } from '@/types/Product';
import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  description: DescriptionSection[];
};

export const ProductDetail: React.FC<Props> = ({ description }) => {
  const { t } = useTranslation();

  return (
    <div className="ProductDetail">
      <div className="ProductDetail__about">
        <h3 className="ProductDetail__about-title">
          {t('product_details.about')}
        </h3>

        <div className="ProductDetail__about-main">
          {description.map((section, index) => (
            <div
              key={index}
              className="ProductDetail__about-main"
            >
              <h4 className="ProductDetail__about-main-title">
                {section.title}
              </h4>

              {section.text.map((paragraph, i) => (
                <span
                  key={i}
                  className="ProductDetail__about-main-second"
                >
                  {paragraph}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
