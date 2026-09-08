import { FC } from 'react';
import { SpecificationProps } from '../types/types';

export const Specification: FC<SpecificationProps> = ({ label, value }) => (
  <div className="productCard__block">
    <span className="productCard__info">{label}</span>
    <span className="productCard__value">{value}</span>
  </div>
);
