import React from 'react';
import './Slide.scss';
import classNames from 'classnames';

type Props = {
  title: string;
  description: string;
  image: string;
  isActive: boolean;
};

export const Slide: React.FC<Props> = ({
  title,
  description,
  image,
  isActive,
}) => {
  return (
    <div className={classNames('slide', { 'slide--active': isActive })}>
      <div className="slide__content">
        <div className="slide__content-text">
          <h3 className="slide__content-text--title text">{title}</h3>
          <p className="slide__content-text--description">{description}</p>
        </div>

        <button className="slide__content-button">order now</button>
      </div>

      <div className="slide__image">
        <img src={image} alt="slider-img" className="slide__image-phone" />
      </div>
    </div>
  );
};
