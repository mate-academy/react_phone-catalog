import cn from 'classnames';
import style from './Specs.module.scss';
import { DetailedProduct } from '../../../../types/DetailedProduct';
import React from 'react';

type Props = {
  product: DetailedProduct;
};

export const Specs: React.FC<Props> = ({ product }) => {
  return (
    <div className={cn(style.product__specs, style.specs)}>
      <h2 className={style.specs__title}>Tech specs</h2>
      <div className={style.specs__line}></div>
      <div className={style.specs__details}>
        <div className={style.specs__detail}>
          <p className={style.specs__subtitle}>Screen</p>
          <p className={style.specs__desc}>{product.screen}</p>
        </div>
        <div className={style.specs__detail}>
          <p className={style.specs__subtitle}>Resolution</p>
          <p className={style.specs__desc}>{product.resolution}</p>
        </div>
        <div className={style.specs__detail}>
          <p className={style.specs__subtitle}>Processor</p>
          <p className={style.specs__desc}>{product.processor}</p>
        </div>
        <div className={style.specs__detail}>
          <p className={style.specs__subtitle}>RAM</p>
          <p className={style.specs__desc}>{product.ram}</p>
        </div>
        <div className={style.specs__detail}>
          <p className={style.specs__subtitle}>Built in memory</p>
          <p className={style.specs__desc}>{product.capacity}</p>
        </div>
        {product.camera && (
          <div className={style.specs__detail}>
            <p className={style.specs__subtitle}>Camera</p>
            <p className={style.specs__desc}>{product.camera}</p>
          </div>
        )}
        {product.zoom && (
          <div className={style.specs__detail}>
            <p className={style.specs__subtitle}>Zoom</p>
            <p className={style.specs__desc}>{product.zoom}</p>
          </div>
        )}
        <div className={style.specs__detail}>
          <p className={style.specs__subtitle}>Cell</p>
          <p className={style.specs__desc}>{product.cell.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};
