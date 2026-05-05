import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import './NewBrand.scss';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext/CartContext';

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

export default function NewBrand() {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, toggleFavorite, cart, favorites } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.BASE_URL}api/phones.json`)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
        return response.json();
      })
      .then(data => {
        const sorted = [...data].sort(
          (a: Phone, b: Phone) => (b.year ?? 0) - (a.year ?? 0),
        );
        setPhones(sorted);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load phones');
        setLoading(false);
      });
  }, []);

  if (loading) return <section className="section"><div className="brand"><p style={{color:'white'}}>Loading...</p></div></section>;
  if (error) return <section className="section"><div className="brand"><p style={{color:'red'}}>{error}</p></div></section>;

  return (
    <section className="section">
      <div className="brand">
        <div className="brand__header">
          <h2 className="brand__title">Brand new models</h2>
          <div className="brand__nav">
            <button className="brand__nav-btn swiper-new-prev">{'<'}</button>
            <button className="brand__nav-btn swiper-new-next">{'>'}</button>
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
          className="brand__swiper"
        >
          {phones.slice(0, 20).map(phone => (
            <SwiperSlide key={phone.id} className="brand__slide">
              <div className="brand__card">
                <Link to={`/products/${phone.id}`}>
                  <img
                    src={phone.images[0]}
                    alt={phone.name}
                    className="brand__card-image"
                    onError={e =>
                      e.currentTarget.setAttribute('src', 'img/page-not-found.png')
                    }
                  />
                  <h3 className="brand__card-title">{phone.name}</h3>
                  <div className="brand__card-prices">
                    <span className="brand__card-price">${phone.priceDiscount}</span>
                    {phone.priceRegular !== phone.priceDiscount && (
                      <span className="brand__card-old-price">${phone.priceRegular}</span>
                    )}
                  </div>
                  <div className="brand__card-specs">
                    <div className="brand__card-spec">
                      <span className="brand__card-spec-label">Screen</span>
                      <span className="brand__card-spec-value">{phone.screen}</span>
                    </div>
                    <div className="brand__card-spec">
                      <span className="brand__card-spec-label">Capacity</span>
                      <span className="brand__card-spec-value">{phone.capacity}</span>
                    </div>
                    <div className="brand__card-spec">
                      <span className="brand__card-spec-label">RAM</span>
                      <span className="brand__card-spec-value">{phone.ram}</span>
                    </div>
                  </div>
                </Link>
                <div className="brand__card-actions">
                  <button
                    className="brand__card-btn brand__card-btn--add"
                    onClick={() => addToCart({
                      id: phone.id,
                      name: phone.name,
                      price: phone.priceDiscount,
                      image: phone.images[0],
                      color: phone.color,
                      capacity: phone.capacity,
                      quantity: 1,
                    })}
                    disabled={cart.some(item => item.id === phone.id)}
                  >
                    {cart.some(item => item.id === phone.id) ? 'Added to cart' : 'Add to cart'}
                  </button>
                  <button
                    className="brand__card-btn brand__card-btn--favorite"
                    onClick={() => toggleFavorite(phone.id)}
                  >
                    <img
                      src={favorites.includes(phone.id) ? '/icons/heart-active.svg' : '/icons/heart.svg'}
                      alt="Favorite"
                      className="brand__card-btn-icon"
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