import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { CardDetail } from '../components/CardDetail';
import { Icon } from '../components/ui/Icon';
import '../styles/main.scss';
import cardStyles from '../components/Card/Card.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { ProductSlider } from '../components/ProductSlider';
import { GoBackLink } from '../components/ui/GoBackLink';
import { RoundColorButton } from '../components/ui/RoundColorButton';
import { Product } from '../types/Product';
import { getProducts } from '../services/products';

const colorsAvailable = ['black', 'green', 'yellow', 'white', 'purple', 'red'];
const capacityAvailable = ['64GB', '128GB', '256GB'];

export const ItemPage = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    colorsAvailable[0],
  );
  const [products, setProducts] = useState<Product[]>([]);
  const paramFromNavLink = 'phones';

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data);
    });
  }, []);

  // favorites must be in local storage or null
  // hook useLocalStorage??
  const filteredProducts = products.filter(
    product => product.category === paramFromNavLink,
  );

  const suggestProducts = [...filteredProducts].sort((a, b) => {
    // Calculate the discount for both products
    const discountA = a.fullPrice - a.price;
    const discountB = b.fullPrice - b.price;

    // Calculate a composite score considering both year and discount
    const scoreA = a.year * 1000 + discountA;
    const scoreB = b.year * 1000 + discountB;

    // Sort by the combined score
    return scoreB - scoreA;
  });

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <section id="item-page" className="item-page">
      <div className="item-page__navigation">
        <Breadcrumbs />
      </div>

      <GoBackLink />

      <div className="item-page__content">
        <h3 className="item-page__title">
          Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
        </h3>

        <div className="item-page__card">
          <div className="item-page__image-wrapper">
            <a href="#" className="item-page__card-link">
              <img
                className="item-page__card-image"
                src="../../public/img/phones/apple-iphone-7/black/00.webp"
                alt="picture"
              />
            </a>
            <ul className="item-page__thumbnail-list">
              <li
                className={classNames('item-page__thumbnail-item', {
                  ['item-page__thumbnail-item--selected']: true,
                })}
              >
                <a href="#" className="item-page__thumbnail-link">
                  <img
                    className="item-page__thumbnail-image"
                    src="./img/phones/apple-iphone-7/black/00.webp"
                    alt=""
                  />
                </a>
              </li>
              <li className="item-page__thumbnail-item">
                <a href="#" className="item-page__thumbnail-link">
                  <img
                    className={classNames(
                      'item-page__card-image',
                      'item-page__thumbnail-image',
                    )}
                    src="./img/phones/apple-iphone-7/black/01.webp"
                    alt=""
                  />
                </a>
              </li>
              <li className="item-page__thumbnail-item">
                <a href="#" className="item-page__thumbnail-link">
                  <img
                    className={classNames(
                      'item-page__card-image',
                      'item-page__thumbnail-image',
                    )}
                    src="./img/phones/apple-iphone-7/black/02.webp"
                    alt=""
                  />
                </a>
              </li>
              <li className="item-page__thumbnail-item">
                <a href="#" className="item-page__thumbnail-link">
                  <img
                    className={classNames(
                      'item-page__card-image',
                      'item-page__thumbnail-image',
                    )}
                    src="./img/phones/apple-iphone-7/black/03.webp"
                    alt=""
                  />
                </a>
              </li>
              <li className="item-page__thumbnail-item">
                <a href="#" className="item-page__thumbnail-link">
                  <img
                    className={classNames(
                      'item-page__card-image',
                      'item-page__thumbnail-image',
                    )}
                    src="./img/phones/apple-iphone-7/black/04.webp"
                    alt=""
                  />
                </a>
              </li>
            </ul>
          </div>

          <div className="item-page__card-controls">
            <div className="small-text item-page__controls-subtitle">
              <p>Available colors</p>
              <p>ID: 802390</p>
            </div>

            <div className="item-page__container">
              <ul className="item-page__buttons-list">
                {colorsAvailable.map(color => (
                  <RoundColorButton
                    key={color}
                    color={color}
                    isSelected={selectedColor === color}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </ul>

              <div className="small-text item-page__controls-subtitle">
                <p>Select capacity</p>
              </div>

              <ul className="item-page__buttons-list">
                {capacityAvailable.map(capacity => (
                  <li key={capacity} className="item-page__buttons-item ">
                    <button
                      className={classNames(
                        'body-text',
                        'item-page__capacity-btn button-text',
                        { 'item-page__capacity-btn--selected': false },
                      )}
                    >
                      {capacity}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="item-page__price-frame">
                <h3 className="item-page__price">
                  $799 <span className="item-page__old-price">$1199</span>
                </h3>

                <div className={cardStyles.card__buttons}>
                  <button
                    className={classNames(
                      'button-text',
                      cardStyles.card__btn,
                      cardStyles['card__btn--add'],
                    )}
                    style={{ height: '48px' }}
                  >
                    Add to cart
                  </button>
                  <button
                    className={classNames(
                      cardStyles.card__btn,
                      cardStyles['card__btn--favorite'],
                    )}
                    style={{ height: '48px', width: '48px' }}
                    onClick={toggleFavorite}
                  >
                    {isFavorite ? (
                      <Icon iconName="favorites-filled" />
                    ) : (
                      <Icon iconName="favorites" />
                    )}
                  </button>
                </div>
              </div>

              <div className="item-page__control-details">
                <CardDetail
                  label="Screen"
                  value="6.5” OLED"
                  inlineStyles={{ fontSize: '12px', lineHeight: '16px' }}
                />
                <CardDetail
                  label="Resolution"
                  value="2688x1242"
                  inlineStyles={{ fontSize: '12px', lineHeight: '16px' }}
                />
                <CardDetail
                  label="Processor"
                  value="Apple A12 Bionic"
                  inlineStyles={{ fontSize: '12px', lineHeight: '16px' }}
                />
                <CardDetail
                  label="RAM"
                  value="3 GB"
                  inlineStyles={{ fontSize: '12px', lineHeight: '16px' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="item-page__details">
          <div className="item-page__about-wrapper">
            <h4 className="item-page__details-title">About</h4>

            <div className="item-page__about-section">
              <h5>And then there was Pro</h5>
              <p className="body-text--gray">
                A transformative triple‑camera system that adds tons of
                capability without complexity.
              </p>
              <p className="body-text--gray">
                An unprecedented leap in battery life. And a mind‑blowing chip
                that doubles down on machine learning and pushes the boundaries
                of what a smartphone can do. Welcome to the first iPhone
                powerful enough to be called Pro.
              </p>
            </div>

            <div className="item-page__about-section">
              <h5>Camera</h5>
              <p className="body-text--gray">
                Meet the first triple‑camera system to combine cutting‑edge
                technology with the legendary simplicity of iPhone. Capture up
                to four times more scene. Get beautiful images in drastically
                lower light. Shoot the highest‑quality video in a smartphone —
                then edit with the same tools you love for photos. You’ve never
                shot with anything like it.
              </p>
            </div>

            <div className="item-page__about-section">
              <h5>
                Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it.
                Love it.
              </h5>
              <p className="body-text--gray">
                iPhone 11 Pro lets you capture videos that are beautifully true
                to life, with greater detail and smoother motion. Epic
                processing power means it can shoot 4K video with extended
                dynamic range and cinematic video stabilization — all at 60 fps.
                You get more creative control, too, with four times more scene
                and powerful new editing tools to play with.
              </p>
            </div>
          </div>

          <div className="item-page__tech-wrapper">
            <h4 className="item-page__details-title">Tech specs</h4>

            <div className="item-page__tech-info">
              <CardDetail
                label="Screen"
                value="6.5” OLED"
                inlineStyles={{
                  fontSize: '14px',
                  lineHeight: '21px',
                  fontWeight: '400',
                  textTransform: 'none',
                }}
              />
              <CardDetail
                label="Resolution"
                value="2688x1242"
                inlineStyles={{
                  fontSize: '14px',
                  lineHeight: '21px',
                  fontWeight: '400',
                  textTransform: 'none',
                }}
              />
              <CardDetail
                label="Processor"
                value="Apple A12 Bionic"
                inlineStyles={{
                  fontSize: '14px',
                  lineHeight: '21px',
                  fontWeight: '400',
                  textTransform: 'none',
                }}
              />
              <CardDetail
                label="RAM"
                value="3 GB"
                inlineStyles={{
                  fontSize: '14px',
                  lineHeight: '21px',
                  fontWeight: '400',
                  textTransform: 'none',
                }}
              />
              <CardDetail
                label="Built in memory"
                value="64 GB"
                inlineStyles={{
                  fontSize: '14px',
                  lineHeight: '21px',
                  fontWeight: '400',
                  textTransform: 'none',
                }}
              />
              <CardDetail
                label="Camera"
                value="12 Mp + 12 Mp + 12 Mp (Triple)"
                inlineStyles={{
                  fontSize: '14px',
                  lineHeight: '21px',
                  fontWeight: '400',
                  textTransform: 'none',
                }}
              />
              <CardDetail
                label="Zoom"
                value="Optical, 2x"
                inlineStyles={{
                  fontSize: '14px',
                  lineHeight: '21px',
                  fontWeight: '400',
                  textTransform: 'none',
                }}
              />
              <CardDetail
                label="Cell"
                value="GSM, LTE, UMTS"
                inlineStyles={{
                  fontSize: '14px',
                  lineHeight: '21px',
                  fontWeight: '400',
                  textTransform: 'none',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <ProductSlider title="You may also like" items={suggestProducts} />
    </section>
  );
};
