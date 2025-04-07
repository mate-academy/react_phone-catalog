import React, { useEffect, useState } from 'react';
import styles from './ProductDetails.module.scss';
import phones from '../../../public/api/phones.json';
import products from '../../../public/api/products.json';
import classNames from 'classnames';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Phone } from '../../types/Phone';
import { TitleAndButtonSlider } from '../TitleAndButtonSlider/TitleAndButtonSlider';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  phoneId?: string;
  disabledIds: number[];
  setDisabledIds: React.Dispatch<React.SetStateAction<number[]>>;
};

export const ProductDetails: React.FC<Props> = ({
  phoneId,
  disabledIds,
  setDisabledIds,
}) => {
  const phone = phones.find(phone_ => phone_.id === phoneId);
  const [activePhone, setActivePhone] = useState(phone);
  const [image, setImage] = useState(activePhone?.images[0]);
  const [activeColor, setActiveColor] = useState<string | undefined>(
    activePhone?.colorsAvailable[0],
  );
  const [activeCapacity, setActiveCapacity] = useState<string | undefined>(
    activePhone?.capacity,
  );
  const [clicked, setClicked] = useState(false);
  const techDetails: Record<string, keyof Phone> = {
    Screen: 'screen',
    Resolution: 'resolution',
    Processor: 'processor',
    RAM: 'ram',
    'Built in memory': 'capacity',
    Camera: 'camera',
    Zoom: 'zoom',
    Cell: 'cell',
  };

  const navigate = useNavigate();
  const { search } = useLocation();
  const { phoneId: phoneIdFromUrl } = useParams();
  const productId = products.find(product => product.itemId === phone?.id);

  const handleChangeColor = (color: string) => {
    const newPhone = phones.find(
      iphone =>
        activePhone?.namespaceId === iphone.namespaceId &&
        activePhone.capacity === iphone.capacity &&
        iphone.color === color,
    );

    if (newPhone) {
      setActiveColor(color);
      setActivePhone(newPhone);
      setImage(newPhone.images[0]);
      navigate(`/phones/${newPhone.id}`);
    }
  };

  const handleBackButton = () => {
    navigate({ pathname: '..', search });
  };

  const handleCapacityChange = (capacity: string) => {
    const newPhone = phones.find(
      iphone =>
        iphone.capacity === capacity &&
        activePhone?.namespaceId === iphone.namespaceId,
    );

    if (newPhone) {
      setActiveCapacity(capacity);
      setActivePhone(newPhone);
      navigate(`/phones/${newPhone.id}`);
    }
  };

  useEffect(() => {
    const phoneActive = phones.find(_phone => _phone.id === phoneIdFromUrl);

    if (phoneActive) {
      setActiveColor(phoneActive.color);
      setActivePhone(phoneActive);
      setImage(phoneActive.images[0]);
      setActiveCapacity(phoneActive.capacity);
      window.scrollTo({ top: 0 });
    }
  }, [navigate]);

  return (
    <>
      <div className={`${styles.details_main_container}`}>
        <div className={`${styles.details_path_container}`}>
          <img
            src="../../img/icons/home-icon.svg"
            alt="home icon"
            className={`${styles.details_header_icon}`}
          />
          <img
            src="../../img/icons/main-disabled-arrow.svg"
            alt="right arrow"
            className={`${styles.details_header_icon}`}
          />
          <p className={`${styles.details_path} ${styles.dark_gray}`}>Phones</p>
          <img
            src="../../img/icons/main-disabled-arrow.svg"
            alt="right arrow"
            className={`${styles.details_header_icon}`}
          />
          <p className={`${styles.details_path}`}>{activePhone?.name}</p>
        </div>

        <div
          className={`${styles.details_back_container}`}
          onClick={handleBackButton}
        >
          <img
            src="../../img/icons/main-default-arrow.svg"
            alt="left arrow"
            className={`${styles.details_back_icon}`}
          />
          <p className={`${styles.details_back_text}`}>Back</p>
        </div>
        <h1 className={`${styles.details_header}`}>{activePhone?.name}</h1>
        <div className={`${styles.details_main_info_container}`}>
          <img
            src={image}
            alt="phone image"
            className={`${styles.details_main_image}`}
          />

          <div className={`${styles.details_slider_image_container}`}>
            {activePhone?.images.map((img, id) => {
              return (
                <div
                  className={classNames(
                    `${styles.details_slider_image_wrapper}`,
                    {
                      [styles.details_active_image]: img === image,
                    },
                  )}
                  key={id}
                  onClick={() => setImage(img)}
                >
                  <img
                    src={img}
                    alt="phone image"
                    className={`${styles.details_slider_image}`}
                  />
                </div>
              );
            })}
          </div>
          <div className={`${styles.details_controls_container}`}>
            <div className={`${styles.details_available_header_container}`}>
              <p className={`${styles.details_available_header}`}>
                Available colors
              </p>
              <p className={`${styles.details_available_id}`}>{`ID: ${productId?.id}`}</p>
            </div>
            <div className={`${styles.details_available_colors_container}`}>
              {activePhone?.colorsAvailable.map((color, id) => {
                return (
                  <div
                    className={classNames(`${styles.details_color_wrapper}`, {
                      [styles.details_active_color]: activeColor === color,
                    })}
                    style={{backgroundColor: color}}
                    key={id}
                    onClick={() => handleChangeColor(color)}
                  >
                  </div>
                );
              })}
            </div>

            <hr className={`${styles.details_line}`} />

            <div className={`${styles.details_capacity_container}`}>
              <p className={`${styles.details_capacity_text}`}>
                Select capacity
              </p>
              <div className={`${styles.details_capacity_amount_cont}`}>
                {activePhone?.capacityAvailable.map((capacity, id) => {
                  return (
                    <div
                      key={id}
                      className={classNames(
                        `${styles.details_capacity_amount_wrapper}`,
                        {
                          [styles.activeCapacity]: activeCapacity === capacity,
                        },
                      )}
                      onClick={() => handleCapacityChange(capacity)}
                    >
                      <p className={`${styles.details_capacity_amount}`}>
                        {capacity}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <hr className={`${styles.details_line} ${styles.margin_bot_32}`} />

            <div className={`${styles.price_wrapper}`}>
              <h2
                className={`${styles.price}`}
              >{`$${activePhone?.priceRegular}`}</h2>
              <h2
                className={`${styles.oldPrice}`}
              >{`$${activePhone?.priceDiscount}`}</h2>
            </div>

            <div className={classNames(`${styles.buttons_container}`)}>
              <button
                className={classNames(`${styles.button} ${styles.button_add}`)}
              >
                Add to cart
              </button>
              <button
                className={`${styles.button} ${styles.button_like}`}
                onClick={() => (clicked ? setClicked(false) : setClicked(true))}
              >
                <img
                  src={
                    clicked
                      ? '../../img/icons/card-selected-like.svg'
                      : '../../img/icons/card-default-like.svg'
                  }
                  alt="like button"
                />
              </button>
            </div>

            <div className={classNames(`${styles.phone_charact_container}`)}>
              <div className={classNames(`${styles.phone_charact}`)}>
                <p className={`${styles.phone_charact_parag}`}>Screen</p>
                <p
                  className={`${styles.phone_charact_parag} ${styles.char_value}`}
                >
                  {activePhone?.screen}
                </p>
              </div>
              <div className={classNames(`${styles.phone_charact}`)}>
                <p className={`${styles.phone_charact_parag}`}>Resolution</p>
                <p
                  className={`${styles.phone_charact_parag} ${styles.char_value}`}
                >
                  {activePhone?.resolution}
                </p>
              </div>
              <div className={classNames(`${styles.phone_charact}`)}>
                <p className={`${styles.phone_charact_parag}`}>Processor</p>
                <p
                  className={`${styles.phone_charact_parag} ${styles.char_value}`}
                >
                  {activePhone?.processor}
                </p>
              </div>
              <div className={classNames(`${styles.phone_charact}`)}>
                <p className={`${styles.phone_charact_parag}`}>RAM</p>
                <p
                  className={`${styles.phone_charact_parag} ${styles.char_value}`}
                >
                  {activePhone?.ram}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.details_main_descr_container}`}>
          <div className={`${styles.details_descr_container}`}>
            <div className={`${styles.details_descr_wrapper}`}>
              <h3 className={`${styles.details_descr_title}`}>About</h3>
              <hr className={`${styles.details_line} ${styles.margin_0}`} />
            </div>
            {activePhone?.description.map((descr, id) => {
              return (
                <div className={`${styles.details_descr_wrapper}`} key={id}>
                  <h2 className={`${styles.details_descr_title}`}>
                    {descr.title}
                  </h2>
                  <p className={`${styles.details_descr_text}`}>{descr.text}</p>
                </div>
              );
            })}
          </div>

          <div className={`${styles.details_tech_container}`}>
            <h3 className={`${styles.details_descr_title}`}>Tech specs</h3>
            <hr className={`${styles.details_line} ${styles.margin_bot_16}`} />
            {Object.entries(techDetails).map(([label, phoneKey], id) => {
              return (
                <div
                  className={classNames(
                    `${styles.phone_charact} ${styles.tech_charact}`,
                  )}
                  key={id}
                >
                  <p
                    className={`${styles.phone_charact_parag} ${styles.tech_charact_parag}`}
                  >
                    {label}
                  </p>
                  <p
                    className={`${styles.phone_charact_parag}
                  ${styles.tech_charact_parag} ${styles.char_value}
                  ${styles.tech_char_value}`}
                  >
                    {Array.isArray(activePhone?.[phoneKey])
                      ? (activePhone?.[phoneKey] as string[]).join(', ')
                      : activePhone?.[phoneKey]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <TitleAndButtonSlider
          disabledIds={disabledIds}
          setDisabledIds={setDisabledIds}
          title={'You may also like'}
          startId={7}
          endId={8}
          containerId={'scroll_container_also_like'}
        />

        <div
          className={`${styles.details_scroll_container}`}
          id="scroll_container_also_like"
        >
          {phones.map(phonei => (
            <ProductCard key={phonei.id} phone={phonei} />
          ))}
        </div>
      </div>
    </>
  );
};
