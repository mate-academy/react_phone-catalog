import React from 'react';
import s from './ProductFeatures.module.scss';

type Feature = {
  name: string;
  value: string | number | string[];
};

type Props = {
  features: Feature[];
};

export const ProductFeatures: React.FC<Props> = ({ features }) => {
  if (!features.length) {
    return null;
  }

  return (
    <table className={s.productFeatures}>
      <tbody>
        {features.map(feature => {
          if (!feature.value) {
            return null;
          }

          const value = Array.isArray(feature.value)
            ? feature.value.join(', ')
            : feature.value;

          return (
            <tr key={feature.name} className={s.feature}>
              <td className={s.featureName}>{feature.name}</td>
              <td className={s.featureValue}>{value}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
