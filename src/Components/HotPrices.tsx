/* eslint-disable no-console */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
import '../style/main.scss';
import classNames from 'classnames';
import { ProductCard } from './ProductCard';
import { client } from '../utils/fetchClient';
import { Phone } from '../Type/Phone';

let buttonBack = 0;
let buttonNext = 4;

export const HotPrices: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [back, setBack] = useState(buttonBack);
  const [next, setNext] = useState(buttonNext);
  const [, setLoading] = useState(true);
  const [, setErrorMessage] = useState(false);

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  // };

  useEffect(() => {
    client.get<Phone[]>('/_new/products.json')
      .then(setPhones)
      .catch(setErrorMessage)
      .finally(() => setLoading(false));
  }, []);
  const hotPhones = phones.filter(phone => phone.fullPrice > 1200)
    .sort((a, b) => b.fullPrice - a.fullPrice);

  const preperaPhones = hotPhones.slice(back, next);

  console.log(preperaPhones);

  return (
    <div className="container--hot">
      <div className="hot__prices">
        <h1>Hot prices</h1>

        <div className="button__container">
          <button
            type="button"
            aria-label="Mute volume"
            className={classNames('button button__left', {
              'button__left--active': buttonBack > 0,
            })}
            disabled={buttonBack === 0}
            onClick={() => {
              setNext(buttonNext--);
              setBack(buttonBack--);
            }}
          />
          <button
            type="button"
            aria-label="Mute volume"
            className={classNames('button button__right', {
              'button__right--active': buttonNext < hotPhones.length,
            })}
            disabled={buttonNext === hotPhones.length}
            onClick={() => {
              setNext(buttonNext++);
              setBack(buttonBack++);
            }}
          />
        </div>
      </div>

      <div className="product">
        {/* <Slider {...settings}> */}
        {preperaPhones.map(phone => (
          <ProductCard
            key={phone.id}
            phone={phone}
          />
        ))}
        {/* </Slider> */}
      </div>

    </div>
  );
};
