import { useContext, useRef, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Card } from '../NewPhones/components';
import { PhoneContext } from '../../../../../PageContext';

export const HotPrices: React.FC = () => {
  const phones = useContext(PhoneContext);
  const sortedP = phones
    .sort((a, b) => b.priceRegular - a.priceRegular)
    .filter(phone => phone.priceDiscount);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 3.88,
    },
    tablet: {
      breakpoint: { max: 1199, min: 640 },
      items: 2.5,
    },
    mobile: {
      breakpoint: { max: 639, min: 320 },
      items: 1.35,
    },
  };

  const carouselRef = useRef<Carousel>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.next(currentSlide);
      setCurrentSlide(1);
    }
  };

  const handlePrevSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.previous(currentSlide);
      setCurrentSlide(1);
    }
  };

  return (
    <div className="newPhone-container">
      <div className="newPhone-header">
        <h1 className="newPhones-h1">Hot prices</h1>
        <div className="slide-btns">
          <button className="arrow-btn" onClick={handlePrevSlide}>
            <img src="./uploadedImg/left.svg"></img>
          </button>

          <button className="arrow-btn" onClick={handleNextSlide}>
            <img src="./uploadedImg/right.svg"></img>
          </button>
        </div>
      </div>
      <Carousel
        responsive={responsive}
        arrows={false}
        ref={carouselRef}
        itemClass="carousel-item-padding-0-px"
        containerClass="carousel-container"
      >
        {sortedP.map(sorted => (
          <Card phone={sorted} key={sorted.id} />
        ))}
      </Carousel>
    </div>
  );
};
