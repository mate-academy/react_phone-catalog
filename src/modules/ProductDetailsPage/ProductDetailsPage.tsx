/* eslint-disable max-len */
import { NavLink, useLocation } from 'react-router-dom';
import { Gargets } from '../../interface/Gargets';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import './ProductDetailsPage.scss';
import { useEffect, useState } from 'react';
import { Phone } from '../../interface/Phone';
import { Loader } from '../ProductPages/Loader';

export const ProductDetailsPage = () => {
  const location = useLocation();
  const item = location.state as Gargets;
  const [clickImage, setClickImage] = useState(item.images[0]);
  const [phones, setPhones] = useState<Phone[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [clickOnButton, setClickOnButton] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isImageVisible, setIsImageVisible] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadingDataOnServer, setLoadingDataOnServer] = useState(false);
  const [chooseColor, setChooseColor] = useState('');

  useEffect(() => {
    setLoadingDataOnServer(true);
    fetch('/public/api/phones.json')
      .then(response => response.json())
      .then(data => {
        setPhones(data);
      })
      .finally(() => {
        setLoadingDataOnServer(false);
      });
  }, []);

  if (loadingDataOnServer) {
    return <Loader loading={true} />;
  }

  const filteredPhones = phones.filter(phone =>
    phone.name.toLowerCase().includes(chooseColor.toLowerCase()),
  );

  return (
    <>
      <div className="details">
        <div className="gargets__back-to-home">
          <NavLink to="/" className="gargets__home-img" />
          <span className="gargets__arrow"></span>
          <span className="details__back-home-h2">Phones</span>
          <span className="gargets__arrow"></span>
          <span className="details__phone-models">{item.name}</span>
        </div>

        <div className="details__back-btn">
          <span className="details__arrow"></span>
          <NavLink to="/phones" className="details__back">
            Back
          </NavLink>
        </div>

        {filteredPhones.slice(0, 1).map((gargets, index) => (
          <h2 key={index} className="details__phone-name">
            {gargets.name}
          </h2>
        ))}

        <div className="details__phone-colums">
          {filteredPhones[0]?.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`image-phone-${index}`}
              className="details__image"
              onClick={() => setClickImage(img)}
            />
          ))}
        </div>

        <div className="details__image-block">
          <img
            src={clickImage ? clickImage : item.images[0]}
            alt="main-image-phone"
            className="details__image-main"
          />
        </div>

        <div className="details__information">
          <h3 className="details__information-h3">Available colors</h3>
          <div className="details__colors-wrapper">
            {item.colorsAvailable.map((color, index) => (
              <button
                key={index}
                className="details__color-button"
                style={{ color: color }}
                onClick={() => {
                  setChooseColor(color);
                }}
              />
            ))}
          </div>

          {/* <div className="details__id">
      <div className="details__information-id">рфнд</div>
    </div> */}

          <div className="details__small-line"></div>
          <h3 className="details__capacity">Select capacity</h3>
          <div className="details__button">
            <button className="details__button-gb">
              {item.capacityAvailable[0]}
            </button>
            <button className="details__button-gb">
              {item.capacityAvailable[1]}
            </button>
            <button className="details__button-gb">
              {item.capacityAvailable[2]}
            </button>
          </div>

          <div className="details__small-line"></div>

          <div className="details__position">
            <div className="details__price">${item.priceRegular}</div>
            <div className="details__discount">${item.priceDiscount}</div>
          </div>

          <div className="details__position">
            <NavLink to="/" className="details__add-to-cart">
              Add to cart
            </NavLink>
            <button className="details__button-like">
              <NavLink to="/" className="swiper__like"></NavLink>
            </button>
          </div>

          <div className="details__position">
            <h5 className="details__screen">Screen</h5>
            <h5 className="details__oled">{item.screen}</h5>
          </div>

          <div className="details__position">
            <h5 className="details__resolution">Resolution</h5>
            <h5 className="details__resolution-characters">
              {item.resolution}
            </h5>
          </div>

          <div className="details__position">
            <h5 className="details__processor">Resolution</h5>
            <h5 className="details__processor-characters">{item.processor}</h5>
          </div>

          <div className="details__position">
            <h5 className="details__ram">RAM</h5>
            <h5 className="details__ram-characters">{item.ram}</h5>
          </div>
        </div>

        <div className="details__description">
          <div className="details__about">
            <h3 className="details__about-h3">About</h3>
            <div className="details__about-line"></div>
            {item.description.map((desc, index) => (
              <div key={index}>
                <h4 className="details__about-desc-h4">{desc.title}</h4>
                {desc.text.map((paragraph, i) => (
                  <p key={i} className="details__about-desc">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="details__tech">
          <div className="details__position-tech">
            <h3 className="details__position-tech-h3">Tech specs</h3>
            <div className="details__about-line"></div>

            <div className="details__position">
              <h5 className="details__screen">Screen</h5>
              <h5 className="details__oled">{item.screen}</h5>
            </div>

            <div className="details__position">
              <h5 className="details__resolution">Resolution</h5>
              <h5 className="details__resolution-characters">
                {item.resolution}
              </h5>
            </div>

            <div className="details__position">
              <h5 className="details__processor">Processor</h5>
              <h5 className="details__processor-characters">
                {item.processor}
              </h5>
            </div>

            <div className="details__position">
              <h5 className="details__ram">RAM</h5>
              <h5 className="details__ram-characters">{item.ram}</h5>
            </div>

            <div className="details__position">
              <h5 className="details__memory">Built in memory</h5>
              <h5 className="details__memory-characters">{item.capacity}</h5>
            </div>

            <div className="details__position">
              <h5 className="details__camera">Camera</h5>
              <h5 className="details__camera-characters">{item.camera}</h5>
            </div>

            <div className="details__position">
              <h5 className="details__zoom">Zoom</h5>
              <h5 className="details__zoom-characters">{item.zoom}</h5>
            </div>

            <div className="details__position">
              <h5 className="details__cell">Cell</h5>
              {item.cell.map((cellItem, index) => (
                <h5 className="details__cell-characters" key={index}>
                  {cellItem}
                  {index < item.cell.length - 1 ? ',' : ''}
                </h5>
              ))}
            </div>
          </div>
        </div>

        <div className="details__roundabout">
          <div className="swiper">
            <div className="swiper__top-bar">
              <h2 className="swiper__brand-h2">You may also like</h2>
              <div className="swiper__nav-buttons">
                <div className="swiper-button-prev" />
                <div className="swiper-button-next" />
              </div>
            </div>
            <div className="swiper__phone">
              <Swiper
                modules={[Navigation]}
                spaceBetween={30}
                navigation={{
                  prevEl: '.swiper-button-prev',
                  nextEl: '.swiper-button-next',
                }}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  640: { slidesPerView: 3 },
                  1200: { slidesPerView: 4 },
                }}
                className="swiper__slide"
              >
                {phones.map((phone, index) => (
                  <SwiperSlide key={index} className="swiper__card">
                    <img
                      src={phone.images[0]}
                      alt={phone.name}
                      className="swiper__image-phone"
                    />
                    <h4 className="swiper__name">{phone.name}</h4>
                    <div className="swiper__position">
                      <h3 className="swiper__costs">${phone.priceRegular}</h3>
                      <h3 className="swiper__sale">${phone.priceDiscount}</h3>
                      <div className="swiper__line"></div>
                    </div>
                    <div className="swiper__small-line" />
                    <div className="swiper__position">
                      <h5 className="swiper__screen">Screen</h5>
                      <h5 className="swiper__oled">{phone.screen}</h5>
                    </div>
                    <div className="swiper__position">
                      <h5 className="swiper__capacity">Capacity</h5>
                      <h5 className="swiper_gb">{phone.capacity}</h5>
                    </div>
                    <div className="swiper__position">
                      <h5 className="swiper__ram">RAM</h5>
                      <h5 className="swiper__ram-gb">{phone.ram}</h5>
                    </div>
                    <div className="swiper__position">
                      <NavLink to="/" className="swiper__add-to-cart">
                        Add to cart
                      </NavLink>
                      <button className="swiper__button-like">
                        <NavLink to="/" className="swiper__like"></NavLink>
                      </button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
