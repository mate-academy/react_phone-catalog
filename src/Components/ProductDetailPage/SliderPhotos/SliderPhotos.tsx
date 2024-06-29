import React, { useContext } from 'react';
import './SliderPhotos.scss';
import { ProductContext } from '../../../store/ProductContext';

type Props = {
  img: string;
};
export const SliderPhotos: React.FC<Props> = ({ img }) => {
  const { onSelectedImg } = useContext(ProductContext);

  return (
    <div className="slider-photos" onClick={() => onSelectedImg(img)}>
      <img className="slider-photos--img" src={img} alt="" key={`img${img}`} />
    </div>
  );
};
