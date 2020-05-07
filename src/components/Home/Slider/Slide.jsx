/* eslint-disable react/no-array-index-key */
import React from 'react';
import './Slider.scss';

export const Slide = (props) => (
  <img
    src={props.slide}
    alt="phone samsung"
    className="slide__img"
  />
);
