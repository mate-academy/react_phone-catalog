import React from 'react';
import './ProductDetails.scss';
import classNames from 'classnames';

export const ProductDetails = (props) => {
  console.log(props.match)
  return (

    <section class="section section_product-details">
      <h2 class="heading heading_product-details">Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</h2>
      <div className="product-details">
        <div>
          <div class="image image_product-details">
            <div class="image__miniatures">
              <img src={require("../../img/item-page/product-miniature-1.svg")} alt="miniature-phone"></img>
              <img src={require("../../img/item-page/product-miniature-2.svg")} alt="miniature-phone"></img>
              <img src={require("../../img/item-page/product-miniature-3.svg")} alt="miniature-phone"></img>
              <img src={require("../../img/item-page/product-miniature-4.svg")} alt="miniature-phone"></img>
              <img src={require("../../img/item-page/product-miniature-5.svg")} alt="miniature-phone"></img>
            </div>
            <img
              src={require("../../img/item-page/phone-main.svg")}
              alt="iphone 11 pro"
              class="image__main"
            >
            </img>
          </div>

        </div>
        <div>
          <div className="params">
            <div className="params__top">
              <p className="params__title">Available colors</p>
              <div className="params__color-options">
                <div className="params__color-option params__color-option_active"></div>
                <div className="params__color-option"></div>
                <div className="params__color-option"></div>
                <div className="params__color-option"></div>
              </div>
            </div>

            <div className="params__capacity">
              <p className="params__title">Select capacity</p>
              <div className="params__capacity-options">
                <div>64 GB</div>
                <div>256 GB</div>
                <div>512 GB</div>
              </div>
            </div>

            <div className="params__price price">
              <p className="price__current">$ 1099</p>
              <p className="price__old">$ 1199</p>
            </div>

            <div className="params__bottom">
              <button
                // disabled={cartItems.includes(id)}
                className="params__button button"
              // onClick={() => {
              // addToCart(id);
              // }}
              >
                <span>
                  Add to cart
          </span>
                {/* <span>
                  Added to cart
          </span> */}
              </button>
              <button
                type="button"
                className="params__icon-container icon-container icon-container__button"
              // onClick={() => { handleLiked(id) }}
              >
                <span className={classNames({
                  "icon-container__icon": true,
                  "icon-container__icon_favorites": true,
                  // "icon-container__icon_liked": likedItems.includes(id)
                })}
                >
                </span>
              </button>
            </div>
            <div className="params__details details">
              <div className="details__row details__row_1">
                <p className="details__title">Screen</p>
                <p className="details__parameter">6.5” OLED</p>
              </div>
              <div className="details__row details__row_2">
                <p className="details__title">Resolution</p>
                <p className="details__parameter">2688x1242</p>
              </div>
              <div className="details__row details__row_3">
                <p className="details__title">Processor</p>
                <p className="details__parameter">Apple A12 Bionic</p>
              </div>
              <div className="details__row details__row_4">
                <p className="details__title">RAM</p>
                <p className="details__parameter">3 GB</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about">
            <h2 className="about__title title">About</h2>

            <h3 className="about__subtitle subtitle">And then there was Pro</h3>
            <p className="about__text">
              A transformative triple‑camera system that adds tons of capability without complexity.

              An unprecedented leap in battery life. And a mind‑blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.
       </p>
            <h3 className="about__subtitle">Camera</h3>
            <p className="about__text">
              Meet the first triple‑camera system to combine cutting‑edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest‑quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.
       </p>
            <h3 className="about__subtitle">Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.</h3>
            <p className="about__text">
              iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.
       </p>

          </div>
          <div className="specs product-details__specs">
            <div className="title">Tech specs</div>
            <div className="specs__row">
                <p className="specs__title">Screen</p>
                <p>6.5” OLED</p>
              </div>
              <div className="specs__row">
                <p className="specs__title">Resolution</p>
                <p>2688x1242</p>
              </div>
              <div className="specs__row">
                <p className="specs__title">Processor</p>
                <p>Apple A12 Bionic</p>
              </div>
              <div className="specs__row">
                <p className="specs__title">RAM</p>
                <p>6.5” OLED</p>
              </div>
              <div className="specs__row">
                <p className="specs__title">Built in memory</p>
                <p>64 GB</p>
              </div>
              <div className="specs__row">
                <p className="specs__title">Camera</p>
                <p>12 Mp + 12 Mp + 12 Mp (Triple)</p>
              </div>
              <div className="specs__row">
                <p className="specs__title">Zoom</p>
                <p>Optical, 2x</p>
              </div>
              <div className="specs__row">
                <p className="specs__title">Cell</p>
                <p>GSM, LTE, UMTS</p>
              </div>
          </div>
      </div>
    </section>

  )
};