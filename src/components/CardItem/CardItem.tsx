import React, { useState } from 'react';
import { Breadcrumbs } from '../Catalog/Breadcrumbs';

export const CardItem = () => {
  const product = {
    id: 'apple-iphone-7-plus-32gb-silver',
    category: 'phones',
    namespaceId: 'apple-iphone-7-plus',
    name: 'Apple iPhone 7 Plus 32GB Silver',
    capacityAvailable: ['32GB'],
    capacity: '32GB',
    priceRegular: 540,
    priceDiscount: 500,
    colorsAvailable: ['black', 'rosegold', 'gold', 'silver'],
    color: 'silver',
    images: [
      'img/phones/apple-iphone-7-plus/silver/00.webp',
      'img/phones/apple-iphone-7-plus/silver/01.webp',
      'img/phones/apple-iphone-7-plus/silver/02.webp',
      'img/phones/apple-iphone-7-plus/silver/03.webp',
      'img/phones/apple-iphone-7-plus/silver/04.webp',
    ],
    description: [
      {
        title: 'And then there was Pro',
        text: [
          'A transformative triple-camera system that adds tons of capability without complexity.',
          'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
        ],
      },
      {
        title: 'Camera',
        text: [
          'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
        ],
      },
      {
        title:
          'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
        text: [
          'iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.',
        ],
      },
    ],
    screen: "5.5' IPS",
    resolution: '1920x1080',
    processor: 'Apple A10',
    ram: '3GB',
    camera: '12 Mp + 7 Mp',
    zoom: 'Digital, 10x / Optical, 2x',
    cell: ['GPRS', 'EDGE', 'WCDMA', 'UMTS', 'HSPA', 'LTE'],
  };

  const [activePhoto, setActivePhoto] = useState(product.images[0]);

  return (
    <section className="card-item">
      <div className="container card-item__container">
        <Breadcrumbs />

        <h2 className="card-item__title h2">{product.id}</h2>
        <div className="card-item__body body-card">
          <div className="body-card__images">
            <ul className="body-card__slider-photos">
              {product.images.map(item => (
                <li
                  key={item}
                  className="body-card__slider-item"
                  onClick={() => setActivePhoto(item)}
                >
                  <img
                    src={item}
                    alt={product.name}
                    className="body-card__slider-photo"
                  />
                </li>
              ))}
            </ul>
            <img src={activePhoto} alt="" className="body-card__main-photo" />
          </div>

          <div className="body-card__info">
            <div className="body-card__colors">
              <div className="body-card__info-name">Available colors</div>
              <ul className="body-card__items"></ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
