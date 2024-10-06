import { Link, useNavigate, useParams } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import './ProductOffer.scss';
import { useContext, useState } from 'react';
import { CatalogContext } from '../CatalogProvider';
import Slider from 'react-slick';
import classNames from 'classnames';
import { Footer } from '../Footer/Footer';
import { ProductCard } from '../ProductCard/ProductCard';

export const AccessoriesOffer = () => {
  const { accessories, products } = useContext(CatalogContext);
  const { itemId } = useParams();
  const selectedAccessory = accessories.find(
    accessory => accessory.id === itemId,
  );
  const proposedPhones = products.filter(
    product =>
      product.category === 'accessories' &&
      product.capacity === selectedAccessory?.capacity,
  );
  const [selectedColor, setSelectedColor] = useState(selectedAccessory?.color);
  const [selectedCapacity, setSelectedCapacity] = useState(
    selectedAccessory?.capacity,
  );
  const [activeImage, setActiveImage] = useState(false);
  const id = (Math.random() * 100000).toFixed(0);

  const navigate = useNavigate();

  const settings = {
    className: 'productoffer__phoneslider',
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
        src={selectedAccessory?.images[i]}
        onClick={() => setActiveImage(true)}
        className={classNames('productoffer__image', {
          'productoffer__image--active': activeImage,
        })}
      ></img>
    ),
  };

  const secondSettings = {
    infinite: false,
    arrows: true,
    className: 'productoffer__proposition',
  };

  return (
    <>
      <Navigation />
      <div className="productoffer">
        <div className="productoffer__breadcrumbs">
          <Link to="/">
            <div className="productoffer__breadcrumbs--home" />
          </Link>
          <div className="productoffer__breadcrumbs--arrow" />
          <Link
            className="productoffer__breadcrumbs--text-active"
            to="/accessories"
          >
            <div>Accessories</div>
          </Link>
          <div className="productoffer__breadcrumbs--arrow" />
          <div className="productoffer__breadcrumbs--text">{itemId}</div>
        </div>
        <Link to="/phones" className="productoffer__breadcrumbs--back-button">
          <div className="productoffer__breadcrumbs--back-arrow"></div> Back
        </Link>
        <h1 className="productoffer__title">{selectedAccessory?.name}</h1>

        <Slider {...settings}>
          {selectedAccessory?.images.map((image, index) => (
            <img key={index} src={image} className="productoffer__image" />
          ))}
        </Slider>
        <div className="productoffer__panel">
          <div className="productoffer__panel--id-and-title">
            <h2 className="productoffer__panel--title">Available colors</h2>
            <div className="productoffer__panel--id-number">{`ID: ${id}`}</div>
          </div>
          <div className="productoffer__panel--colors">
            {selectedAccessory?.colorsAvailable.map(color => {
              const getSelectedColor = (currentColor: string) => {
                if (color === currentColor) {
                  setSelectedColor(color);

                  navigate(
                    `/accessories/${selectedAccessory.namespaceId}-${selectedCapacity?.toLowerCase()}-${selectedColor}`,
                  );
                }
              };

              return (
                <button
                  onClick={() => getSelectedColor(color)}
                  className={classNames(
                    'productoffer__panel--color-selection',
                    {
                      'productoffer__panel--color-selection--selected':
                        selectedColor === color,
                    },
                  )}
                  key={color}
                  style={{ backgroundColor: `${color}` }}
                ></button>
              );
            })}
          </div>
          <div className="productoffer__line"></div>
          <div className="productoffer__panel--capacity-title">
            Select capacity
          </div>
          {selectedAccessory?.capacityAvailable.map(capacity => {
            const getSelectedCapacity = (currentCapacity: string) => {
              if (currentCapacity === capacity) {
                setSelectedCapacity(capacity);

                navigate(
                  `/accessories/${selectedAccessory.namespaceId}-${selectedCapacity?.toLowerCase()}-${selectedColor}`,
                );
              }
            };

            return (
              <button
                className={classNames('productoffer__panel--capacity-option', {
                  'productoffer__panel--capacity-option-selected':
                    selectedCapacity === capacity,
                })}
                key={capacity}
                onClick={() => getSelectedCapacity(capacity)}
              >
                {capacity}
              </button>
            );
          })}
          <div className="productoffer__line"></div>
          <div className="productoffer__panel--prices">
            <div className="productoffer__panel--price">{`$${selectedAccessory?.priceDiscount}`}</div>
            <del className="productoffer__panel--price-discount">{`$${selectedAccessory?.priceRegular}`}</del>
          </div>
          <div className="productoffer__panel--buttons">
            <button className="productoffer__panel--adding-button">
              Add to cart
            </button>
            <button className="productoffer__panel--heart-button"></button>
          </div>
          <div className="productoffer__panel--basicspec">
            <div className="productoffer__panel--basicspec-data">
              <div className="productoffer__panel--basicspec-title">Screen</div>
              <div className="productoffer__panel--basicspec-text">
                {selectedAccessory?.screen}
              </div>
            </div>
            <div className="productoffer__panel--basicspec-data">
              <div className="productoffer__panel--basicspec-title">
                Resolution
              </div>
              <div className="productoffer__panel--basicspec-text">
                {selectedAccessory?.resolution}
              </div>
            </div>
            <div className="productoffer__panel--basicspec-data">
              <div className="productoffer__panel--basicspec-title">
                Processor
              </div>
              <div className="productoffer__panel--basicspec-text">
                {selectedAccessory?.processor}
              </div>
            </div>
            <div className="productoffer__panel--basicspec-data">
              <div className="productoffer__panel--basicspec-title">RAM</div>
              <div className="productoffer__panel--basicspec-text">
                {selectedAccessory?.ram}
              </div>
            </div>
          </div>
        </div>
        <div className="productoffer__description">
          <h2 className="productoffer__description--header">About</h2>
          <div className="productoffer__line"></div>
          {selectedAccessory?.description.map(data => (
            <>
              <div className="productoffer__description--title">
                {data.title}
              </div>
              <div className="productoffer__description--text">{data.text}</div>
            </>
          ))}
          <div className="productoffer__line"></div>
        </div>
        <div className="productoffer__techspecs">
          <div className="productoffer__techspecs--data">
            <div className="productoffer__techspecs--title">Screen</div>
            <div className="productoffer__techspecs--text">
              {selectedAccessory?.screen}
            </div>
          </div>
          <div className="productoffer__techspecs--data">
            <div className="productoffer__techspecs--title">Resolution</div>
            <div className="productoffer__techspecs--text">
              {selectedAccessory?.resolution}
            </div>
          </div>
          <div className="productoffer__techspecs--data">
            <div className="productoffer__techspecs--title">Processor</div>
            <div className="productoffer__techspecs--text">
              {selectedAccessory?.processor}
            </div>
          </div>
          <div className="productoffer__techspecs--data">
            <div className="productoffer__techspecs--title">RAM</div>
            <div className="productoffer__techspecs--text">
              {selectedAccessory?.ram}
            </div>
          </div>
          <div className="productoffer__techspecs--data">
            <div className="productoffer__techspecs--title">
              Built in memory
            </div>
            <div className="productoffer__techspecs--text">
              {selectedAccessory?.capacity}
            </div>
          </div>
          <div className="productoffer__techspecs--data">
            <div className="productoffer__techspecs--title">Camera</div>
            <div className="productoffer__techspecs--text">
              {selectedAccessory?.camera}
            </div>
          </div>
          <div className="productoffer__techspecs--data">
            <div className="productoffer__techspecs--title">Zoom</div>
            <div className="productoffer__techspecs--text">
              {selectedAccessory?.zoom}
            </div>
          </div>
          <div className="productoffer__techspecs--data">
            <div className="productoffer__techspecs--title">Cell</div>

            {selectedAccessory?.cell.map(cell => (
              <div className="productoffer__techspecs--text" key={cell}>
                {`${cell}, `}
              </div>
            ))}
          </div>
        </div>
        <div className="productoffer__slider">
          <div className="productoffer__slider--header">You may also like</div>

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
