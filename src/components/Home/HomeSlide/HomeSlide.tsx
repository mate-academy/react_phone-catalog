import React, { useState } from 'react';
import './HomeSlide.scss';
import classNames from 'classnames';
import '../../../container.scss';

export const HomeSlide: React.FC = () => {
  const [blockCheked, setBlockCheked] = useState(1);

  return (
    <section className="home__slide">
      <div className="home__wrapper">
        <div className="home__content">
          <button
            aria-label="Mute volume"
            type="button"
            className="home__leftright home__left"
            onClick={() => {
              if (blockCheked === 1) {
                setBlockCheked(3);
              } else {
                setBlockCheked(value => value - 1);
              }
            }}
          />
          <div className={classNames('home__picture', {
            'home__picture--1': blockCheked === 1,
            'home__picture--2': blockCheked === 2,
            'home__picture--3': blockCheked === 3,
          })}
          />
          <button
            type="button"
            className="home__leftright home__right"
            aria-label="Mute volume"
            onClick={() => {
              if (blockCheked === 3) {
                setBlockCheked(1);
              } else {
                setBlockCheked(value => value + 1);
              }
            }}
          />
        </div>
        <div className="home__navigation">
          <button
            type="button"
            aria-label="Mute volume"
            className={classNames('home__block',
              { 'home__block--active': blockCheked === 1 })}
            onClick={() => {
              setBlockCheked(1);
            }}
          />
          <button
            type="button"
            aria-label="Mute volume"
            className={classNames('home__block',
              { 'home__block--active': blockCheked === 2 })}
            onClick={() => {
              setBlockCheked(2);
            }}
          />
          <button
            type="button"
            aria-label="Mute volume"
            className={classNames('home__block',
              { 'home__block--active': blockCheked === 3 })}
            onClick={() => {
              setBlockCheked(3);
            }}
          />
        </div>
      </div>
    </section>
  );
};
