import React, { useMemo } from 'react';
import style from './TechSpec.module.scss';
import { Product } from '../../../types/Types';

type Props = {
  product: Product;
};

export const TechSpec: React.FC<Props> = ({ product }) => {
  const characteristics = useMemo(() => {
    const specs: [string, string][] = [
      ['screen', 'Screen'],
      ['resolution', 'Resolution'],
      ['processor', 'Processor'],
      ['ram', 'Ram'],
      ['capacity', 'Built in memory'],
      ['camera', 'Camera'],
      ['zoom', 'Zoom'],
      ['cell', 'Cell'],
    ];

    const spec = [];

    for (const [key, name] of specs) {
      if (key in product) {
        let value: string;
        const rawValue = product[key as keyof Product];

        if (Array.isArray(rawValue)) {
          value = rawValue.join(', ');
        } else {
          value = rawValue.toString();
        }

        spec.push({ name, value });
      }
    }

    return spec;
  }, [product]);

  return (
    <div className={style.techSpec}>
      {characteristics.map(({ name, value }) => (
        <div key={name} className={style.techSpec__container}>
          <span className={style.techSpec__name}>{name}</span>
          <span className={style.techSpec__value}>{value}</span>
        </div>
      ))}
    </div>
  );
};
