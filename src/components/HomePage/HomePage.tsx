import './HomePage.scss';
import image1 from '../../img/banner-phones.png';
import image2 from '../../img/banner-accessories.png';
import image3 from '../../img/banner-tablets.png';
import { useState } from 'react';
import products from '../../api/products.json';
import { Link } from 'react-router-dom';

type Product = {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  capacity: string;
  image: string;
  price: number;
  ram: string;
  screen: string;
  year: number;
  color: string;
};

export const HomePage: React.FC = () => {
  const images = [image1, image2, image3];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhoneIndex, setCurrentPhoneIndex] = useState(0);
  const [currentHotIndex, setCurrentHotIndex] = useState(0);

  const slideStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${images[currentIndex]})`,
  };

  const availabePhones = products.filter(
    product => product.category === 'phones',
  ).length;
  const availabeTablets = products.filter(
    product => product.category === 'tablets',
  ).length;
  const availabeAccessories = products.filter(
    product => product.category === 'accessories',
  ).length;

  const phonesNew = products
    .filter(product => product.category === 'phones' && product.year === 2022)
    .reduce<Product[]>((acc, phone) => {
    if (!acc.find(item => item.color === phone.color)) {
      acc.push(phone);
    }

    return acc;
  }, []);

  const phonesHot = products
    .filter(
      product =>
        product.category === 'phones' &&
        ((product.fullPrice - product.price) / product.fullPrice) * 100 > 10,
    )
    .reduce<Product[]>((acc, phone) => {
    if (!acc.find(item => item.color === phone.color)) {
      acc.push(phone);
    }

    return acc;
  }, []);

  const prevImg = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const nextImg = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentPhoneIndex(prevIndex => (prevIndex + 1) % phonesNew.length);
  };

  const prevSlide = () => {
    setCurrentPhoneIndex(
      prevIndex => (prevIndex - 1 + phonesNew.length) % phonesNew.length,
    );
  };

  const prevHot = () => {
    setCurrentHotIndex(
      prevIndex => (prevIndex - 1 + phonesNew.length) % phonesNew.length,
    );
  };

  const nextHot = () => {
    setCurrentHotIndex(prevIndex => (prevIndex + 1) % phonesNew.length);
  };

  return (
    <section className="home" id="home">
      <div className="container">
        <div className="grid">
          <div className="home_title">
            <h1 className="home_title_text">Welcome to Nice Gadgets store!</h1>
          </div>

          <div className="slider">
            <div className="slider_container">
              <button
                className="slider_button slider_button--left"
                onClick={prevImg}
              >
                &#10094;
              </button>
              <div style={slideStyle}></div>
              <button
                className="slider_button slider_button--right"
                onClick={nextImg}
              >
                &#10095;
              </button>
            </div>

            <div className="slider_dots">
              {images.map((_, index) => (
                <div
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`slider_dots_one ${currentIndex === index ? 'active' : ''}`}
                ></div>
              ))}
            </div>
          </div>

          <div className="brandNew">
            <div className="brandNew_container1">
              <h2 className="brandNew_title">Brand New models</h2>
              <div className="brandNew_container1_buttons">
                <button
                  className="brandNew_container1_buttons_left"
                  onClick={prevSlide}
                  disabled={currentPhoneIndex === 0}
                >
                  &#10094;
                </button>
                <button
                  className="brandNew_container1_buttons_right"
                  onClick={nextSlide}
                  disabled={phonesNew.length - currentPhoneIndex === 4}
                >
                  &#10095;
                </button>
              </div>
            </div>
            <div className="brandNew_container2">
              {phonesNew.map((phone, index) => (
                <div
                  key={index}
                  className="productCard"
                  style={{
                    transform: `translateX(-${currentPhoneIndex * 105}%)`,
                    transition: 'transform 0.5s ease-in-out',
                  }}
                >
                  <div className="productCard_imgs">
                    <img
                      src={phone.image}
                      className="productCard_imgs_img"
                      alt="IMG"
                    />
                  </div>

                  <p className="productCard_title">{phone.name}</p>
                  <div className="productCard_prices">
                    <p className="productCard_fullPrice">{`$${phone.fullPrice}`}</p>
                  </div>
                  <div className="productCard_info">
                    <div className="productCard_info_screen">
                      <p className="productCard_info_title">Screen</p>
                      <p className="productCard_info_text">{phone.screen}</p>
                    </div>
                    <div className="productCard_info_capacity">
                      <p className="productCard_info_title">Capacity</p>
                      <p className="productCard_info_text">{phone.capacity}</p>
                    </div>
                    <div className="productCard_info_ram">
                      <p className="productCard_info_title">Ram</p>
                      <p className="productCard_info_text">{phone.ram}</p>
                    </div>
                  </div>
                  <div className="productCard_buttons">
                    <button className="productCard_buttons_add">
                      Add to card
                    </button>
                    <button className="productCard_buttons_heart"></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="shopBy">
            <div className="shopBy_title">Shop by category</div>
            <div className="shopBy_container">
              <div className="shopBy_box">
                <Link
                  to="/phones"
                  className="shopBy_box_link shopBy_box_link--phones"
                ></Link>
                <p className="shopBy_box_title">Mobile phones</p>
                <p className="shopBy_box_items">{`${availabePhones} models`}</p>
              </div>
              <div className="shopBy_box">
                <Link
                  to="/tablets"
                  className="shopBy_box_link shopBy_box_link--tablets"
                ></Link>
                <p className="shopBy_box_title">Tables</p>
                <p className="shopBy_box_items">{`${availabeTablets} models`}</p>
              </div>
              <div className="shopBy_box">
                <Link
                  to="/accesories"
                  className="shopBy_box_link shopBy_box_link--accessories"
                ></Link>
                <p className="shopBy_box_title">Accessories</p>
                <p className="shopBy_box_items">{`${availabeAccessories} models`}</p>
              </div>
            </div>
          </div>

          <div className="hotPrices">
            <div className="hotPrices_container1">
              <h2 className="hotPrices_title">Hot prices</h2>
              <div className="hotPrices_container1_buttons">
                <button
                  className="hotPrices_container1_buttons_left"
                  onClick={prevHot}
                  disabled={currentHotIndex === 0}
                >
                  &#10094;
                </button>
                <button
                  className="hotPrices_container1_buttons_right"
                  onClick={nextHot}
                  disabled={phonesHot.length - currentHotIndex === 4}
                >
                  &#10095;
                </button>
              </div>
            </div>
            <div className="hotPrices_container2">
              {phonesHot.map((phone, index) => (
                <div
                  key={index}
                  className="productCard"
                  style={{
                    transform: `translateX(-${currentHotIndex * 105}%)`,
                    transition: 'transform 0.5s ease-in-out',
                  }}
                >
                  <div className="productCard_imgs">
                    <img
                      src={phone.image}
                      className="productCard_imgs_img"
                      alt="IMG"
                    />
                  </div>

                  <p className="productCard_title">{phone.name}</p>
                  <div className="productCard_prices">
                    <p className="productCard_fullPrice">{`$${phone.fullPrice}`}</p>
                    <p className="productCard_price">{`$${phone.price}`}</p>
                  </div>

                  <div className="productCard_info">
                    <div className="productCard_info_screen">
                      <p className="productCard_info_title">Screen</p>
                      <p className="productCard_info_text">{phone.screen}</p>
                    </div>
                    <div className="productCard_info_capacity">
                      <p className="productCard_info_title">Capacity</p>
                      <p className="productCard_info_text">{phone.capacity}</p>
                    </div>
                    <div className="productCard_info_ram">
                      <p className="productCard_info_title">Ram</p>
                      <p className="productCard_info_text">{phone.ram}</p>
                    </div>
                  </div>
                  <div className="productCard_buttons">
                    <button className="productCard_buttons_add">
                      Add to card
                    </button>
                    <button className="productCard_buttons_heart"></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
