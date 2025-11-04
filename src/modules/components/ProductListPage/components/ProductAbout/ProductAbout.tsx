import React, { useContext } from 'react';
import './ProductAbout.scss';
import { TitleProperties } from '../../../../shared/components/TitleProperties';
import { TranslationContext } from '../../../../../i18next/shared';

type ProductAboutProps = {
  productDescription: {
    title: string;
    text: string[];
  }[];
};

export const ProductAbout: React.FC<ProductAboutProps> = ({
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
