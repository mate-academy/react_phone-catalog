/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { Link, useParams } from 'react-router-dom';
import { AddCartButton } from '../Buttons/AddCartButton';
import { FavButton } from '../Buttons/FavButton';

import './cardPage.scss';
import { getDescription } from '../../api/getData';
import { PhoneInfo } from '../../type/PhoneInfo';

const TECH_SPECS: string[] = [
  'screen',
  'resolution',
  'processor',
  'ram',
  'capacity',
  'camera',
  'zoom',
];

export const CardPage: React.FC = () => {
  const params = useParams();

  const [description, setDescription] = useState<PhoneInfo>();
  const [currentMainPhoto, setCurrentMainPhoto] = useState('');

  const getData = async (indemnificator: string) => {
    const response = await getDescription(indemnificator);

    setDescription(response);
  };

  useEffect(() => {
    if (params.id) {
      getData(params.id);
    }
  }, [params]);

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  if (description === undefined) {
    return null;
  }

  const correctSrc = (str: string) => {
    return `../_new/${str}`;
  };

  const onPhotoHandler = (str: string) => {
    const src = correctSrc(str);

    setCurrentMainPhoto(src);
  };

  return (
    <div className="container">
      <div className="description">
        <h1>{description.name}</h1>
        <div className="description__top">
          <div className="photos description__photos">
            <ul className="photos__list">
              {description.images.map(img => (
                <li
                  onClick={() => onPhotoHandler(img)}
                  className="photos__item"
                  key={img}
                >
                  <img
                    src={correctSrc(img)}
                    alt=""
                    className="photos__link"
                  />
                </li>
              ))}
            </ul>

            <div className="photos__main-container">
              <img
                src={currentMainPhoto || `../_new/${description.images[0]}`}
                alt=""
                className="photos__main"
              />
            </div>
          </div>

          <div className="description__short-info">
            <div className="description__filter">
              <div className="description__colors">
                <span className="description__colors-title">
                  Available colors
                </span>

                <ul className="description__colors-list">
                  {description.colorsAvailable.map(color => (
                    <li className="description__colors-item" key={color}>
                      <Link
                        className={`description__color ${color}`}
                        to={`/phones/${description.namespaceId}-${description.capacity.toLocaleLowerCase()}-${color}`}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="description__capacity">
                <span
                  className="description__capacity-text"
                >
                  Select capacity
                </span>

                <ul className="description__capacity-list">
                  {description?.capacityAvailable.map(capacity => (
                    <li
                      key={capacity}
                      className="description__capacity-item"
                    >
                      <Link
                        className={classNames(
                          'description__capacity-link',
                          { active: description.capacity === capacity },
                        )}
                        to={`/phones/${description.namespaceId}-${capacity.toLocaleLowerCase()}-${description.color}`}
                      >
                        {capacity}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="description__buy">
              <div className="description__price">
                <span className="description__price-disc">{`$${description.priceDiscount}`}</span>
                <span className="description__price-regular">{`$${description.priceRegular}`}</span>
              </div>

              <div className="description__buttons">
                <AddCartButton />
                <FavButton />
              </div>

              <ul className="description__info">
                <li className="description__info-str">
                  <span>Screen</span>
                  <span
                    className="description__info-str-value"
                  >
                    {description.screen}
                  </span>
                </li>

                <li className="description__info-str">
                  <span>Resolution</span>
                  <span
                    className="description__info-str-value"
                  >
                    {description.resolution}
                  </span>
                </li>

                <li className="description__info-str">
                  <span>Processor</span>
                  <span
                    className="description__info-str-value"
                  >
                    {description.processor}
                  </span>
                </li>

                <li className="description__info-str">
                  <span>RAM</span>
                  <span
                    className="description__info-str-value"
                  >
                    {description.ram}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="description__content">
          <div className="about description__about">
            <h2 className="about__title">About</h2>
            {description.description.map(section => (
              <div key={section.title} className="section description__section">
                <h3 className="section__title">{section.title}</h3>
                <article className="section__text">
                  {section.text.map(paragraph => (
                    <p
                      key={paragraph.length + +new Date()}
                      className="section__paragraph"
                    >
                      {paragraph}
                    </p>
                  ))}
                </article>
              </div>
            ))}
          </div>
          <div className="tech description__tech">
            <h2 className="tech__title">Tech specs</h2>
            <ul className="tech__list">
              {TECH_SPECS.map(spec => (
                <li className="tech__item" key={spec}>
                  <span className="tech__spec">{capitalize(spec)}</span>
                  <span className="tech__value">{description[spec]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
