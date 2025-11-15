import React, { useContext } from 'react';
import './ProductDescription.scss';
import { TitleProperties } from '../../../../shared/components/TextSections/TitleProperties';
import { TranslationContext } from '../../../../../i18next/shared/TranslationContext';

type ProductDescriptionProps = {
  productDescription: {
    title: string;
    text: string[];
  }[];
};

export const ProductDescription: React.FC<ProductDescriptionProps> = ({
  productDescription,
}) => {
  const { propDetailsTitle } = useContext(TranslationContext);

  return (
    <div className="product-about">
      <TitleProperties text={propDetailsTitle.about} />
      {productDescription.map(item => (
        <article className="product-about__content" key={item.title}>
          <h4 className="product-about__content-title">{item.title}</h4>
          <p className="product-about__content-text">{item.text}</p>
        </article>
      ))}
    </div>
  );
};
