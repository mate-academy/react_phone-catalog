import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { CardDetail } from '../components/CardDetail';
import { Icon } from '../components/Icon';
import '../styles/main.scss';
import cardStyles from '../components/Card/Card.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
import { HotPrice } from '../components/HotPrice';

const colorsAvailable = ['black', 'green', 'yellow', 'white', 'purple', 'red'];
const capacityAvailable = ['64GB', '128GB', '256GB'];

export const ProductDetailsPage = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <section id="details-page" className="details-page">
      <Breadcrumbs />

      <div className="details-page__goBack-wrapper">
        <a href="#" className="details-page__goBack-link">
          <Icon iconName="left" />
          <span className="small-text">Back</span>
        </a>
      </div>

      <h2 className="details-page__title">
        Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
      </h2>

      <div className="details-page__content">
        <div className="details-page__card">
          <div className="details-page__image-wrapper">
            <a href="#" className="details-page__card-link">
              <img
                className="details-page__card-image"
                src="./img/phones/apple-iphone-7/black/00.webp"
                alt="picture"
              />
            </a>
            <ul className="details-page__card-list">
              <li className="details-page__card-item">
                <a href="#" className="details-page__card-link">
                  <img
                    className={classNames(
                      'details-page__card-image',
                      'details-page__card-image--small',
                    )}
                    src="./img/phones/apple-iphone-7/black/00.webp"
                    alt=""
                  />
                </a>
              </li>
              <li className="details-page__card-item">
                <a href="#" className="details-page__card-link">
                  <img
                    className={classNames(
                      'details-page__card-image',
                      'details-page__card-image--small',
                    )}
                    src="./img/phones/apple-iphone-7/black/01.webp"
                    alt=""
                  />
                </a>
              </li>
              <li className="details-page__card-item">
                <a href="#" className="details-page__card-link">
                  <img
                    className={classNames(
                      'details-page__card-image',
                      'details-page__card-image--small',
                    )}
                    src="./img/phones/apple-iphone-7/black/02.webp"
                    alt=""
                  />
                </a>
              </li>
              <li className="details-page__card-item">
                <a href="#" className="details-page__card-link">
                  <img
                    className={classNames(
                      'details-page__card-image',
                      'details-page__card-image--small',
                    )}
                    src="./img/phones/apple-iphone-7/black/03.webp"
                    alt=""
                  />
                </a>
              </li>
              <li className="details-page__card-item">
                <a href="#" className="details-page__card-link">
                  <img
                    className={classNames(
                      'details-page__card-image',
                      'details-page__card-image--small',
                    )}
                    src="./img/phones/apple-iphone-7/black/04.webp"
                    alt=""
                  />
                </a>
              </li>
            </ul>
          </div>

          <div
            className={classNames(
              // cardStyles.card,
              'details-page__card-controls',
            )}
          >
            <div className="details-page__card-control-color">
              <div className="small-text details-page__card-control-subtitle">
                <p>Available colors</p>
                <p>ID: 802390</p>
              </div>
              <ul className="details-page__card-control-list">
                {colorsAvailable.map(color => (
                  <li key={color} className="details-page__card-control-item">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        className="color-border"
                        x="2"
                        y="2"
                        width="28"
                        height="28"
                        rx="14"
                        style={{ fill: color }}
                        stroke="white"
                        strokeWidth="2"
                      />
                      <rect
                        id="color-fill"
                        x="0.5"
                        y="0.5"
                        width="31"
                        height="31"
                        rx="15.5"
                        className={classNames(
                          'details-page__card-control-border',
                          {
                            'details-page__card-control-border--active': false,
                          },
                        )}
                        fill="none"
                        strokeWidth="1"
                      />
                    </svg>
                  </li>
                ))}
              </ul>
            </div>

            <br />

            <div className="details-page__card-control-capacity">
              <div className="small-text details-page__card-control-subtitle">
                <p>Available colors</p>
              </div>
              <ul className="details-page__card-control-list">
                {capacityAvailable.map(capacity => (
                  <li
                    key={capacity}
                    className="details-page__card-control-item"
                  >
                    <button
                      className={classNames(
                        'details-page__card-control-button button-text',
                        { 'details-page__card-control-button--active': false },
                      )}
                    >
                      {capacity}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <br />

            <h3 className={cardStyles.card__price}>
              $799 <span>$1199</span>
            </h3>

            <div className={cardStyles.card__buttons}>
              <button
                className={classNames(
                  'button-text',
                  cardStyles.card__btn,
                  cardStyles['card__btn--add'],
                )}
              >
                Add to cart
              </button>
              <button
                className={classNames(
                  cardStyles.card__btn,
                  cardStyles['card__btn--favorite'],
                )}
                onClick={toggleFavorite}
              >
                {isFavorite ? (
                  <Icon iconName="favorites-filled" />
                ) : (
                  <Icon iconName="favorites" />
                )}
              </button>
            </div>

            <CardDetail label="Screen" value="6.5” OLED" />
            <CardDetail label="Resolution" value="2688x1242" />
            <CardDetail label="Processor" value="Apple A12 Bionic" />
            <CardDetail label="RAM" value="3 GB" />
          </div>
        </div>

        <div className="about">
          <div className="about-section">
            <h3>About</h3>

            <br />
            <h4>And then there was Pro</h4>
            <p className="body-text">
              A transformative triple‑camera system that adds tons of capability
              without complexity.
            </p>
            <p className="body-text">
              An unprecedented leap in battery life. And a mind‑blowing chip
              that doubles down on machine learning and pushes the boundaries of
              what a smartphone can do. Welcome to the first iPhone powerful
              enough to be called Pro.
            </p>

            <h4>Camera</h4>
            <p className="body-text">
              Meet the first triple‑camera system to combine cutting‑edge
              technology with the legendary simplicity of iPhone. Capture up to
              four times more scene. Get beautiful images in drastically lower
              light. Shoot the highest‑quality video in a smartphone — then edit
              with the same tools you love for photos. You’ve never shot with
              anything like it.
            </p>

            <h4>
              Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it.
              Love it.
            </h4>
            <p className="body-text">
              iPhone 11 Pro lets you capture videos that are beautifully true to
              life, with greater detail and smoother motion. Epic processing
              power means it can shoot 4K video with extended dynamic range and
              cinematic video stabilization — all at 60 fps. You get more
              creative control, too, with four times more scene and powerful new
              editing tools to play with.
            </p>
          </div>

          <div className="tech-section">
            <h3>Tech specs</h3>

            <br />

            <CardDetail label="Screen" value="6.5” OLED" />
            <CardDetail label="Resolution" value="2688x1242" />
            <CardDetail label="Processor" value="Apple A12 Bionic" />
            <CardDetail label="RAM" value="3 GB" />
            <CardDetail label="Built in memory" value="64 GB" />
            <CardDetail label="Camera" value="12 Mp + 12 Mp + 12 Mp (Triple)" />
            <CardDetail label="Zoom" value="Optical, 2x" />
            <CardDetail label="Cell" value="GSM, LTE, UMTS" />
          </div>
        </div>
      </div>

      <HotPrice />
    </section>
  );
};
