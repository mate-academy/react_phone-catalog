import React, { useContext } from 'react';
import './ProductTechSpecs.scss';
import { TitleProperties } from '../../../../shared/components/TitleProperties';
import { PropertyTable } from '../../../../shared/components/PropertyTable';
import { TranslationContext } from '../../../../../i18next/shared';

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
      <PropertyTable properties={properties} textStyle={'medium'} />
    </div>
  );
};
