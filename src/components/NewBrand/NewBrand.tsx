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
  id: string;
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
    return product.name.includes('iPhone 14');
  });

  const allColors = new Set(brandNewModels.map(product => product.color));

  console.log(brandNewModels);
  console.log(allColors);

  const arrayColors = Array.from(allColors);

  return (
    <>
      <h1>Brand new models</h1>

      {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem illum nisi a dolorum doloremque ad delectus eum perspiciatis quis, quos est explicabo perferendis reprehenderit, enim rerum facere obcaecati? Consequatur cum alias laudantium quos sapiente eos molestias ipsa animi, ratione architecto expedita dolores rem qui esse. */}
      <Swiper spaceBetween={16} slidesPerView={2.5}>
        {brandNewModels.map(phone => {
          const singleIphoneColor = arrayColors.find(
            color => color === phone.color,
          );

          if (singleIphoneColor) {
            arrayColors.forEach((color, i) => {
              const isColor = color === singleIphoneColor ? '' : color;

              arrayColors[i] = isColor;
            });

            console.log(arrayColors);

            return (
              <SwiperSlide className={brandStyles.brand} key={phone.id}>
                <div className={brandStyles.brand__imageWrapper}>
                  <img
                    src={phone.images[0]}
                    className={brandStyles.brand__image}
                  />
                </div>
                <div>{phone.images[0]}</div>
              </SwiperSlide>
            );
          }

          return;
        })}
      </Swiper>
    </>
  );
};

export default NewBrand;
