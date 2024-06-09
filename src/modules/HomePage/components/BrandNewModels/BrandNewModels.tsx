import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useEffect, useState } from 'react';

import { getPhones } from '../../../../api/getProduct';
import Product from '../../../../types/Product';
import SliderProducts from '../../../shared/SliderProducts/SliderProducts';

const BrandNewModels = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getPhones().then(res => {
      const newModel = '14';
      const brandNewPhones = res.filter(phone => phone.name.includes(newModel));

      setPhones(brandNewPhones);
      setTotalPages(Math.ceil(brandNewPhones.length / 4));
    });
  }, []);

  return (
    <SliderProducts
      sliderTitle={'Brand new models'}
      products={phones}
      totalPages={totalPages}
    />
  );
};

export default BrandNewModels;
