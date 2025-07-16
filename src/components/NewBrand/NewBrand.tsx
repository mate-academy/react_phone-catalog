/* eslint-disable max-len */
import brandStyles from './NewBrand.module.scss';
import { Iphones, Tablets } from '../../types/types';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';

// interface Iphones {
//   camera: string;
//   capacity: string;
//   capacityAvailable: number;
//   category: string;
//   cell: string[];
//   color: string;
//   colorsAvailable: string[];
//   description: string[];
//   id: string;
//   images: string[];
//   name: string;
//   namespaceId: string;
//   priceDiscount: number;
//   priceRegular: number;
//   processor: string;
//   ram: string;
//   resolution: string;
//   screen: string;
//   zoom: string;
// }

// interface Tablets {
//   id: string;
//   category: string;
//   namespaceId: string;
//   name: string;
//   capacityAvailable: string[];
//   capacity: string;
//   priceRegular: number;
//   priceDiscount: number;
//   colorsAvailable: string[];
//   color: string;
//   images: string[];
//   description: string[];
//   screen: string;
//   resolution: string;
//   processor: string;
//   ram: string;
//   camera: string;
//   zoom: string;
//   cell: string[];
// }

const NewBrand = () => {
  const [phones, setPhones] = useState<Iphones[] | []>([]);
  const [tablets, setTablets] = useState<Tablets[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/phones.json')
      .then(res => res.json())
      .then(data => setPhones(data))
      .finally(() => setLoading(false));
  }, []);

  console.log(tablets);

  useEffect(() => {
    fetch('/api/tablets.json')
      .then(res => res.json())
      .then(data => setTablets(data))
      .finally(() => setLoading(false));
  }, [setTablets]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const brandNewModels = phones.filter(product => {
    return product.name.includes('iPhone 14');
  });

  const newTablets = tablets.filter(product => {
    return product.id.includes('apple-ipad-mini-6th-gen');
  });

  const allColors = new Set(brandNewModels.map(product => product.color));

  const allColorsTblets = new Set(newTablets.map(product => product.color));

  console.log(brandNewModels);
  console.log(allColors);

  const arrayColorsIphones = Array.from(allColors);
  const arrayColorsTablets = Array.from(allColorsTblets);

  let indexIm = 0;

  const allGadgetsColor = [...arrayColorsIphones, ...arrayColorsTablets];
  const allAsortiment = [...brandNewModels, ...newTablets];

  console.log(allGadgetsColor);

  return (
    <>
      <div className={brandStyles.brand}>
        <h1 className={brandStyles.brand__title}>Brand new models</h1>

        <Swiper
          spaceBetween={16}
          slidesPerView={'auto'}
          className={brandStyles.brand__swiper}
        >
          {allAsortiment.map(phone => {
            const singleIphoneColor = allGadgetsColor.find(
              color => color === phone.color,
            );

            if (singleIphoneColor) {
              allGadgetsColor.forEach((color, i) => {
                const isColor = color === singleIphoneColor ? '' : color;

                allGadgetsColor[i] = isColor;
              });

              const screenValue = phone.screen.split(' ');

              const validScreenValue = screenValue[0] + ' ' + screenValue[1];

              // console.log(arrayColorsIphones);
              console.log(validScreenValue);

              indexIm++;

              return (
                <SwiperSlide className={brandStyles.brand__card} key={phone.id}>
                  <a
                    href="#"
                    style={{ backgroundImage: `url('${phone.images[0]}')` }}
                    className={brandStyles.brand__image}
                  ></a>

                  {/* <div className={brandStyles.brand__imageWrapper}>
                </div> */}

                  <div className={brandStyles.brand__data}>
                    <div className={brandStyles.brand__name}>{phone.name}</div>
                    <div className={brandStyles.brand__price}>
                      ${phone.priceRegular}
                    </div>
                  </div>

                  <div className={brandStyles.brand__deteils}>
                    <div className={brandStyles.brand__info}>
                      <div>Screen</div>
                      <div>{validScreenValue}</div>
                    </div>
                    <div className={brandStyles.brand__info}>
                      <div>Capacity</div>
                      <div className={brandStyles.brand__gb}>128 GB</div>
                    </div>
                    <div className={brandStyles.brand__info}>
                      <div>RAM</div>
                      <div>6 GB</div>
                    </div>
                  </div>

                  <div className={brandStyles.brand__buttons}>
                    <button className={brandStyles.brand__add}>
                      Add to cart
                    </button>

                    <a
                      href="#"
                      className={brandStyles['brand__lovely-choice']}
                    ></a>
                  </div>
                </SwiperSlide>
              );
            }

            return;
          })}
        </Swiper>
      </div>

      {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem illum nisi a dolorum doloremque ad delectus eum perspiciatis quis, quos est explicabo perferendis reprehenderit, enim rerum facere obcaecati? Consequatur cum alias laudantium quos sapiente eos molestias ipsa animi, ratione architecto expedita dolores rem qui esse. */}
    </>
  );
};

export default NewBrand;
