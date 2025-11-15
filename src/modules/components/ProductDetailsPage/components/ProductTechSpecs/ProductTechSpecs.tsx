import React, { useContext } from 'react';
import './ProductTechSpecs.scss';
import { TitleProperties } from '../../../../shared/components/TextSections/TitleProperties';
import { ProductPropertyTable } from '../../../../shared/components/ui/ProductPropertyTable';
import { TranslationContext } from '../../../../../i18next/shared/TranslationContext';

type ProductTechSpecsProps = {
  properties: {
    name: string;
    value: string | string[] | null;
  }[];
};

export const ProductTechSpecs: React.FC<ProductTechSpecsProps> = ({
  properties,
}) => {
  const { propDetailsTitle } = useContext(TranslationContext);

  return (
    <div className="product-tech-specs">
      <TitleProperties text={propDetailsTitle.tech} />
      <ProductPropertyTable properties={properties} textStyle={'medium'} />
    </div>
  );
};
