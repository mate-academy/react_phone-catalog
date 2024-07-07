import React, { useContext } from 'react';
import './SliderPhotos.scss';
import { ProductContext } from '../../../store/ProductContext';
import classNames from 'classnames';

type Props = {
  img: string;
  onActive: boolean;
};
export const SliderPhotos: React.FC<Props> = ({ img, onActive }) => {
  const { onSelectedImg } = useContext(ProductContext);

  return (
    <div
      className={classNames('slider-photos', {
        'slider-photos--active': onActive,
      })}
      onClick={() => onSelectedImg(img)}
    >
      <img className="slider-photos--img" src={img} alt="" key={`img${img}`} />
    </div>
  );
};
