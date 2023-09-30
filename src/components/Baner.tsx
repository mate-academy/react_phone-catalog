import { Carousel, Image } from 'react-bootstrap';
import { banerImages } from '../utils/listsNames';

export const Baner: React.FC = () => (
  <Carousel
    style={{ paddingLeft: '48px', paddingRight: '48px' }}
    className="mb-5"
  >
    {banerImages.map(img => (
      <Carousel.Item interval={5000}>
        <Image
          src={`img/banner-${img}.png`}
          className="slider__item"
          style={{
            objectFit: 'cover',
          }}
        />
      </Carousel.Item>
    ))}
  </Carousel>
);
