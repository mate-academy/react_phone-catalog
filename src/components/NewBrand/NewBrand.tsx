import brandStyles from './NewBrand.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';

interface Product {
  camera: string;
  capacity: string;
  capacityAvailable: number;
  category: string;
  cell: string[];
  color: string;
  colorsAvailable: string[];
  description: string[];
  images: string[];
  name: string;
  namespaceId: string;
  priceDiscount: number;
  priceRegular: number;
  processor: string;
  ram: string;
  resolution: string;
  screen: string;
  zoom: string;
}

const NewBrand = () => {
  const [phones, setPhones] = useState<Product[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/phones.json')
      .then(res => res.json())
      .then(data => setPhones(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const brandNewModels = phones.filter(product => {
    product.name.includes('iPhone 14');
  });

  console.log(phones);

  return (
    <>
      <h1>Brand new models</h1>

      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem illum nisi a dolorum doloremque ad delectus eum perspiciatis quis, quos est explicabo perferendis reprehenderit, enim rerum facere obcaecati? Consequatur cum alias laudantium quos sapiente eos molestias ipsa animi, ratione architecto expedita dolores rem qui esse.













    
      {brandNewModels.map(phone => {
        <div className="brand">
          <img src={phone.images[0]} className={brandStyles.brand__card} />
        </div>;
      })}
    </>
  );
};

export default NewBrand;
