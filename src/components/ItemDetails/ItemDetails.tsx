import React, { useState } from 'react';
import { Gadgets } from '../../types/Gadgets';
import styles from './ItemDetails.module.scss';
import classNames from 'classnames';
import { ItemTechSpecs } from '../ItemTechSpecs';
import { Loader } from '../Loader';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { FavouritesButton } from '../Buttons/FavouritesButton';

type Props = {
  item: Gadgets;
};

export const ItemDetails: React.FC<Props> = ({ item }) => {
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
  } = item;

  const techSpecs = { screen, resolution, processor, ram, camera, zoom, cell };

  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(color);
  const [selectedCapacity, setSelectedCapacity] = useState(capacity);

  const changeImg = (imgIndex: number) => {
    setSelectedImg(imgIndex);
  };

  const changeColor = (newColor: string) => {
    setSelectedColor(newColor);
  };

  const changeCapacity = (newCapacity: string) => {
    setSelectedCapacity(newCapacity);
  };

  const colorStyleName = (colorName: string) => {
    return colorName.split(' ').join('');
  };

  return (
    <div className={styles.itemDetails}>
      {!item && <Loader />}

      <h2 className={styles.itemName}>{name}</h2>

      <div className={styles.item}>
        <div className={styles.imgBlock}>
          <img
            src={`${images[selectedImg]}`}
            alt={`${name}`}
            className={styles.itemImg}
          />
        </div>

        <div className={styles.photosPreview}>
          {images.map((imageSrc, i) => (
            <div
              className={styles.photoPreview}
              key={imageSrc}
              onClick={() => changeImg(i)}
            >
              <img
                src={`${imageSrc}`}
                alt={`${imageSrc}`}
                className={styles.itemImg}
              />
            </div>
          ))}
        </div>

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
                        'colorToggle-active': currentColor === selectedColor,
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
                        'capacityToggle-active':
                          currentCapacity === selectedCapacity,
                      })}
                      key={currentCapacity}
                      onClick={() => {
                        changeCapacity(currentCapacity);
                      }}
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
