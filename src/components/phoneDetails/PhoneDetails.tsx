import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MobileHome } from '../MobileHome/MobileHome';
import './style.scss';
import { useHeaderContext } from '../../provider/HeaderContext';
import { Phone } from '../../types/phone';

type Description = {
  title: string
  text: string[]
};

export const PhoneDetails = () => {
  const {
    favoritePhones,
    basketItems,
    addToFavoriteWithName,
    addToBasketWithName,
  } = useHeaderContext();
  const currentUrl = useParams();
  const [mobiles, setMobiles] = useState<Phone[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);
  const [selectImg, setSelectImg] = useState<string>('');
  const [phones, setPhones] = useState<{
    name: string,
    images: string[],
    colorsAvailable: string[]
    capacityAvailable: string[]
    priceDiscount: number
    priceRegular: number
    screen: string
    resolution: string
    processor: string
    ram: string
    camera: string
    zoom: string
    cell: string[]
    description: Description[]
  } | null>(null);

  useEffect(() => {
    fetch(`api/products/${currentUrl.phoneId}.json`)
      .then(response => response.json())
      .then(setPhones);
  }, [currentUrl]);

  useEffect(() => {
    fetch('api/products.json')
      .then(response => response.json())
      .then(data => setMobiles(data));
  }, []);

  useEffect(() => {
    const foundPhone = mobiles
      .find(phone => phone.phoneId === currentUrl.phoneId);

    setSelectedPhone(foundPhone || null);
  }, [currentUrl, mobiles]);

  if (!selectedPhone) {
    return null;
  }

  if (!phones) {
    return null;
  }

  const {
    name,
    images,
    colorsAvailable,
    capacityAvailable,
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
    description,
  } = phones;

  const handlePickPage = (image: string) => {
    setSelectImg(image);
  };

  const changeColor = name.toLowerCase().split(' ').slice(0, -1).join('-');
  const changeMemory = name.toLowerCase().split(' ').slice(0, -2).join('-');
  const last = name.toLowerCase().split(' ').slice(-1).join('');

  return (
    <div className="details">
      <MobileHome />
      <div className="details__content">
        <h1
          className="details__content-title"
        >
          {name}
        </h1>
        <div className="details__content-phone">
          <div className="details__content-phone-left">
            {images.map(img => (
              <button
                type="button"
                key={img}
                className="details__content-phone-left-image"
                onClick={() => handlePickPage(img)}
              >
                <img className="left-image" src={img} alt="img" />
              </button>
            ))}
          </div>
          <div className="details__content-phone-main">
            <img
              className="details__content-phone-main-image"
              src={selectImg || images[0]}
              alt="mainImage"
            />
          </div>
          <div className="details__content-phone-info">
            <p
              className="details__content-phone-info-title"
            >
              Available colors
            </p>

            <div className="details__content-phone-info-box">
              {colorsAvailable.map(color => (
                <Link key={color} to={`/${changeColor}-${color}`}>
                  <div
                    className="details__content-phone-info-circle"
                    style={{ backgroundColor: color }}
                  />
                </Link>
              ))}
            </div>
            <div className="line" />
            <p
              className="details__content-phone-info-title"
            >
              Select capacity
            </p>
            <div
              className="details__content-phone-info-capacity"
            >
              {capacityAvailable.map(memory => (
                <Link
                  key={memory}
                  className={name.includes(memory)
                    ? 'ram is-active' : 'ram'}
                  to={`/${changeMemory}-${memory.toLowerCase()}-${last}`}
                >
                  {memory}
                </Link>
              ))}
            </div>
            <div className="line" />
            <div
              className="details__content-phone-info-price"
            >
              <p className="discount">{`$${priceDiscount}`}</p>
              <p className="regular">{`$${priceRegular}`}</p>
            </div>
            <div className="details__buttons">
              <button
                type="button"
                className={basketItems
                  .find(p => p.phone.phoneId === currentUrl.phoneId)
                  ? 'details__buttons-add is-active' : 'details__buttons-add'}
                onClick={() => addToBasketWithName(selectedPhone)}
              >
                {basketItems.find(p => p.phone.phoneId === currentUrl.phoneId)
                  ? 'Added to cart' : 'Add to cart'}
              </button>
              <button
                type="button"
                className="details__buttons-heart"
                onClick={() => addToFavoriteWithName(selectedPhone)}
              >
                {favoritePhones.find(p => p.phoneId === currentUrl.phoneId) ? (
                  <img
                    className="details__buttons-heart-image"
                    src="./img/icons/HeartLike.svg"
                    alt="heart"
                  />
                ) : (
                  <img
                    className="details__buttons-heart-image"
                    src="./img/icons/Heart.svg"
                    alt="heart"
                  />
                )}
              </button>
            </div>
            <div>
              <div className="details__screen">
                <p className="details__screen-name">Screen</p>
                <p className="details__screen-info">{screen}</p>
              </div>
              <div className="details__screen">
                <p className="details__screen-name">Resolution</p>
                <p className="details__screen-info">{resolution}</p>
              </div>
              <div className="details__screen">
                <p className="details__screen-name">Processor</p>
                <p className="details__screen-info">{processor}</p>
              </div>
              <div className="details__screen">
                <p className="details__screen-name">Ram</p>
                <p className="details__screen-info">{ram}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="details__description">
        <div className="details__description-about">
          <h1 className="details__description-title">About</h1>
          <div className="details__description-line" />
          {description.map(item => (
            <div key={item.title}>
              <h2 className="details__description-second">{item.title}</h2>
              <p className="details__description-text">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="details__description-tech">
          <h1 className="details__description-title">Tech specs</h1>
          <div className="details__description-tech-line" />

          <div>
            <div className="details__description-screen">
              <p className="details__description-screen-name">Screen</p>
              <p className="details__description-screen-info">{screen}</p>
            </div>
            <div className="details__description-screen">
              <p className="details__description-screen-name">Resolution</p>
              <p className="details__description-screen-info">{resolution}</p>
            </div>
            <div className="details__description-screen">
              <p className="details__description-screen-name">Processor</p>
              <p className="details__description-screen-info">{processor}</p>
            </div>
            <div className="details__description-screen">
              <p className="details__description-screen-name">Ram</p>
              <p className="details__description-screen-info">{ram}</p>
            </div>
            <div className="details__description-screen">
              <p className="details__description-screen-name">Camera</p>
              <p className="details__description-screen-info">{camera}</p>
            </div>
            <div className="details__description-screen">
              <p className="details__description-screen-name">Zoom</p>
              <p className="details__description-screen-info">{zoom}</p>
            </div>
            <div className="details__description-screen">
              <p className="details__description-screen-name">Cell</p>
              <p
                className="details__description-screen-info"
              >
                {cell.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneDetails;
