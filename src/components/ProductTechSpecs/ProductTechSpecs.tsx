import React from 'react';
import { ProductDetails } from '../../types/ProductDetails';
import style from './ProductTechSpecs.module.scss';

type Props = {
  product: ProductDetails | null;
};

export const ProductTechSpecs: React.FC<Props> = ({ product }) => {
  return (
    <div className={style.techSpecs}>
      <h3 className={style.techSpecs__title}>Tech specs</h3>
      <div className={style.techSpecs__characteristics}>
        <div className={style.techSpecs__characteristic}>
          <span>Screen</span>
          <span>{product?.screen}</span>
        </div>
        <div className={style.techSpecs__characteristic}>
          <span>Resolution</span>
          <span>{product?.resolution}</span>
        </div>
        <div className={style.techSpecs__characteristic}>
          <span>Processor</span>
          <span>{product?.processor}</span>
        </div>
        <div className={style.techSpecs__characteristic}>
          <span>RAM</span>
          <span>{product?.ram}</span>
        </div>
        <div className={style.techSpecs__characteristic}>
          <span>Camera</span>
          <span>{product?.camera}</span>
        </div>
        <div className={style.techSpecs__characteristic}>
          <span>Zoom</span>
          <span>{product?.zoom}</span>
        </div>
        <div className={style.techSpecs__characteristic}>
          <span>Cell</span>
          <span>{product?.cell.join(', ')}</span>
        </div>
      </div>
    </div>
  );
};
