import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import './HotPrices.scss';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext/CartContext';

interface Product {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

export default function HotPrices() {
  const [phones, setPhones] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    addToCart,
    toggleFavorite,
    cart,
    favorites,
  } = useCart();

  useEffect(() => {
    setLoading(true);

    fetch(`${import.meta.env.BASE_URL}/api/products.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        return response.json();
      })
      .then((data: Product[]) => {
        const withDiscount = data
          .filter(p => p.fullPrice > p.price)
          .sort(
            (a, b) =>
              (b.fullPrice - b.price) -
              (a.fullPrice - a.price),
          );

        setPhones(withDiscount);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="hot-section">
        <div className="hot">
          <p style={{ color: 'white' }}>
            Loading...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="hot-section">
        <div className="hot">
          <p style={{ color: 'red' }}>
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="hot-section">
      <div className="hot">
        <div className="hot__header">
          <h2 className="hot__title">
            Hot prices
          </h2>

          <div className="hot__nav">
            <button className="hot__nav-btn swiper-hot-prev">
              {'<'}
            </button>

            <button className="hot__nav-btn swiper-hot-next">
              {'>'}
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={4}
          navigation={{
            nextEl: '.swiper-hot-next',
            prevEl: '.swiper-hot-prev',
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
          }}
          className="hot__swiper"
        >
          {phones.slice(0, 20).map(phone => (
            <SwiperSlide
              key={phone.id}
              className="hot__slide"
            >
              <div className="hot__card">

                {/* ✅ FIX */}
                <Link to={`/${phone.category}/${phone.itemId}`}>
                  <img
                    src={`${import.meta.env.BASE_URL}${phone.image}`}
                    alt={phone.name}
                    className="hot__card-image"
                    onError={e =>
                      e.currentTarget.setAttribute(
                        'src',
                        'img/page-not-found.png',
                      )
                    }
                  />

                  <h3 className="hot__card-title">
                    {phone.name}
                  </h3>

                  <div className="hot__card-prices">
                    <span className="hot__card-price">
                      ${phone.price}
                    </span>

                    <span className="hot__card-old-price">
                      ${phone.fullPrice}
                    </span>
                  </div>

                  <div className="hot__card-specs">
                    <div className="hot__card-spec">
                      <span className="hot__card-spec-label">
                        Screen
                      </span>
                      <span className="hot__card-spec-value">
                        {phone.screen}
                      </span>
                    </div>

                    <div className="hot__card-spec">
                      <span className="hot__card-spec-label">
                        Capacity
                      </span>
                      <span className="hot__card-spec-value">
                        {phone.capacity}
                      </span>
                    </div>

                    <div className="hot__card-spec">
                      <span className="hot__card-spec-label">
                        RAM
                      </span>
                      <span className="hot__card-spec-value">
                        {phone.ram}
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="hot__card-actions">
                  <button
                    className="hot__card-btn hot__card-btn--add"
                    onClick={() =>
                      addToCart({
                        id: phone.itemId,
                        name: phone.name,
                        price: phone.price,
                        image: phone.image,
                        color: phone.color,
                        capacity: phone.capacity,
                        quantity: 1,
                      })
                    }
                    disabled={cart.some(
                      item => item.id === phone.itemId,
                    )}
                  >
                    {cart.some(
                      item => item.id === phone.itemId,
                    )
                      ? 'Added to cart'
                      : 'Add to cart'}
                  </button>

                  <button
                    className="hot__card-btn hot__card-btn--favorite"
                    onClick={() =>
                      toggleFavorite(phone.itemId)
                    }
                  >
                    <img
                      src={
                        favorites.includes(phone.itemId)
                          ? './icons/heart-active.svg'
                          : './icons/heart.svg'
                      }
                      alt="Favorite"
                      className="hot__card-btn-icon"
                    />
                  </button>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}