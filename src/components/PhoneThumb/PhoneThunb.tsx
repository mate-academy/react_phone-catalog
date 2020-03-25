import React, { FC } from 'react';
import './_PhoneThumb.scss';
import { Phone } from '../../constants/types';

interface Props {
  data: Phone;
}

export const PhoneThumb: FC<Props> = (props) => {
  const { imageUrl, snippet, name } = props.data;

  return (
    <div className="phoneThumb">
      <img src={`${imageUrl}`} alt="phone__photo" className="phoneThumb__img" />
      <h3 className="phoneYhumb__title">{name}</h3>
      <p className="phoneThumb__info">{snippet}</p>
    </div>
  );
};
