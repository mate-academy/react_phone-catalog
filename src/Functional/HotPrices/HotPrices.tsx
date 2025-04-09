import '..//BrandNewModelPhone/NewBrand.scss';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface Phone {
  id: string;
  category: string;
  itemId?: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year?: number;
  images: string[];
}

export default function HotPrices() {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/phones.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch phones.json: ${response.status} ${response.statusText}`,
          );
        }

        return response.json();
      })
      .then(data => {
        setPhones(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load phones');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="section">
        <div className="brand">
          <div>Loading phones...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <div className="brand">
          <div className="error">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="brand">
        <div className="brand__header">
          <h2 className="brand__title">Hot prices</h2>

          <div className="brand__nav">
            <button
              className="brand__nav-btn brand__nav-btn--prev
            swiper-button-p"
            >
              {'<'}
            </button>
            <button
              className="brand__nav-btn brand__nav-btn--next
             swiper-button-n"
            >
              {'>'}
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          navigation={{
            nextEl: '.swiper-button-n',
            prevEl: '.swiper-button-p',
          }}
          breakpoints={{
            320: { slidesPerView: 'auto', spaceBetween: 8 },
            480: { slidesPerView: 'auto', spaceBetween: 12 },
            768: { slidesPerView: 'auto', spaceBetween: 20 },
            1024: { slidesPerView: 'auto', spaceBetween: 20 },
          }}
          className="brand__swiper"
        >
          {phones.slice(20, 28).map(phone => (
            <SwiperSlide key={phone.id} className="brand__card">
              <img
                src={phone.images[0]}
                alt={phone.name}
                className="brand__card-image"
                onError={e =>
                  e.currentTarget.setAttribute(
                    'src',
                    '/public/img/page-not-found.png',
                  )
                }
              />
              <h3 className="brand__card-title">{phone.name}</h3>
              <div className="brand__card-prices">
                <span className="brand__card-price">
                  ${phone.priceDiscount}
                </span>
                {phone.priceRegular > phone.priceDiscount && (
                  <span className="brand__card-old-price">
                    ${phone.priceRegular}
                  </span>
                )}
              </div>
              <div className="brand__card-specs">
                <div className="brand__card-spec">
                  <span className="brand__card-spec-label">Screen</span>
                  <span className="brand__card-spec-value">{phone.screen}</span>
                </div>
                <div className="brand__card-spec">
                  <span className="brand__card-spec-label">Capacity</span>
                  <span className="brand__card-spec-value">
                    {phone.capacity}
                  </span>
                </div>
                <div className="brand__card-spec">
                  <span className="brand__card-spec-label">RAM</span>
                  <span className="brand__card-spec-value">{phone.ram}</span>
                </div>
              </div>
              <div className="brand__card-actions">
                <button className="brand__card-btn brand__card-btn--add">
                  Add to cart
                </button>
                <button className="brand__card-btn brand__card-btn--favorite">
                  <img
                    src="/figmaLogo/HeartLove.svg"
                    alt="Favorite"
                    className="brand__card-btn-icon"
                  />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
