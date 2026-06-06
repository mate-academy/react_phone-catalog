import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import './NewBrand.scss';
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

export default function NewBrand() {
  const [phones, setPhones] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    addToCart,
    toggleFavorite,
    removeFromCart,
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
        const phonesOnly = data.filter(
          p => p.category === 'phones',
        );

        const sorted = [...phonesOnly].sort((a, b) => {
          if (b.year !== a.year) {
            return b.year - a.year;
          }

          return b.price - a.price;
        });

        setPhones(sorted);
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
        <div className="new-brand">
          <p style={{ color: 'white' }}>Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <div className="new-brand">
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="new-brand">
        <div className="new-brand__header">
          <h2 className="new-brand__title">Brand new models</h2>

          <div className="new-brand__nav">
            <button className="new-brand__nav-btn swiper-new-prev">
              <img src="./icons/arrow-left-small-white.svg" alt="prev" />
            </button>
            <button className="new-brand__nav-btn swiper-new-next">
              <img src="./icons/arrow-right-small-white.svg" alt="next" />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={4}
          navigation={{
            nextEl: '.swiper-new-next',
            prevEl: '.swiper-new-prev',
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 16 },
            1200: { slidesPerView: 4, spaceBetween: 16 },
          }}
          className="new-brand__swiper"
        >
          {phones.slice(0, 20).map(phone => (
            <SwiperSlide key={phone.id} className="new-brand__slide">
              <div className="new-brand__card">
                <Link to={`/${phone.category}/${phone.itemId}`}>
                  <img
                    src={`${import.meta.env.BASE_URL}${phone.image}`}
                    alt={phone.name}
                    className="new-brand__card-image"
                    onError={e =>
                      e.currentTarget.setAttribute(
                        'src',
                        'img/page-not-found.png',
                      )
                    }
                  />

                  <h3 className="new-brand__card-title">{phone.name}</h3>

                  <div className="new-brand__card-prices">
                    <span className="new-brand__card-price">${phone.price}</span>
                    {phone.fullPrice !== phone.price && (
                      <span className="new-brand__card-old-price">
                        ${phone.fullPrice}
                      </span>
                    )}
                  </div>

                  <div className="new-brand__card-specs">
                    <div className="new-brand__card-spec">
                      <span className="new-brand__card-spec-label">Screen</span>
                      <span className="new-brand__card-spec-value">{phone.screen}</span>
                    </div>
                    <div className="new-brand__card-spec">
                      <span className="new-brand__card-spec-label">Capacity</span>
                      <span className="new-brand__card-spec-value">{phone.capacity}</span>
                    </div>
                    <div className="new-brand__card-spec">
                      <span className="new-brand__card-spec-label">RAM</span>
                      <span className="new-brand__card-spec-value">{phone.ram}</span>
                    </div>
                  </div>
                </Link>

                <div className="new-brand__card-actions">
                  <button
                    className={`new-brand__card-btn new-brand__card-btn--add${
                      cart.some(item => item.id === phone.itemId)
                        ? ' is-added'
                        : ''
                    }`}
                    onClick={() => {
                      const inCart = cart.some(
                        item => item.id === phone.itemId,
                      );

                      if (inCart) {
                        removeFromCart(phone.itemId);
                      } else {
                        addToCart({
                          id: phone.itemId,
                          name: phone.name,
                          price: phone.price,
                          image: phone.image,
                          color: phone.color,
                          capacity: phone.capacity,
                          quantity: 1,
                        });
                      }
                    }}
                  >
                    {cart.some(item => item.id === phone.itemId)
                      ? 'Added to cart'
                      : 'Add to cart'}
                  </button>

                  <button
                    className="new-brand__card-btn new-brand__card-btn--favorite"
                    onClick={() => toggleFavorite(phone.itemId)}
                  >
                    <img
                      src={
                        favorites.includes(phone.itemId)
                          ? './icons/heart-active.svg'
                          : './icons/heart.svg'
                      }
                      alt="Favorite"
                      className="new-brand__card-btn-icon"
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
