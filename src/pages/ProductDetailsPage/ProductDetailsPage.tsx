import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProductsDetails } from '../../helper/api';
import { ProductDeteils } from '../../helper/ProductDeteils';
import './ProductDetailsPage.scss';
import { Link } from 'react-router-dom';

interface Description {
  text: string[];
  title: string;
}

export const ProductDetailsPage = () => {
  const location = useLocation();
  const [product, setProduct] = useState<ProductDeteils | null>(null);

  function showBigPicture(imageSrc: string) {
    const picture = document.querySelector(
      '.details__bigImage',
    ) as HTMLImageElement;

    if (imageSrc) {
      picture.src = imageSrc;
    }
  }

  const {
    camera,
    capacity,
    capacityAvailable,
    cell,
    colorsAvailable,
    description = [],
    images,
    name,
    priceDiscount,
    priceRegular,
    processor,
    ram,
    resolution,
    screen,
    zoom,
  } = product || {};

  const { pathname } = location;
  const segments = pathname.split('/');
  const phoneId = segments[segments.length - 1];

  useEffect(() => {
    getProductsDetails(phoneId).then(setProduct);
  }, []);

  return (
    <div className="details">
      <div className="details__url">{pathname}</div>

      <div className="details__back">
        <Link to="/phones" className="details__back-link">
          <span className="details__arrey">&lt;</span> Back
        </Link>
      </div>

      <h1 className="details__h1"> {name}</h1>
      <div className="details__card">
        <div className="details__images">
          <div className="details__smallImagesBox">
            {images?.map(image => (
              <div className="details__smallBox details__box" key={image}>
                <img
                  src={`_new/${image}`}
                  alt=""
                  className="details__image"
                  onClick={() => showBigPicture(`_new/${image}`)}
                />
              </div>
            ))}
          </div>

          <div className="details__bigBox details__box">
            <img
              src={images && `_new/${images[0]}`}
              className="details__bigImage details__image"
            />
          </div>
        </div>

        <div className="details__featuresBox">
          <div className="details__colors">
            <div className="details__small-title">Available colors</div>
            <div className="details__colors-box">
              {colorsAvailable?.map(color => (
                <div
                  className={`details__color details__color--${color}`}
                  style={{ backgroundColor: color }}
                  key={color}
                ></div>
              ))}
            </div>
          </div>

          <div className="details__box">
            <div className="details__small-title">Select capacity</div>
            <div className="details__capacity-box">
              {capacityAvailable?.map(capac => (
                <div className="details__capacity-item" key={capac}>
                  {capac}
                </div>
              ))}
            </div>
          </div>

          <div className="details__addButton">
            <div className="details__price">
              <div className="details__price-discount">{priceDiscount}</div>
              <div className="details__price-regular">{priceRegular}</div>
            </div>
          </div>

          <div className="details__inform">
            <div className="details__inform-item">
              <p className="details__name">Screen:</p>
              <p className="details__char">{screen}</p>
            </div>
            <div className="details__inform-item">
              <p className="details__name">Resolution:</p>
              <p className="details__char">{resolution}</p>
            </div>
            <div className="details__inform-item">
              <p className="details__name">Processor:</p>
              <p className="details__char">{processor}</p>
            </div>
            <div className="details__inform-item">
              <p className="details__name">RAM:</p>
              <p className="details__char">{ram}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="details__description">
        <div className="details__about" data-cy="productDescription">
          <h2 className="details__h2">About</h2>

          {description?.map(elem => (
            <div className="details__section" key={(elem as Description).title}>
              <h3 className="details__h3">{(elem as Description)?.title}</h3>

              <p className="details__text">{(elem as Description)?.text[0]}</p>
              <p className="details__text">{(elem as Description)?.text[1]}</p>
            </div>
          ))}
        </div>

        <div className="details__tech-specs">
          <h2 className="details__h2">Tech specs</h2>
          <div className="details__tech-item">
            <p className="details__tech-name">Screen</p>
            <p className="details__tech-char">{screen}</p>
          </div>

          <div className="details__tech-item">
            <p className="details__tech-name">Resolution</p>
            <p className="details__tech-char">{resolution}</p>
          </div>
          <div className="details__tech-item">
            <p className="details__tech-name">Processor</p>
            <p className="details__tech-char">{processor}</p>
          </div>
          <div className="details__tech-item">
            <p className="details__tech-name">RAM</p>
            <p className="details__tech-char">{ram}</p>
          </div>

          <div className="details__tech-item">
            <p className="details__tech-name">Built in memory</p>
            <p className="details__tech-char">{capacity}</p>
          </div>

          <div className="details__tech-item">
            <p className="details__tech-name">Camera</p>
            <p className="details__tech-char">{camera}</p>
          </div>
          <div className="details__tech-item">
            <p className="details__tech-name">Zoom</p>
            <p className="details__tech-char">{zoom}</p>
          </div>
          <div className="details__tech-item">
            <p className="details__tech-name">Cell</p>
            <p className="details__tech-char">{cell}</p>
          </div>
        </div>
      </div>

      <div className="details__alsolike"></div>
    </div>
  );
};
