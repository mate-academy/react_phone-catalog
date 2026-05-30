/* eslint-disable prettier/prettier */
import { Slider } from '../../components/slider/slider';
import photo1 from './homePageImg/slidePhoto1 copy.svg';
import photo2 from '../../../public/img/banner-tablets.png';
import photo3 from '../../../public/img/banner-accessories.png';
import photo4 from '../Home/homePageImg/Banner.svg';
import './homePage.scss';
import phones from '../../../public/api/phones.json';
import products from '../../../public/api/products.json';
import { ProductsSlider } from '../../components/productSlider/productSlider';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import { CategoryLink } from '../../components/categoryLink/categoryLink';
import { Phone } from '../../types/Phone';
import { fromPhone, fromProduct } from '../../types/mappers';
import { Product } from '../../types/Product';
import { useEffect, useState } from 'react';

export const HomePage = () => {
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsWide(window.innerWidth >= 640);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const images = isWide
    ? [
      <img src={photo4} alt="photo-slider-4" key="4" />,
      <img src={photo2} alt="photo-slider-2" key="2" />,
      <img src={photo3} alt="photo-slider-3" key="3" />,
    ]
    : [
      <img src={photo1} alt="photo-slider-1" key="1" />,
      <img src={photo2} alt="photo-slider-2" key="2" />,
      // eslint-disable-next-line prettier/prettier
      <img src={photo3} alt="photo-slider-3" key="3" />,
    ];

  return (
    <>
      <h1 className="homeTitle">Product Catalog</h1>
      <Slider images={images} />
      <ProductsSlider
        title="Brand new models"
        items={phones as Phone[]}
        mapItem={fromPhone}
      />
      <CategoryLink
        data={{
          phones,
          tablets,
          accessories,
        }}
      />
      <ProductsSlider
        title="Hot price"
        items={products as Product[]}
        mapItem={fromProduct}
      />
    </>
  );
};
