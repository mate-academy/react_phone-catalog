import React from 'react';

import '../styles/TechSpecs.scss';
import { Params } from './Params';
import { ProductDetails } from '../types/ProductDetails';

interface Props {
  product: ProductDetails;
}

const TECH_SPECS_PARAMS = [
  'Screen',
  'Resolution',
  'Processor',
  'RAM',
  'Built in memory',
  'Camera',
  'Zoom',
  'Cell',
];

export const TechSpecs: React.FC<Props> = ({ product }) => (
  <div className="tech-specs">
    <h3 className="tech-specs__title">Tech specs</h3>

    <Params product={product} params={TECH_SPECS_PARAMS} />
  </div>
);
