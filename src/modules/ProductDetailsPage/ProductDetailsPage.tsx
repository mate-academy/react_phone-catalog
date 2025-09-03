/* eslint-disable max-len */
/* eslint-disable import/extensions */
import React, { useContext } from 'react';
import '@/styles/main.scss';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { BackButton } from '../shared/components/BackButton';
import { ProductDetailed } from '@/types/ProductDetailed';
import { ProductContext } from '@/context/ProductContext';
import classNames from 'classnames';

interface Props {
  product: ProductDetailed;
}

export const ItemPage: React.FC<Props> = ({ product }) => {
  // const { cart, favorites } = useContext(ProductContext);

  // const inCart = cart.some(p => p.itemId === product.id);
  // const favorited = favorites.some(p => p.itemId === product.id);

  return (
    <main className="container">
      <Breadcrumbs
        links={['Phones', 'Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)']}
      ></Breadcrumbs>
      <BackButton href="products"></BackButton>
      <h2>Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</h2>
      <div className="product_details">
        <div className="product_details__info">
          <div className="product_details__images">
            <img
              className="product_details__images--img"
              src="#"
              alt="Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)"
            ></img>
            <div className="product_details__images--slider">
              <img
                src="#"
                alt="Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)"
              />
              <img
                src="#"
                alt="Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)"
              />
              <img
                src="#"
                alt="Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)"
              />
              <img
                src="#"
                alt="Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)"
              />
              <img
                src="#"
                alt="Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)"
              />
            </div>
          </div>
          <div className="product_details__cart">
            <p className="text__small product_details__id">ID: 802390</p>
            <div className="product_details__colors">
              <p className="text__small product_details__colors--text">
                Available colors
              </p>
              <div className="product_details__colors--select">
                <button className="button__circle button__circle--color">
                  A
                </button>
                <button className="button__circle button__circle--color">
                  B
                </button>
                <button className="button__circle button__circle--color">
                  C
                </button>
                <button className="button__circle button__circle--color">
                  D
                </button>
              </div>
            </div>
            <br />
            <div className="product_details__capacity">
              <p className="text__small product_details__capacity--text">
                Select capacity
              </p>
              <div className="product_details__capacity--options">
                <button>64 GB</button>
                <button>256 GB</button>
                <button>512 GB</button>
              </div>
            </div>
            <br />
            <div className="product_details__price">
              <h3 className="product_details__price--current">$799</h3>
              <p className="text__small product_details__price--discount">
                $1199
              </p>
            </div>
            <div className="product_details__buttons">
              <button
                className={classNames('button__primary', {
                  'button__primary--active': inCart,
                })}
              >
                {inCart ? 'Added' : 'Add to cart'}
              </button>
              <button className="button__circle button__circle--favorite">
                <i
                  className={classNames('icon', {
                    'icon--heart-empty': !favorited,
                    'icon--heart-filled': favorited,
                  })}
                ></i>
              </button>
            </div>
            <div className="product_details__brief_specs">
              <div className="product_details__brief_specs--spec">
                <p className="product_details__brief_specs--type text__small">
                  Screen
                </p>
                <p className="product_details__brief_specs--value text__small">
                  6.5&quot; OLED
                </p>
              </div>
              <div className="product_details__brief_specs--spec">
                <p className="product_details__brief_specs--type text__small">
                  Capacity
                </p>
                <p className="product_details__brief_specs--value text__small">
                  2688x1242
                </p>
              </div>
              <div className="product_details__brief_specs--spec">
                <p className="product_details__brief_specs--type text__small">
                  Processor
                </p>
                <p className="product_details__brief_specs--value text__small">
                  Apple A12 Bionic
                </p>
              </div>
              <div className="product_details__brief_specs--spec">
                <p className="product_details__brief_specs--type text__small">
                  RAM
                </p>
                <p className="product_details__brief_specs--value text__small">
                  3 GB
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="product_details__desc">
          <div className="product_details__about">
            <h3 className="product_details__about--heading">About</h3>
            <div className="product_details__about--paragraph">
              <h4>And then there was Pro</h4>
              <p className="text__body">
                A transformative triple‑camera system that adds tons of
                capability without complexity. An unprecedented leap in battery
                life. And a mind‑blowing chip that doubles down on machine
                learning and pushes the boundaries of what a smartphone can do.
                Welcome to the first iPhone powerful enough to be called Pro.
              </p>
            </div>
            <div className="product_details__about--paragraph">
              <h4>Camera</h4>
              <p className="text__body">
                Meet the first triple‑camera system to combine cutting‑edge
                technology with the legendary simplicity of iPhone. Capture up
                to four times more scene. Get beautiful images in drastically
                lower light. Shoot the highest‑quality video in a smartphone —
                then edit with the same tools you love for photos. You’ve never
                shot with anything like it.
              </p>
            </div>
            <div className="product_details__about--paragraph">
              <h4>
                Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it.
                Love it.
              </h4>
              <p className="text__body">
                iPhone 11 Pro lets you capture videos that are beautifully true
                to life, with greater detail and smoother motion. Epic
                processing power means it can shoot 4K video with extended
                dynamic range and cinematic video stabilization — all at 60 fps.
                You get more creative control, too, with four times more scene
                and powerful new editing tools to play with.
              </p>
            </div>
          </div>
          <div className="product_details__detailed_specs">
            <h3 className="product_details__detailed_specs--heading">
              Tech specs
            </h3>
            <br />
            <div className="product_details__detailed_specs--container">
              <div className="product_details__detailed_specs--spec">
                <p className="text__body product_details__detailed_specs--type">
                  Screen
                </p>
                <p className="text__body product_details__detailed_specs--value">
                  6.5&quot; OLED
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
