import { ProductCardSkeleton } from '../ProductCardSkeleton';
import './SliderSkeleton.scss';

export const SliderSkeleton = () => {
  return (
    <div className="container sliderSkeleton ">
      <div className="sliderSkeleton__titleBlock">
        <div className="skelet sliderSkeleton__titleBlock--title"></div>
        <div className="sliderSkeleton__buttonsBlock">
          <div className="skelet sliderSkeleton__buttonsBlock--buttons"></div>
          <div className="skelet sliderSkeleton__buttonsBlock--buttons"></div>
        </div>
      </div>
      <div className="sliderSkeleton__cards">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </div>
  );
};
