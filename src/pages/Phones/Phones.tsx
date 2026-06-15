import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { FullProduct } from '../../types/Alltypes';
import { getData } from '../../fetch/httpClient';
import styles from './Phones.module.scss';
import { CartsHot } from '../../Functional/HotPrice/CartsHot';
type Props = {
  phone: FullProduct;
};

export const Phones: React.FC<Props> = ({ phone }) => {
  const [phones, setPhones] = useState<FullProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getData<FullProduct[]>('./api/phones.json')
      .then(data => setPhones(data))
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  // eslint-disable-next-line curly
  if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error} <button onClick={() => window.location.reload()}>Retry</button></div>;

  return (
    <div className={styles.containerPhones}>
      <Link to="/" className={styles.home}>
        <button className={styles.homeButton}>
          <img src="/img/home.svg" alt="home" className={styles.homeImg} />
          <span className={styles.homeGo}>{'>'}</span>

          <span className={styles.homeGoTo}>Phones</span>
        </button>
      </Link>
      <h1 className="title">Mobile phones</h1>
      <p className={styles.phonesModels}>95 Models</p>
      <div className={styles.blockBySort}>
        Sort by
        <button></button>
      </div>
      <div className={styles.blockItemsOnPage}>
        Items on page
        <button></button>
      </div>
      <div className={styles.swiperContainer}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={4}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 16 },
            640: { slidesPerView: 3, spaceBetween: 16 },
            1200: { slidesPerView: 4, spaceBetween: 16 },
          }}
          loop={false}
          className={styles.swiperNewBlock}
          navigation={{
            prevEl: '#phone-prev-button',
            nextEl: '#phone-next-button',
          }}
        >
          {phones.length > 0 &&
            phones.map(phone => (
              <SwiperSlide key={phone.namespaceId}>
                <CartsHot />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};
