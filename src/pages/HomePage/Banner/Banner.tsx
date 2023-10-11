import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import phonesImage from '../../../images/banner-iphone.png';
import tabletsImage from '../../../images/banner-ipad.png';
import accessoriesImage from '../../../images/banner-accessories.png';

import './Banner.scss';

const BannerContent = [
  {
    name: 'phones',
    photo: phonesImage,
  },
  {
    name: 'tablets',
    photo: tabletsImage,
  },
  {
    name: 'accessories',
    photo: accessoriesImage,
  },
];

export const Banner = () => {
  return (
    <Carousel
      autoPlay={false}
      showArrows
      emulateTouch
      infiniteLoop
      showStatus={false}
      showThumbs={false}
      className="banner"
    >
      {BannerContent.map(currentItem => (
        <div className="banner__slide">
          <img
            src={currentItem.photo}
            alt={currentItem.name}
            className="banner__slide--image"
          />
        </div>
      ))}
    </Carousel>
  );
};
