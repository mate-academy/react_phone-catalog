/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import Carousel from '../Components/Carousel';
import { ProductCarousel } from '../Components/ProductCarousel';
import { ShopByCategory } from '../Components/ShopByCategory';

export const Home = () => {
  return (
    <>
      <hr className="col-span-full h-10 border-0" />
      <Carousel>
        <Link
          className="carousel-image block h-[400px] w-[1040px] shrink-0 object-cover"
          to="phones"
        >
          <img
            className="h-[400px] w-[1040px] object-cover"
            src="/_new/img/banner-phones.png"
            alt="phones"
          />
        </Link>

        <Link
          className="carousel-image block h-[400px] w-[1040px] shrink-0 object-cover"
          to="tablets"
        >
          <img
            className="h-[400px] w-[1040px] object-cover"
            src="/_new/img/banner-tablets.png"
            alt="tablets"
          />
        </Link>

        <Link
          className="carousel-image block h-[400px] w-[1040px] shrink-0 object-cover"
          to="accessories"
        >
          <img
            className="h-[400px] w-[1040px] object-cover"
            src="/_new/img/banner-accessories.png"
            alt="accessories"
          />
        </Link>
      </Carousel>

      <hr className="col-span-full h-[72px] border-0" />

      <ProductCarousel title="Hot Prices" />

      <hr className="col-span-full h-[72px] border-0" />

      <ShopByCategory />

      <hr className="col-span-full h-[72px] border-0" />

      <ProductCarousel title="Brand new models" />

      <hr className="col-span-full h-[80px] border-0" />
    </>
  );
};
