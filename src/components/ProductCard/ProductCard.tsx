/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Phone } from '../../Types/Phone';
import { useProducts } from '../../helpers/CatalogContext/CatalogContext';
import { client } from '../../helpers/utils/fetchData';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function getHotPriceProducts(phonesWithDiscount: Phone[], type: string) {
  const preparedPhones = [...phonesWithDiscount];

  preparedPhones.filter(phone => phone.category === type);

  preparedPhones.sort((a, b) => {
    return (b.fullPrice - b.price) - (a.fullPrice - a.price);
  });

  return preparedPhones;
}

enum Categories {
  Phones = 'phones',
}

export const ProductCard: React.FC = () => {
  const { phones, setPhones } = useProducts();
  const [sorted, setSorted] = useState<Phone[]>([]);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  useEffect(() => {
    setSorted(getHotPriceProducts(phones, Categories.Phones));
  }, [phones]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetchPhones();

        setPhones(data);
      } catch (error) {
        throw new Error();
      }
    };

    fetchData();
  }, [setPhones]);

  return (
    <>
      <div className="card-container">
        <h1 className="slick-title">Hot Prices</h1>
        <Slider {...settings}>
          {sorted.map(card => (
            <div className="card" key={card.id}>
              <img className="card__image" src={card.image} alt="phone_image" />
              <h3 className="card__name">{card.name}</h3>
              <div className="card__price">
                <p className="card__hot-price">{`$${card.price}`}</p>
                <p className="card__full-price">{`$${card.fullPrice}`}</p>
              </div>
              <div className="card__info">
                <div className="card__row">
                  <p className="card__char-name">Screen</p>
                  <p className="card__char-value">{card.screen}</p>
                </div>
                <div className="card__row">
                  <p className="card__char-name">Capacity</p>
                  <p className="card__char-value">{card.capacity}</p>
                </div>
                <div className="card__row">
                  <p className="card__char-name">RAM</p>
                  <p className="card__char-value">{card.ram}</p>
                </div>
              </div>
              <div className="card__button">
                <a className="card__link" href="/">Add to cart</a>
                <div className="card__icon" />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};
