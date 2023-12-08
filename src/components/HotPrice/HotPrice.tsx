import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Pagination } from 'swiper';
import { useContext } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
// import { getPhones } from '../../utils/fetch';
import { PhoneContext } from '../Context/contex';
import './hotPrice.scss';

// import { ProducdPhone } from '../../Type/phone';
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module

export const HotPrice = () => {
  const { phones } = useContext(PhoneContext);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);

  // useEffect(() => {
  //   getPhones()
  //     .then(setPhones)
  //     .catch(() => setIsError(true))
  //     .finally(() => setIsLoading(false));
  // }, []);

  const hotPricePhones = [...phones]
    .sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price));

  return (
    <section className="hot">
      <div className="hot__container">
        <h2 className="hot__title"> Hot prices </h2>
        <div className="hot__button">
          <button
            type="button"
            aria-label="Mute volume"
            className="hot__button hot__button--left"
          />
          <button
            type="button"
            aria-label="Mute volume"
            className="hot__button hot__button--right"
          />
        </div>
      </div>

      <div
        className="product"
      >
        <Swiper
          data-cy="cardsContainer"
          navigation={{
            nextEl: '.hot__button--right',
            prevEl: '.hot__button--left',
          }}
          spaceBetween={50}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            900: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          modules={[EffectFade, Navigation, Pagination]}
          className="swiper"
        >
          {hotPricePhones.map(phone => (
            <SwiperSlide
              className="swiper-slider"
              key={phone.id}
            >
              <ProductCard phone={phone} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* {!isLoading && isError && (
        <p>
          Something went wrong
        </p>
      )} */}
    </section>
  );
};

export default HotPrice;
