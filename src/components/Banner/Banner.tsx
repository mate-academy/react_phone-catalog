/* eslint-disable jsx-a11y/control-has-associated-label */
import '../../styles/components/Banner/Banner.scss';
import Carousel, { CarouselRef } from 'react-bootstrap/Carousel';

import { useState, useRef } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import phoneBanner from '../../images/banner-phones.png';
import tabletsBanner from '../../images/banner-tablets.png';
import accessoriesBanner from '../../images/banner-accessories.png';
import { Button } from '../Button';

export const Banner: React.FC = () => {
  const [index, setIndex] = useState(0);

  const carouselRef = useRef<CarouselRef>(null);

  const handleSlideLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  const handleSlideRight = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <section className="banner">
      <div className="banner__carousel-container">
        <Button
          content="arrow"
          arrowDirection="left"
          onClick={handleSlideLeft}
        />

        <Carousel
          indicators={false}
          controls={false}
          activeIndex={index}
          onSelect={handleSelect}
          ref={carouselRef}
        >
          <Carousel.Item>
            <Link to="/phones">
              <img
                src={phoneBanner}
                alt="phones"
                className="banner__image"
              />
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="/tablets">
              <img
                src={tabletsBanner}
                alt="tablets"
                className="banner__image"
              />
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="accessories">
              <img
                src={accessoriesBanner}
                alt="accessories"
                className="banner__image"
              />
            </Link>
          </Carousel.Item>
        </Carousel>

        <Button
          content="arrow"
          arrowDirection="right"
          onClick={handleSlideRight}
        />
      </div>

      <div className="banner__badges">
        <button
          type="button"
          className={classNames('banner__badge', {
            active: index === 0,
          })}
          onClick={() => setIndex(0)}
        />

        <button
          type="button"
          className={classNames('banner__badge', {
            active: index === 1,
          })}
          onClick={() => setIndex(1)}
        />

        <button
          type="button"
          className={classNames('banner__badge', {
            active: index === 2,
          })}
          onClick={() => setIndex(2)}
        />
      </div>
    </section>
  );
};
