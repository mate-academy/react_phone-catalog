import React, { useEffect, useState } from 'react';
import { Gadgets } from '../../types/Gadgets';
import styles from './ItemDetails.module.scss';
import classNames from 'classnames';
import { ItemTechSpecs } from '../ItemTechSpecs';
import { Loader } from '../Loader';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { FavouritesButton } from '../Buttons/FavouritesButton';
import { useNavigate } from 'react-router-dom';

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { TABLET_WIDTH } from '../../types/Constantes';

type Props = {
  item: Gadgets;
};

export const ItemDetails: React.FC<Props> = ({ item }) => {
  const [currentItem, setCurrentItem] = useState<Gadgets>(item);
  const [width, setWidth] = useState(window.innerWidth);

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  const {
    id,
    name,
    images,
    namespaceId,
    colorsAvailable,
    color,
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
    description,
  } = currentItem;

  const techSpecs = { screen, resolution, processor, ram, camera, zoom, cell };

  const navigate = useNavigate();

  const colorName = color.split('-').join(' ');
  const colorStyleName = (currentColorName: string) =>
    currentColorName.split(' ').join('');

  const changeCapacity = (toChange: string) => {
    const normalizedValue = (value: string) => value.toLowerCase();

    const splitedId = id.split('-');

    const indexSpecification = splitedId.indexOf(normalizedValue(capacity));

    splitedId.splice(indexSpecification, 1, normalizedValue(toChange));
    const newName = splitedId.join('-');

    navigate(`../${newName}`);
  };

  const changeColor = (toChange: string) => {
    const idColorName = (value: string) => value.split(' ').join('-');
    const splitedId = id.split(idColorName(color));

    splitedId.splice(splitedId.length - 1, 1, idColorName(toChange));
    const newName = splitedId.join('');

    navigate(`../${newName}`);
  };

  useEffect(() => {
    setCurrentItem(item);
  }, [item]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.itemDetails}>
      {!item && <Loader />}

      <h2 className={styles.itemName}>{name}</h2>

      <div className={styles.item}>
        <Swiper
          loop={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className={styles.imgBlock}
        >
          {images.map(imageSrc => (
            <SwiperSlide key={imageSrc}>
              <img
                src={`${imageSrc}`}
                alt={`${imageSrc}`}
                className={styles.itemImg}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          slidesPerView="auto"
          loop={true}
          spaceBetween={8}
          freeMode={true}
          watchSlidesProgress={true}
          direction={width >= TABLET_WIDTH ? 'vertical' : 'horizontal'}
          modules={[FreeMode, Navigation, Thumbs]}
          className={`${styles.photosPreview} myThumbSwiper`}
        >
          {images.map(imageSrc => (
            <SwiperSlide key={imageSrc} className={styles.photoPreview}>
              <img
                src={`${imageSrc}`}
                alt={`${imageSrc}`}
                className={styles.itemImg}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.controlsContainer}>
          <div className={styles.mainControls}>
            <div className={styles.options}>
              <div className={`${styles.option}`}>
                <div
                  className={`${styles.optionTitle} ${styles.colorsTitle} title-small-gray`}
                >
                  <span className="title-small-gray">Available colors</span>
                  <span className="title-small-gray">ID: {namespaceId}</span>
                </div>

                <div className={styles.values}>
                  {colorsAvailable.map(currentColor => (
                    <button
                      className={classNames('colorToggle button', {
                        'colorToggle-active': currentColor === colorName,
                      })}
                      key={color}
                      onClick={() => changeColor(currentColor)}
                    >
                      <div
                        className={`colorToggleInner ${colorStyleName(currentColor)}`}
                      ></div>
                    </button>
                  ))}
                </div>
              </div>
              <div className={`${styles.option}`}>
                <div className={`${styles.optionTitle} title-small-gray`}>
                  <span>Select capacity</span>
                </div>

                <div className={styles.values}>
                  {capacityAvailable.map(currentCapacity => (
                    <button
                      className={classNames('capacityToggle', {
                        'capacityToggle-active': currentCapacity === capacity,
                      })}
                      key={currentCapacity}
                      onClick={() => changeCapacity(currentCapacity)}
                    >
                      <span className="body-text-small">{currentCapacity}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.toBuy}>
              <div className={styles.itemPrice}>
                <div className="price">
                  <h1>${priceDiscount}</h1>
                  <p className="oldPriceFont">${priceRegular}</p>
                </div>
              </div>

              <div className={`buttons ${styles.itemButtons}`}>
                <PrimaryButton itemId={id} />
                <FavouritesButton itemId={id} />
              </div>
            </div>

            <div className="techSpecs">
              <ItemTechSpecs
                techSpecs={{ screen, resolution, processor, ram }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.itemInformation}>
        <div className={`${styles.itemDescription} ${styles.aboutDescription}`}>
          <h3 className={styles.descriptionTitle}>About</h3>

          {description.map(section => (
            <div key={section.title}>
              <h4 className={styles.contentTitle}>{section.title}</h4>

              {section.text.map(part => (
                <p
                  key={part}
                  className={`${styles.content} body-text-small grayText`}
                >
                  {part}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className={`${styles.itemDescription} ${styles.techDescription}`}>
          <h3 className={`${styles.descriptionTitle} ${styles.techTitle}`}>
            Tech specs
          </h3>

          <div className="techSpecs">
            <ItemTechSpecs techSpecs={techSpecs} />
          </div>
        </div>
      </div>
    </div>
  );
};
