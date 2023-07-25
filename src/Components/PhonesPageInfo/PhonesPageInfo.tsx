/* eslint-disable react/no-unused-prop-types */
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './PhonesPageInfo.scss';
import { PhonesPageInfoPrice } from './PhonesPageInfoPrice/PhonesPageInfoPrice';
import { PhonesPageInfoFovorite }
  from './PhonesPageInfoFovorite/PhonesPageInfoFovorite';
import HomeImage from './PhonesPageInfoImage/Home.svg';
import Arrowimage from './PhonesPageInfoImage/Arrow.svg';
import PrevArrow from './PhonesPageInfoImage/PrevArrow.svg';
import { PhonesPageInfoButton }
  from './PhonesPageInfoButton/PhonesPageInfoButton';
import { HotPrices } from '../Pages/HomePage/HotPrice';

interface Description {
  title: string;
  text: string[];
}

interface Info {
  id: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: Description[];
  title?: string;
  text?: string;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

interface InfoProps {
  info: Info | null;
  onColorClick: (color: string) => void;
  onGBclick: (capacity: string) => void;
  priceRegular: number;
  priceDiscount: number;
}

export const PhonesPageInfo = ({ info }: InfoProps) => {
  const location = useLocation();
  const navigation = useNavigate();

  const {
    name,
    screen,
    resolution,
    processor,
    ram,
    capacity,
    camera,
    zoom,
    cell,
    images = [],
    colorsAvailable = [],
    capacityAvailable = [],
    color,
    id,
  } = info || {};

  const [mainImage, setMainImage] = useState(`./new/${images[0]}`);
  const [selectedColor, setSelectedColor] = useState(
    color || colorsAvailable[0],
  );

  const [selectedGb, setSelectedGb] = useState(
    capacity || capacityAvailable[0],
  );
  const navigate = useNavigate();

  useEffect(() => {
    setMainImage(`./new/${images[0]}`);
    setSelectedColor(color || colorsAvailable[0]);
    setSelectedGb(capacity || capacityAvailable[0]);
  }, [info?.id]);

  const handleImageClick = (index: number) => {
    setMainImage(`./new/${images[index]}`);
  };

  const handleColorClick = (clickedColor: string) => {
    if (id) {
      const url = `/phones/${id.replace(/-[a-zA-Z]+$/, '')}-${clickedColor.toLowerCase().replace(/\s/g, '-')}`;

      navigate(url);
    }
  };

  const hendleGBclick = (clickedGB: string) => {
    if (id) {
      const url = location.pathname;
      const parts = url.split('/');
      const lastPart = parts[parts.length - 1];
      const lastPartWords = lastPart.split('-');

      lastPartWords[lastPartWords.length - 2]
        = clickedGB.toLowerCase().replace(/\s/g, '-');
      const newLastPart = lastPartWords.join('-');

      parts[parts.length - 1] = newLastPart;
      const newUrl = parts.join('/');

      navigate(newUrl);
    }
  };

  if (!info) {
    return <>Loading...</>;
  }

  const colorOptions: { [key: string]: string } = {
    black: '#1F2020',
    rosegold: '#FAD7BD',
    gold: '#F5DDC5',
    silver: '#E4E4E2',
    spacegray: '#25282A',
    green: '#AEE1CD',
    yellow: '#FFE681',
    white: '#FBF7F4',
    purple: '#B8AFE6',
    red: '#E23636',
    midnightgreen: '#4E5851',
    coral: '#EE7762',
    grey: '#535150',
  };

  return (
    <>
      <div className="mainBLockForHeader">
        <div className="block-for-svg">
          <Link to="/">
            <div className="block-for-svg-home">
              <img className="icon" src={HomeImage} alt="HomeImage" />
            </div>
          </Link>

          <div className="block-for-svg-home-arrow">
            <img className="icon" src={Arrowimage} alt="Arrowimage" />
          </div>

          <p className={`block-forPageNotFound__text-1 ${location.pathname.includes('/phones/') ? 'phones-isActive' : ''}`}>Phones</p>

          <div className="block-for-svg-home-arrow">
            <img className="icon" src={Arrowimage} alt="Arrowimage" />
          </div>

          <p className="block-forPageNotFound__text-1">{info?.name}</p>
        </div>

        <div className="prev-to-back">
          <button
            type="button"
            className="prev-to-back"
            onClick={() => navigation(-1)}
          >
            <img src={PrevArrow} alt="PrevArrow" />
            <p className="block-forPageNotFound__text-1-1">Back</p>
          </button>
        </div>
      </div>

      <main className="main-1">
        <div className="page">
          <h1 className="page__title">{name}</h1>
          <div className="container-page__Blocks-header">
            <div className="page__Blocks-header">
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className={`thumbnail ${mainImage === image ? 'active' : ''}`}
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    className="page__Blocks-header-images"
                    src={`./new/${image}`}
                    alt={`Thumbnail ${index}`}
                  />
                </button>
              ))}
            </div>

            <div className="selected-image">
              <img className="selected-image__img" src={mainImage} alt="" />
            </div>

            <div className="page__Blocks-header-rigth">
              <div className="containerForGlavBlock">
                <p className="page__Blocks-header-rigth__text">
                  Available colors
                </p>
                <div className="glavBlockforInfoButton">
                  {colorsAvailable.map((colorOption) => (
                    <div className={`blockforInfoButton ${selectedColor === colorOption ? 'blockforInfoButton__active' : ''}`} key={colorOption}>
                      <button
                        type="button"
                        className="color-option"
                        style={{ backgroundColor: colorOptions[colorOption] }}
                        onClick={() => handleColorClick(colorOption)}
                        aria-label={colorOption}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="containerForGlavBlock">
                <p className="page__Blocks-header-rigth__text">
                  Select capacity
                </p>
                <div className="glavBlockforInfoButton">
                  {capacityAvailable.map((_capacityOption) => (
                    <div className={`blockforInfoGB ${selectedGb === _capacityOption ? 'blockforInfoGB__active' : ''}`} key={_capacityOption}>
                      <button
                        type="button"
                        className={`GB-option ${selectedGb === _capacityOption ? 'GB-option-active' : ''}`}
                        onClick={() => hendleGBclick(_capacityOption)}
                      >
                        {_capacityOption}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <PhonesPageInfoPrice price={info} />

              <div className="productsPriceButtons">
                <PhonesPageInfoButton info={info} />
                <PhonesPageInfoFovorite info={info} />
              </div>

              <div className="Info-Block">
                <div className="Info-Block__left">
                  <p className="Info-Block__left-por">
                    Screen
                  </p>
                  <p className="Info-Block__left-por">
                    Resolution
                  </p>
                  <p className="Info-Block__left-por">
                    Processor
                  </p>
                  <p className="Info-Block__left-por">
                    RAM
                  </p>

                </div>
                <div className="Info-Block__right">
                  <p className="Info-Block__right-por">
                    {screen}
                  </p>
                  <p className="Info-Block__right-por">
                    {resolution}
                  </p>
                  <p className="Info-Block__right-por">
                    {processor}
                  </p>
                  <p className="Info-Block__right-por">
                    {ram}
                  </p>

                </div>

              </div>
            </div>

            <div className="block-for-id">
              <p className="block-for-id__text">
                {id}
              </p>
            </div>
          </div>

          <div className="page__Blocks-info">
            <div className="page__Blocks-info-about">
              <div className="block-for-page__Blocks-info-about-title">
                <h2 className="page__Blocks-info-about-title">About</h2>
              </div>

              <div data-cy="productDescription" className="content">
                <section className="content-1 all-for0content" key="content-1">
                  <h3 className="contant-title">{info.description[0].title}</h3>
                  <p className="contant-text">{info.description[0].text[0]}</p>
                </section>

                <section className="content-2 all-for0content" key="content-2">
                  <h3 className="contant-title">{info.description[1].title}</h3>
                  <p className="contant-text">{info.description[1].text[0]}</p>
                </section>

                <section className="content-3 all-for0content" key="content-3">
                  <h3 className="contant-title">{info.description[2].title}</h3>
                  <p className="contant-text">{info.description[2].text}</p>
                </section>
              </div>
            </div>

            <div className="page__Blocks-info-Tech">
              <div className="block-for-page__Blocks-info-about-title">
                <h1 className="page__Blocks-info-about-title">Tech specs</h1>
              </div>

              <div className="contant-Tech" data-cy="productDescription">
                <section className="contant-Tech__section">
                  <div className="block-page">
                    <div className="psge__info-all-left">
                      <p className="por-left">Screen</p>
                      <p className="por-left">Resolution</p>
                      <p className="por-left">Processor</p>
                      <p className="por-left">RAM</p>
                      <p className="por-left">Built-in memory</p>
                      <p className="por-left">Camera</p>
                      <p className="por-left">Zoom</p>
                      <p className="por-left">Cell</p>
                    </div>
                    <div className="psge__info-all-right">
                      <p className="por-right">{screen}</p>
                      <p className="por-right">{resolution}</p>
                      <p className="por-right">{processor}</p>
                      <p className="por-right">{ram}</p>
                      <p className="por-right">{capacity}</p>
                      <p className="por-right">{camera}</p>
                      <p className="por-right">{zoom}</p>
                      <p className="por-right">{cell?.join(' , ')}</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="blockkkk">
        <HotPrices
          title="You may also like"
          maxPrice={1600}
          minYear={2018}
          minPrice={1200}
        />
      </div>
    </>
  );
};
