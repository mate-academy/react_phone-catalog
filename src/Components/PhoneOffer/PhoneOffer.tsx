import { Link, useParams } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import './PhoneOffer.scss';
import { useContext, useState } from 'react';
import { CatalogContext } from '../CatalogProvider';
import Slider from 'react-slick';
import classNames from 'classnames';
import { Footer } from '../Footer/Footer';
import { ProductCard } from '../ProductCard/ProductCard';

export const PhoneOffer = () => {
  const { phones, products } = useContext(CatalogContext);
  const { itemId } = useParams();
  const selectedPhone = phones.find(phone => phone.id === itemId);
  const proposedPhones = products.filter(
    product =>
      product.category === 'phones' &&
      product.capacity === selectedPhone?.capacity,
  );
  const [selectedColor, setSelectedColor] = useState(selectedPhone?.color);
  const [selectedCapacity, setSelectedCapacity] = useState(
    selectedPhone?.capacity,
  );
  const [activeImage, setActiveImage] = useState(false);
  const id = (Math.random() * 100000).toFixed(0);

  const settings = {
    className: 'phoneoffer__phoneslider',
    arrows: false,
    dots: true,
    appendDots: (dots: number) => (
      <ul
        style={{
          width: '240px',
          height: '49px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {dots}
      </ul>
    ),
    customPaging: (i: number) => (
      <img
        style={{ width: '51.2px', height: '49px', objectFit: 'contain' }}
        src={selectedPhone?.images[i]}
        onClick={() => setActiveImage(true)}
        className={classNames('phoneoffer__image', {
          'phoneoffer__image--active': activeImage,
        })}
      ></img>
    ),
  };

  const secondSettings = {
    infinite: false,
    arrows: true,
    className: 'phoneoffer__proposition',
  };

  return (
    <>
      <Navigation />
      <div className="phoneoffer">
        <div className="phoneoffer__breadcrumbs">
          <Link to="/">
            <div className="phoneoffer__breadcrumbs--home" />
          </Link>
          <div className="phoneoffer__breadcrumbs--arrow" />
          <Link className="phoneoffer__breadcrumbs--text-active" to="/phones">
            <div>Phones</div>
          </Link>
          <div className="phoneoffer__breadcrumbs--arrow" />
          <div className="phoneoffer__breadcrumbs--text">{itemId}</div>
        </div>
        <Link to="/phones" className="phoneoffer__breadcrumbs--back-button">
          <div className="phoneoffer__breadcrumbs--back-arrow"></div> Back
        </Link>
        <h1 className="phoneoffer__title">{selectedPhone?.name}</h1>

        <Slider {...settings}>
          {selectedPhone?.images.map((image, index) => (
            <img key={index} src={image} className="phoneoffer__image" />
          ))}
        </Slider>
        <div className="phoneoffer__panel">
          <div className="phoneoffer__panel--id-and-title">
            <h2 className="phoneoffer__panel--title">Available colors</h2>
            <div className="phoneoffer__panel--id-number">{`ID: ${id}`}</div>
          </div>
          <div className="phoneoffer__panel--colors">
            {selectedPhone?.colorsAvailable.map(color => {
              const getSelectedColor = (currentColor: string) => {
                if (color === currentColor) {
                  setSelectedColor(color);
                }
              };

              return (
                <button
                  onClick={() => getSelectedColor(color)}
                  className={classNames('phoneoffer__panel--color-selection', {
                    'phoneoffer__panel--color-selection--selected':
                      selectedColor === color,
                  })}
                  key={color}
                  style={{ backgroundColor: `${color}` }}
                ></button>
              );
            })}
          </div>
          <div className="phoneoffer__line"></div>
          <div className="phoneoffer__panel--capacity-title">
            Select capacity
          </div>
          {selectedPhone?.capacityAvailable.map(capacity => {
            const getSelectedCapacity = (currentCapacity: string) => {
              if (currentCapacity === capacity) {
                setSelectedCapacity(capacity);
              }
            };

            return (
              <button
                className={classNames('phoneoffer__panel--capacity-option', {
                  'phoneoffer__panel--capacity-option-selected':
                    selectedCapacity === capacity,
                })}
                key={capacity}
                onClick={() => getSelectedCapacity(capacity)}
              >
                {capacity}
              </button>
            );
          })}
          <div className="phoneoffer__line"></div>
          <div className="phoneoffer__panel--prices">
            <div className="phoneoffer__panel--price">{`$${selectedPhone?.priceDiscount}`}</div>
            <del className="phoneoffer__panel--price-discount">{`$${selectedPhone?.priceRegular}`}</del>
          </div>
          <div className="phoneoffer__panel--buttons">
            <button className="phoneoffer__panel--adding-button">
              Add to cart
            </button>
            <button className="phoneoffer__panel--heart-button"></button>
          </div>
          <div className="phoneoffer__panel--basicspec">
            <div className="phoneoffer__panel--basicspec-data">
              <div className="phoneoffer__panel--basicspec-title">Screen</div>
              <div className="phoneoffer__panel--basicspec-text">
                {selectedPhone?.screen}
              </div>
            </div>
            <div className="phoneoffer__panel--basicspec-data">
              <div className="phoneoffer__panel--basicspec-title">
                Resolution
              </div>
              <div className="phoneoffer__panel--basicspec-text">
                {selectedPhone?.resolution}
              </div>
            </div>
            <div className="phoneoffer__panel--basicspec-data">
              <div className="phoneoffer__panel--basicspec-title">
                Processor
              </div>
              <div className="phoneoffer__panel--basicspec-text">
                {selectedPhone?.processor}
              </div>
            </div>
            <div className="phoneoffer__panel--basicspec-data">
              <div className="phoneoffer__panel--basicspec-title">RAM</div>
              <div className="phoneoffer__panel--basicspec-text">
                {selectedPhone?.ram}
              </div>
            </div>
          </div>
        </div>
        <div className="phoneoffer__description">
          <h2 className="phoneoffer__description--header">About</h2>
          <div className="phoneoffer__line"></div>
          {selectedPhone?.description.map(data => (
            <>
              <div className="phoneoffer__description--title">{data.title}</div>
              <div className="phoneoffer__description--text">{data.text}</div>
            </>
          ))}
          <div className="phoneoffer__line"></div>
        </div>
        <div className="phoneoffer__techspecs">
          <div className="phoneoffer__techspecs--data">
            <div className="phoneoffer__techspecs--title">Screen</div>
            <div className="phoneoffer__techspecs--text">
              {selectedPhone?.screen}
            </div>
          </div>
          <div className="phoneoffer__techspecs--data">
            <div className="phoneoffer__techspecs--title">Resolution</div>
            <div className="phoneoffer__techspecs--text">
              {selectedPhone?.resolution}
            </div>
          </div>
          <div className="phoneoffer__techspecs--data">
            <div className="phoneoffer__techspecs--title">Processor</div>
            <div className="phoneoffer__techspecs--text">
              {selectedPhone?.processor}
            </div>
          </div>
          <div className="phoneoffer__techspecs--data">
            <div className="phoneoffer__techspecs--title">RAM</div>
            <div className="phoneoffer__techspecs--text">
              {selectedPhone?.ram}
            </div>
          </div>
          <div className="phoneoffer__techspecs--data">
            <div className="phoneoffer__techspecs--title">Built in memory</div>
            <div className="phoneoffer__techspecs--text">
              {selectedPhone?.capacity}
            </div>
          </div>
          <div className="phoneoffer__techspecs--data">
            <div className="phoneoffer__techspecs--title">Camera</div>
            <div className="phoneoffer__techspecs--text">
              {selectedPhone?.camera}
            </div>
          </div>
          <div className="phoneoffer__techspecs--data">
            <div className="phoneoffer__techspecs--title">Zoom</div>
            <div className="phoneoffer__techspecs--text">
              {selectedPhone?.zoom}
            </div>
          </div>
          <div className="phoneoffer__techspecs--data">
            <div className="phoneoffer__techspecs--title">Cell</div>

            {selectedPhone?.cell.map(cell => (
              <div className="phoneoffer__techspecs--text" key={cell}>
                {`${cell}, `}
              </div>
            ))}
          </div>
        </div>
        <div className="phoneoffer__slider">
          <div className="phoneoffer__slider--header">You may also like</div>

          <Slider {...secondSettings}>
            {proposedPhones.map(proposedPhone => (
              <ProductCard key={proposedPhone.id} product={proposedPhone} />
            ))}
          </Slider>
        </div>
      </div>
      <Footer />
    </>
  );
};
