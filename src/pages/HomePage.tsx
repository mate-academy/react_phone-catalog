import { useState } from 'react';
import { Carousel } from '../components/Carousel/Carousel';
// import { useProducts } from '../context/ProductContext';

export const HomePage = () => {
  // const { products } = useProducts();

  const [images] = useState<string[]>([
    'accessories.png',
    'phones.png',
    'tablets.png',
  ]);

  return (
    <>
      <Carousel
        images={images}
      />
    </>
  );
};
