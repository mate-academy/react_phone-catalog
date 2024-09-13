import React from 'react';
import { Phone } from '../../types/phone';
import { Tablet } from '../../types/tablet';
import { Accessory } from '../../types/accessory';

type Product = Phone | Tablet | Accessory;

type Props = {
  product: Product;
}

export const DetailsTechSpecs: React.FC<Props> = ({ product }) => {
  return (
    <>
      <h3>Tech specs</h3>
      <div className="card__line"></div>

      <div className="card__ram">
        <p className="card__ram-name">Screen</p>
        <p className="card__ram-info">{product.screen}</p>
      </div>

      <div className="card__ram">
        <p className="card__ram-name">Resolution</p>
        <p className="card__ram-info">{product.resolution}</p>
      </div>

      <div className="card__ram">
        <p className="card__ram-name">Processor</p>
        <p className="card__ram-info">{product.processor}</p>
      </div>

      <div className="card__ram">
        <p className="card__ram-name">RAM</p>
        <p className="card__ram-info">{product.ram}</p>
      </div>

      <div className="card__ram">
        <p className="card__ram-name">Built in memory</p>
        <p className="card__ram-info">{product.capacity}</p>
      </div>

      <div className="card__ram">
        <p className="card__ram-name">Camera</p>
        <p className="card__ram-info">{product.camera}</p>
      </div>

      <div className="card__ram">
        <p className="card__ram-name">Zoom</p>
        <p className="card__ram-info">{product.zoom}</p>
      </div>

      <div className="card__ram">
        <p className='card__ram-name'>Cell</p>
        {product.cell.map((el, index) => (
          <p key={`${product.id}-cell-${index}`} className="card__ram-info">{el}</p>
        ))}
      </div>
    </>
  )
}
