import { Link, useParams } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import './PhoneOffer.scss';
import { useContext, useState } from 'react';
import { CatalogContext } from '../CatalogProvider';
import Slider from 'react-slick';
import classNames from 'classnames';

export const PhoneOffer = () => {
  const { phones } = useContext(CatalogContext);
  const { itemId } = useParams();
  const selectedPhone = phones.find(phone => phone.id === itemId);
  const [selectedColor, setSelectedColor] = useState(selectedPhone?.color);
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
      ></img>
    ),
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
        </div>
      </div>
    </>
  );
};
