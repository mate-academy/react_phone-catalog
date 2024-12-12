import { BackButton } from '../../components/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductSlider } from '../../components/ProductSlider';
import { ProductSpecs } from '../../components/ProductSpecs';
import './Product.scss';

export const Product = () => {
  return (
    <div className="product">
      <Breadcrumbs
        paths={['Phones', 'Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)']}
      />
      <div className="product__back-button">
        <BackButton />
      </div>
      <h2 className="product__title">
        Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
      </h2>
      <div className="product__container">
        <div className="product__small-images">
          <div className="product__small-images-image square-container">
            <img
              src="/img/phones/apple-iphone-11-pro-max/gold/00.webp"
              alt="Image"
            />
          </div>
          <div className="product__small-images-image square-container">
            <img
              src="/img/phones/apple-iphone-11-pro-max/gold/02.webp"
              alt="Image"
            />
          </div>
        </div>

        <div className="product__image square-container">
          <img
            src="/img/phones/apple-iphone-11-pro-max/gold/00.webp"
            alt="Image"
          />
        </div>

        <div className="product__details">
          <p className="product__details-name small-text">Available colors</p>
          <div className="product__selector-container">
            <div className="product__color-border">
              <div className="product__color"></div>
            </div>
          </div>

          <div className="divider-line"></div>

          <p className="product__details-name small-text">Select capacity</p>
          <div className="product__selector-container">
            <button className="product__capacity-button">64 GB</button>
            <button className="product__capacity-button button--white">
              256 GB
            </button>
            <button className="product__capacity-button button--white">
              512 GB
            </button>
          </div>

          <div className="divider-line"></div>

          <div className="product__price-container">
            <h2 className="product__price">$799</h2>
            <h3 className="product__old-price">$1199</h3>
          </div>

          <div className="product__buttons">
            <button className="product__cart-button">Add to cart</button>
            <button className="product__favourite-button button--white">
              <img src="/icons/favourite.svg" alt="Favourite icon" />
            </button>
          </div>

          <div className="product__specs-container">
            <ProductSpecs
              specs={{
                Screen: '6.5” OLED',
                Resolution: '2688x1242',
                Processor: 'Apple A12 Bionic',
                RAM: '3 GB',
              }}
            />
          </div>
        </div>

        <p className="product__id small-text">ID: 802390</p>
      </div>

      <div className="product__description">
        <div className="product__description-info">
          <h3>About</h3>

          <div className="divider-line"></div>

          <div className="product__description-info-container">
            <div className="product__description-info-block">
              <h4 className="product__description-info-title">
                And then there was Pro
              </h4>
              <p className="product__description-info-text body-text slim-text">
                A transformative triple‑camera system that adds tons of
                capability without complexity. An unprecedented leap in battery
                life. And a mind‑blowing chip that doubles down on machine
                learning and pushes the boundaries of what a smartphone can do.
                Welcome to the first iPhone powerful enough to be called Pro.
              </p>
            </div>

            <div className="product__description-info-block">
              <h4 className="product__description-info-title">Camera</h4>
              <p className="product__description-info-text body-text slim-text">
                Meet the first triple‑camera system to combine cutting‑edge
                technology with the legendary simplicity of iPhone. Capture up
                to four times more scene. Get beautiful images in drastically
                lower light. Shoot the highest‑quality video in a smartphone —
                then edit with the same tools you love for photos. You’ve never
                shot with anything like it.
              </p>
            </div>

            <div className="product__description-info-block">
              <h4 className="product__description-info-title">
                Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it.
                Love it.
              </h4>
              <p className="product__description-info-text body-text slim-text">
                iPhone 11 Pro lets you capture videos that are beautifully true
                to life, with greater detail and smoother motion. Epic
                processing power means it can shoot 4K video with extended
                dynamic range and cinematic video stabilization — all at 60 fps.
                You get more creative control, too, with four times more scene
                and powerful new editing tools to play with.
              </p>
            </div>
          </div>
        </div>

        <div className="product__description-specs">
          <h3>Tech specs</h3>

          <div className="divider-line"></div>

          <ProductSpecs
            specs={{
              Screen: '6.5” OLED',
              Resolution: '2688x1242',
              Processor: 'Apple A12 Bionic',
              RAM: '3 GB',
              'Built in memory': '64 GB',
              Camera: '12 Mp + 12 Mp + 12 Mp (Triple)',
              Zoom: 'Optical, 2x',
              Cell: 'GSM, LTE, UMTS',
            }}
            slimText={true}
          />
        </div>
      </div>

      <div className="product__slider">
        <ProductSlider title="You may also like" />
      </div>
    </div>
  );
};
