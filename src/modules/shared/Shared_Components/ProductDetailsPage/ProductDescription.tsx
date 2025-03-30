import React, { useState } from 'react';
import { Description, ProductDetails, UpdatedProduct } from '../../Types/types';
import classNames from 'classnames';
import { ActionButtons } from '../ActionButtons/ActionButtons';
import { NavLink } from 'react-router-dom';

interface Props {
  details: ProductDetails | undefined;
  item: UpdatedProduct;
}

export const ProductDescription: React.FC<Props> = ({ details, item }) => {
  const descriptions = details ? details.description : ([] as Description[]);
  const arrayOfTechSpecs = [
    {
      property: 'Screen',
      value: details?.screen,
    },
    {
      property: 'Resolution',
      value: details?.resolution,
    },
    {
      property: 'Processor',
      value: details?.processor,
    },
    {
      property: 'RAM',
      value: details?.ram,
    },
    {
      property: 'Built in memory',
      value: details?.capacity,
    },
    {
      property: 'Camera',
      value: details?.camera,
    },
    {
      property: 'Zoom',
      value: details?.zoom,
    },
    {
      property: 'Cell',
      value: details?.cell.join(', '),
    },
  ];
  const startImageUrl = `https://denlysiak.github.io/react_phone-catalog/${details?.images[0]}`;
  const [mainImage, setMainImage] = useState(startImageUrl);

  const newItem = { ...item, quantity: 1 };

  const getNewItemId = (newSpecs: string) => {
    const normalizedSpecs = newSpecs.toLowerCase();

    if (normalizedSpecs.includes('gb')) {
      return (
        details?.namespaceId + '-' + normalizedSpecs + '-' + details?.color
      );
    }

    return (
      details?.namespaceId +
      '-' +
      details?.capacity.toLowerCase() +
      '-' +
      normalizedSpecs
    );
  };

  return (
    <div className="details__main">
      <div className="details__features">
        <div className="details__images">
          <img
            src={mainImage}
            alt="main product's image"
            className="details__main-image"
          />

          <div className="details__secondary-images">
            {details?.images.map(image => (
              <img
                src={`https://denlysiak.github.io/react_phone-catalog/${image}`}
                alt="image of product"
                className={classNames('details__secondary-image', {
                  'details__secondary-image--active':
                    mainImage ===
                    `https://denlysiak.github.io/react_phone-catalog/${image}`,
                })}
                key={image}
                onClick={() =>
                  setMainImage(
                    `https://denlysiak.github.io/react_phone-catalog/${image}`,
                  )
                }
              />
            ))}
          </div>
        </div>

        <div className="details__controls">
          <div className="details__colors">
            <div className="details__item-ID">
              <p className="body-text">Available colors:</p>

              <p className="body-text">{`ID: ${item?.id}`}</p>
            </div>

            <div className="details__colors-container">
              {details?.colorsAvailable.map(color => (
                <NavLink
                  key={color}
                  to={`/${details.category}/${getNewItemId(color)}`}
                  className={classNames('details__color-cover', {
                    'details__color-cover--active': details.color === color,
                  })}
                >
                  <div
                    className="details__color"
                    style={{
                      backgroundColor: `${color === 'rosegold' ? 'pink' : color}`,
                    }}
                  />
                </NavLink>
              ))}
            </div>
          </div>

          <div className="details__capacity">
            <p className="body-text">Select capacity</p>

            <div className="details__colors-container">
              {details?.capacityAvailable.map(cap => (
                <NavLink
                  key={cap}
                  to={`/${details.category}/${getNewItemId(cap)}`}
                  className={classNames('details__GB', {
                    'details__GB--active': details.capacity === cap,
                  })}
                >
                  {cap}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="details__price">{`$ ${details?.priceRegular}`}</div>

          <ActionButtons item={newItem} />

          <div className="details__specs">
            <div className="details__tech-detail">
              <p className="details__tech-detail-text">Screen</p>

              <p className="details__tech-detail-text--params">
                {details?.screen}
              </p>
            </div>

            <div className="details__tech-detail">
              <p className="details__tech-detail-text">Resolution</p>

              <p className="details__tech-detail-text--params">
                {details?.resolution}
              </p>
            </div>

            <div className="details__tech-detail">
              <p className="details__tech-detail-text">Processor</p>

              <p className="details__tech-detail-text--params">
                {details?.processor}
              </p>
            </div>

            <div className="details__tech-detail">
              <p className="details__tech-detail-text">RAM</p>

              <p className="details__tech-detail-text--params">
                {details?.ram}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="details__description">
        <div className="details__about">
          <h2 className="title title--h2 details__description-title">About</h2>

          {descriptions.map((info: Description, i: number) => (
            <div key={i}>
              <h3 className="title title--h4">{info.title}</h3>

              <p className="body-text">{info.text}</p>
            </div>
          ))}
        </div>

        <div className="details__tech-specs">
          <h2 className="title title--h2 details__description-title">
            Tech Specs
          </h2>

          <div className="details__tech-details">
            {arrayOfTechSpecs.map((items, i) => (
              <div key={i} className="details__tech-detail">
                <p className="details__tech-detail-text">{items.property}</p>

                <p className="details__tech-detail-text--params">
                  {items.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
