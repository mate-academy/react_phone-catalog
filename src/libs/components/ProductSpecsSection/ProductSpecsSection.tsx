import { useMemo } from 'react';

import { IProductDetails } from '../../types';
import { TechSpecs } from '../TechSpecs';

import './ProductSpecsSection.scss';

type Props = {
  productDetails: IProductDetails;
};

export const ProductSpecsSection: React.FC<Props> = ({ productDetails }) => {
  const techSpecs = useMemo(
    () => ({
      Screen: productDetails.screen,
      Resolution: productDetails.resolution,
      Processor: productDetails.processor,
      RAM: productDetails.ram,
      Memory: productDetails.capacity,
      Camera: productDetails.camera,
      Zoom: productDetails.zoom,
      Cell: productDetails.cell.join(', '),
    }),
    [productDetails],
  );

  return (
    <section className="product-specs">
      <h2 className="product-specs__title">Tech specs</h2>

      <TechSpecs specs={techSpecs} />
    </section>
  );
};
