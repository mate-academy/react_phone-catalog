import React from 'react';
import NavMain from '../../components/NavMain/NavMain';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ButtonsAddToCart,
  ButtonsFavourites,
} from '../../components/Buttons/Button';
import { ButtonCapcity } from './components/ButtonCapacity';
import HotPrices from '../../components/ProductSlider/HotPrices';
import Image from './components/Image';

const ProductDetailsPage: React.FC = () => {
  return (
    <div className="details container">
      <NavMain />

      <Link to="/phones" className="details__back">
        <ArrowLeft />
        Back
      </Link>

      <h2 className="details__title">
        Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
      </h2>

      <Image />

      <div className="details__temp">
        <div className="details__temp-color">
          <label htmlFor="avia-color" className="details__color-label">
            Available colors
            <div className="details__color" id="avia-color">
              <div className="details__color-div">
                <button className="details__color-btn"></button>
              </div>

              <div className="details__color-div">
                <button className="details__color-btn"></button>
              </div>

              <div className="details__color-div">
                <button className="details__color-btn"></button>
              </div>
            </div>
          </label>

          <div className="details__id">{`ID: 43235342`}</div>
        </div>

        <div className="details__border"></div>

        <div className="details__capacity">
          <label
            htmlFor="details__capacity-button"
            className="details__capacity-label"
          >
            <span>Select capacity</span>
            <ButtonCapcity />
          </label>
        </div>

        <div className="details__border"></div>

        <div className="details__price">
          <strong>$799</strong>
          <span className="details__price-span">$1999</span>
        </div>

        <div className="details__add">
          <ButtonsAddToCart title={`Add to cart`} size={`small`} />
          <ButtonsFavourites />
        </div>

        <ul className="details__list ul">
          <li className="details__item ul__item">
            Screen
            <span className="ul__item-span">6.5” OLED</span>
          </li>

          <li className="details__item ul__item">
            Resolution
            <span className="ul__item-span">2688x1242</span>
          </li>

          <li className="details__item ul__item">
            Processor
            <span className="ul__item-span">Apple A12 Bionic</span>
          </li>

          <li className="details__item ul__item">
            RAM
            <span className="ul__item-span">3 GB</span>
          </li>
        </ul>
      </div>

      <h3 className="details__about">About</h3>

      <article className="details__abouts">
        <h2 className="details__abouts-title">And then there was Pro</h2>

        <p className="details__abouts-paragraph">
          A transformative triple‑camera system that adds tons of capability
          without complexity. <br /> An unprecedented leap in battery life. And
          a mind‑blowing chip that doubles down on machine learning and pushes
          the boundaries of what a smartphone can do. Welcome to the first
          iPhone powerful enough to be called Pro.
        </p>
      </article>

      <article className="details__abouts">
        <h2 className="details__abouts-title">Camera</h2>

        <p className="details__abouts-paragraph">
          Meet the first triple‑camera system to combine cutting‑edge technology
          with the legendary simplicity of iPhone. Capture up to four times more
          scene. Get beautiful images in drastically lower light. Shoot the
          highest‑quality video in a smartphone — then edit with the same tools
          you love for photos. You’ve never shot with anything like it.
        </p>
      </article>

      <article className="details__abouts">
        <h2 className="details__abouts-title">
          Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love
          it.
        </h2>

        <p className="details__abouts-paragraph">
          iPhone 11 Pro lets you capture videos that are beautifully true to
          life, with greater detail and smoother motion. Epic processing power
          means it can shoot 4K video with extended dynamic range and cinematic
          video stabilization — all at 60 fps. You get more creative control,
          too, with four times more scene and powerful new editing tools to play
          with.
        </p>
      </article>

      <h3 className="details__tech-title">Tech specs</h3>

      <ul className="details__tech ul">
        <li className="details__tech-item ul__item">
          Screen
          <span className="details__tech-span ul__item-span">6.5” OLED</span>
        </li>

        <li className="details__tech-item ul__item">
          Resolution
          <span className="details__tech-span ul__item-span">2688x1242</span>
        </li>

        <li className="details__tech-item ul__item">
          Processor
          <span className="details__tech-span ul__item-span">
            Apple A12 Bionic
          </span>
        </li>

        <li className="details__tech-item ul__item">
          RAM
          <span className="details__tech-span ul__item-span">3 GB</span>
        </li>

        <li className="details__tech-item ul__item">
          Built in memory
          <span className="details__tech-span ul__item-span">64 GB</span>
        </li>

        <li className="details__tech-item ul__item">
          Camera
          <span className="details__tech-span ul__item-span">
            12 Mp + 12 Mp + 12 Mp (Triple)
          </span>
        </li>

        <li className="details__tech-item ul__item">
          Zoom
          <span className="details__tech-span ul__item-span">Optical, 2x</span>
        </li>

        <li className="details__tech-item ul__item">
          Cell
          <span className="details__tech-span ul__item-span">
            GSM, LTE, UMTS
          </span>
        </li>
      </ul>

      <HotPrices title={`You may also like`} />
    </div>
  );
};

export default ProductDetailsPage;
