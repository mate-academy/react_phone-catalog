import './HomePage.scss';
import image1 from '../../img/banner-phones.png';
import image2 from '../../img/banner-accessories.png';
import image3 from '../../img/banner-tablets.png';
import { useContext, useRef, useState } from 'react';
import products from '../../api/products.json';
import { Link } from 'react-router-dom';
import { handleButton } from '../../utils/generalFunctions';
import heartEmpty from '../../imgs/Favourites.svg';
import heartFull from '../../imgs/Favourites Filled.svg';
import { LikedIdContext } from '../../utils/context';

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
  const [brandNewIndex, setBrandNewIndex] = useState(0);
  const [currentHotIndex, setCurrentHotIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const {
    addLikedId,
    removeLikedId,
    addCardId,
    removeCardId,
    likedIds,
    cardIds,
  } = useContext(LikedIdContext);

  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;

    e.preventDefault();
  };

  const handleTouchEnd = () => {
    const touchDiff = touchStartX.current - touchEndX.current;

    if (touchDiff > 50) {
      nextSlide();
    } else if (touchDiff < -50) {
      prevSlide();
    }
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

  const prevSlide = () => {
    setCurrentSlide(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const nextSlide = () => {
    setCurrentSlide(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const brandNewPrev = () => {
    setBrandNewIndex(handleButton.previous(brandNewIndex, phonesNew));
  };

  const brandNewNext = () => {
    setBrandNewIndex(handleButton.next(brandNewIndex, phonesNew));
  };

  const prevHot = () => {
    setCurrentHotIndex(handleButton.previous(currentHotIndex, phonesHot));
  };

  const nextHot = () => {
    setCurrentHotIndex(handleButton.next(currentHotIndex, phonesHot));
  };

  const handleButtonCard = (id: string) => {
    if (cardIds.filter((cardId: string) => cardId === id).length === 1) {
      return removeCardId(id);
    }

    return addCardId(id);
  };

  const handleButtonHeart = (id: string) => {
    if (likedIds.filter((likedId: string) => likedId === id).length === 1) {
      return removeLikedId(id);
    }

    return addLikedId(id);
  };

  const isLikedButton = (id: string) => {
    return likedIds.filter((likedId: string) => likedId === id).length === 1;
  };

  const inCard = (id: string) => {
    return cardIds.filter((cardId: string) => cardId === id).length === 1;
  };

  return (
    <section className="home" id="home">
      <div className="container">
        <div className="grid">
          <div className="home_title">
            <h1 className="home_title_text">Welcome to Nice Gadgets store!</h1>
          </div>

          <div className="slider2">
            <div
              className="slider2_container"
              ref={sliderRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <button
                className="slider2_button slider_button--left"
                onClick={prevSlide}
              >
                &#10094;
              </button>

              <div className="slider2_box">
                {images.map((img, index) => (
                  <div
                    className="slider2_box_wrap"
                    style={{
                      transform: `translateX(-${currentSlide * 100}%)`,
                      transition: 'transform 0.5s ease-in-out',
                    }}
                  >
                    <img
                      src={img}
                      alt="img"
                      key={index}
                      className="slider2_box_wrap_img"
                    />
                  </div>
                ))}
              </div>
              <button
                className="slider2_button slider_button--right"
                onClick={nextSlide}
              >
                &#10095;
              </button>
            </div>

            <div className="slider2_dots">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`slider2_dots_one ${currentSlide === index ? 'active' : ''}`}
                ></div>
              ))}
            </div>
          </div>

          <div className="itemSlider">
            <div className="itemSlider_container1">
              <h2 className="itemSlider_title">Brand New</h2>
              <div className="itemSlider_container1_buttons">
                <button
                  className="itemSlider_container1_buttons_left"
                  onClick={brandNewPrev}
                  disabled={brandNewIndex === 0}
                >
                  &#10094;
                </button>
                <button
                  className="itemSlider_container1_buttons_right"
                  onClick={brandNewNext}
                  disabled={phonesNew.length - brandNewIndex === 4}
                >
                  &#10095;
                </button>
              </div>
            </div>
            <div className="itemSlider_container2">
              {phonesNew.map((item, index) => (
                <div
                  className="productCard"
                  key={index}
                  style={{
                    transform: `translateX(-${brandNewIndex * 105}%)`,
                    transition: 'transform 0.5s ease-in-out',
                  }}
                >
                  <div className="productCard_container">
                    <Link
                      to={`/phones/${item.itemId}`}
                      className="productCard_container_link"
                      onClick={handleButton.scrollTop}
                    >
                      <div className="productCard_imgs">
                        <img
                          src={item.image}
                          className="productCard_imgs_img"
                          alt="IMG"
                        />
                      </div>

                      <p className="productCard_title">{item.name}</p>
                      <div className="productCard_prices">
                        <p className="productCard_price">{`$${item.price}`}</p>
                        <p className="productCard_fullPrice">{`$${item.fullPrice}`}</p>
                      </div>

                      <div className="productCard_info">
                        <div className="productCard_info_screen">
                          <p className="productCard_info_title">Screen</p>
                          <p className="productCard_info_text">{item.screen}</p>
                        </div>
                        <div className="productCard_info_capacity">
                          <p className="productCard_info_title">Capacity</p>
                          <p className="productCard_info_text">
                            {item.capacity}
                          </p>
                        </div>
                        <div className="productCard_info_ram">
                          <p className="productCard_info_title">Ram</p>
                          <p className="productCard_info_text">{item.ram}</p>
                        </div>
                      </div>
                    </Link>
                    <div className="productCard_buttons">
                      <button
                        className="productCard_buttons_add"
                        onClick={() => handleButtonCard(item.itemId)}
                        style={{
                          backgroundColor: `${inCard(item.itemId) ? '#FAFBFC' : '#216CFF'}`,
                          color: `${inCard(item.itemId) ? '#216CFF' : '#FAFBFC'}`,
                          border: `${inCard(item.itemId) ? '1px solid #E2E6E9' : 'none'}`,
                        }}
                      >
                        {`${inCard(item.itemId) ? 'Added to Card' : 'Add to Card'}`}
                      </button>
                      <button
                        className="productCard_buttons_heart"
                        onClick={() => handleButtonHeart(item.itemId)}
                        style={{
                          backgroundImage: `${isLikedButton(item.itemId) ? `url('${heartFull}` : `url('${heartEmpty}`}')`,
                        }}
                      ></button>
                    </div>
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
                  onClick={() => handleButton.scrollTop()}
                ></Link>
                <p className="shopBy_box_title">Mobile phones</p>
                <p className="shopBy_box_items">{`${availabePhones} models`}</p>
              </div>
              <div className="shopBy_box">
                <Link
                  to="/tablets"
                  className="shopBy_box_link shopBy_box_link--tablets"
                  onClick={() => handleButton.scrollTop()}
                ></Link>
                <p className="shopBy_box_title">Tables</p>
                <p className="shopBy_box_items">{`${availabeTablets} models`}</p>
              </div>
              <div className="shopBy_box">
                <Link
                  to="/accessories"
                  className="shopBy_box_link shopBy_box_link--accessories"
                  onClick={() => handleButton.scrollTop()}
                ></Link>
                <p className="shopBy_box_title">Accessories</p>
                <p className="shopBy_box_items">{`${availabeAccessories} models`}</p>
              </div>
            </div>
          </div>

          <div className="itemSlider">
            <div className="itemSlider_container1">
              <h2 className="itemSlider_title">Hot Prices</h2>
              <div className="itemSlider_container1_buttons">
                <button
                  className="itemSlider_container1_buttons_left"
                  onClick={prevHot}
                  disabled={currentHotIndex === 0}
                >
                  &#10094;
                </button>
                <button
                  className="itemSlider_container1_buttons_right"
                  onClick={nextHot}
                  disabled={phonesHot.length - currentHotIndex === 4}
                >
                  &#10095;
                </button>
              </div>
            </div>
            <div className="itemSlider_container2">
              {phonesHot.map((item, index) => (
                <div
                  className="productCard"
                  key={index}
                  style={{
                    transform: `translateX(-${currentHotIndex * 105}%)`,
                    transition: 'transform 0.5s ease-in-out',
                  }}
                >
                  <div className="productCard_container">
                    <Link
                      to={`/phones/${item.itemId}`}
                      className="productCard_container_link"
                      onClick={handleButton.scrollTop}
                    >
                      <div className="productCard_imgs">
                        <img
                          src={item.image}
                          className="productCard_imgs_img"
                          alt="IMG"
                        />
                      </div>

                      <p className="productCard_title">{item.name}</p>
                      <div className="productCard_prices">
                        <p className="productCard_price">{`$${item.price}`}</p>
                        <p className="productCard_fullPrice">{`$${item.fullPrice}`}</p>
                      </div>

                      <div className="productCard_info">
                        <div className="productCard_info_screen">
                          <p className="productCard_info_title">Screen</p>
                          <p className="productCard_info_text">{item.screen}</p>
                        </div>
                        <div className="productCard_info_capacity">
                          <p className="productCard_info_title">Capacity</p>
                          <p className="productCard_info_text">
                            {item.capacity}
                          </p>
                        </div>
                        <div className="productCard_info_ram">
                          <p className="productCard_info_title">Ram</p>
                          <p className="productCard_info_text">{item.ram}</p>
                        </div>
                      </div>
                    </Link>
                    <div className="productCard_buttons">
                      <button
                        className="productCard_buttons_add"
                        onClick={() => handleButtonCard(item.itemId)}
                        style={{
                          backgroundColor: `${inCard(item.itemId) ? '#FAFBFC' : '#216CFF'}`,
                          color: `${inCard(item.itemId) ? '#216CFF' : '#FAFBFC'}`,
                          border: `${inCard(item.itemId) ? '1px solid #E2E6E9' : 'none'}`,
                        }}
                      >
                        {`${inCard(item.itemId) ? 'Added to Card' : 'Add to Card'}`}
                      </button>
                      <button
                        className="productCard_buttons_heart"
                        onClick={() => handleButtonHeart(item.itemId)}
                        style={{
                          backgroundImage: `${isLikedButton(item.itemId) ? `url('${heartFull}` : `url('${heartEmpty}`}')`,
                        }}
                      ></button>
                    </div>
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
