import React from 'react';
import './SpecsProduct.scss';
import { useLanguage } from '../../../../context/LanguageContext';
import { en } from '../../../../i18n/translations/en';

type AllSpecs =
  | 'screen'
  | 'resolution'
  | 'processor'
  | 'ram'
  | 'capacity'
  | 'builtInMemory'
  | 'zoom'
  | 'cell'
  | 'camera';

type Spec = {
  key: keyof Pick<typeof en, AllSpecs>;
  value: string | string[];
};

type Props = {
  className: string;
  specs: Spec[];
};

export const SpecsProduct: React.FC<Props> = ({ className, specs }) => {
  const { texts } = useLanguage();

  return (
    <div className={`specs-product ${className}`}>
      {specs.map((spec, index) => {
        if (spec.value) {
          let completedValue = spec.value;

          if (typeof spec.value === 'object') {
            completedValue = spec.value.join(', ');
          }

          return (
            <div className="specs-product__section" key={index}>
              <p className="specs-product__text-left">{texts[spec.key]}</p>
              <p className="specs-product__text-right">{completedValue}</p>
            </div>
          );
        } else {
          return;
        }
      })}
    </div>
  );
};
