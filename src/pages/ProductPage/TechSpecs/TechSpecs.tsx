
import React from 'react';
import { Product, ProductDetails } from '../../../interfaces';
import './TechSpecs.scss';

export const TechSpecs = ({product, productDetailes}:{product: Product; productDetailes: ProductDetails}) => {

  return (
    <div className="TechSpecs">
      <h2 className="TechSpecs__title">Tech specs</h2>
      <span className="TechSpecs__horisont"></span>
      <ul className="TechSpecs__list">
        <li className="TechSpecs__item">
          <span className="TechSpecs__spec">Screen</span>
  <span className="TechSpecs__value">{product.screen}</span>
        </li>
        <li className="TechSpecs__item">
          <span className="TechSpecs__spec">Resolution</span>
  <span className="TechSpecs__value">{productDetailes.display.screenResolution}</span>
        </li>
        <li className="TechSpecs__item">
          <span className="TechSpecs__spec">Processor</span>
  <span className="TechSpecs__value">{productDetailes.hardware.cpu}</span>
        </li>
        <li className="TechSpecs__item">
          <span className="TechSpecs__spec">RAM</span>
  <span className="TechSpecs__value">{product.ram}</span>
        </li>
        <li className="TechSpecs__item">
          <span className="TechSpecs__spec">Built in memory</span>
  <span className="TechSpecs__value">{product.capacity}</span>
        </li>
        <li className="TechSpecs__item">
          <span className="TechSpecs__spec">Camera</span>
  <span className="TechSpecs__value">{productDetailes.camera.primary}</span>
        </li>
        <li className="TechSpecs__item">
          <span className="TechSpecs__spec">Zoom</span>
          <span className="TechSpecs__value"></span>
        </li>
        <li className="TechSpecs__item">
          <span className="TechSpecs__spec">Cell</span>
  <span className="TechSpecs__value">{productDetailes.connectivity.cell}</span>
        </li>

      </ul>
    </div>
  )
}

