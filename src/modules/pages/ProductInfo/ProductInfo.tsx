import { useContext, useRef, useState } from 'react';
import './ProductInfo.scss';
import Carousel from 'react-multi-carousel';
import { Card } from '../Home/components/NewPhones/components';
import { Outlet, useParams } from 'react-router-dom';
import {
  AccessoriesContext,
  PhoneContext,
  TabletsContext,
} from '../../../PageContext';

export const ProductInfo = () => {
  const phones = useContext(PhoneContext);
  const tablets = useContext(TabletsContext);
  const accessories = useContext(AccessoriesContext);
  const sortedByYears = phones.sort((a, b) => b.priceRegular - a.priceRegular);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 3.88,
    },
    tablet: {
      breakpoint: { max: 1199, min: 640 },
      items: 2.5,
    },
    mobile: {
      breakpoint: { max: 639, min: 320 },
      items: 1.35,
    },
  };

  const carouselRef = useRef<Carousel>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.next(currentSlide);
      setCurrentSlide(1);
    }
  };

  const handlePrevSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.previous(currentSlide);
      setCurrentSlide(1);
    }
  };

  // const products = useContext(ProductsContext);
  const { productId } = useParams();

  function getCurrectProduct(id: string) {
    return (
      phones.find(phone => phone.id === id) ||
      tablets.find(tablet => tablet.id === id) ||
      accessories.find(acce => acce.id === id)
    );
  }

  function getCurrentPhone() {
    if (!productId) {
      return;
    }

    return getCurrectProduct(productId);
  }

  const currentPhone = getCurrentPhone();

  return (
    <div className="productInfo-container">
      <div className="productInfo-h">
        <h1>links</h1>
        <h1>back</h1>
        <h1 className="productInfo-h1">{currentPhone?.id}</h1>
      </div>
      <div className="productInfo-product">
        <div className="productInfo-pictures-block">
          <div className="productInfo-smallPictures-block">
            <button className="productInfo-smallPicture">
              <img
                className="product-picture"
                src={currentPhone?.images[0]}
              ></img>
            </button>
            <button className="productInfo-smallPicture">
              <img
                className="product-picture"
                src={currentPhone?.images[1]}
              ></img>
            </button>
            <button className="productInfo-smallPicture">
              <img
                className="product-picture"
                src={currentPhone?.images[2]}
              ></img>
            </button>
            <button className="productInfo-smallPicture">
              <img
                className="product-picture"
                src={currentPhone?.images[3]}
              ></img>
            </button>
            <button className="productInfo-smallPicture">
              <img
                className="product-picture"
                src={currentPhone?.images[4]}
              ></img>
            </button>
          </div>
          <div className="selected-picture">
            <button className="productInfo-bigPicture">
              <img
                className="product-bigPicture"
                src={currentPhone?.images[0]}
              ></img>
            </button>
          </div>
        </div>
        <div className="product-info-rightBlock">
          <div className="product-colors-block">
            <p className="product-colors-p">Available colors</p>
            <div className="btns-block">
              <button className="product-circle red"></button>
              <button className="product-circle yellow"></button>
              <button className="product-circle green"></button>
              <button className="product-circle blue"></button>
            </div>
          </div>
          <div className="gb-container">
            <p className="product-colors-p">Select capacity</p>
            <div className="gb-btns-block">
              <button className="gb-btns-hover">
                {currentPhone?.capacityAvailable[0]}
              </button>
              <button className="gb-btns">
                {currentPhone?.capacityAvailable[1]}
              </button>
              <button className="gb-btns">
                {currentPhone?.capacityAvailable[2]}
              </button>
            </div>
          </div>
          <div className="add-to-card-block">
            <div className="p-block">
              <p className="currentPrice">{`$${currentPhone?.priceDiscount}`}</p>
              <p className="fullPrice">{`$${currentPhone?.priceRegular}`}</p>
            </div>
            <div className="buttons-block">
              <button className="Add-btn-black">Add to card</button>
              <button className="fav-btn-other">
                <img src="./uploadedImg/like-btn.png"></img>
              </button>
            </div>
          </div>
          <div className="desc-block">
            <div className="desc-line">
              <p className="leftText">Screen</p>
              <p className="rightText">{currentPhone?.screen}</p>
            </div>
            <div className="desc-line">
              <p className="leftText">Resolution</p>
              <p className="rightText">{currentPhone?.resolution}</p>
            </div>
            <div className="desc-line">
              <p className="leftText">Processor</p>
              <p className="rightText">{currentPhone?.processor}</p>
            </div>
            <div className="desc-line">
              <p className="leftText">RAM</p>
              <p className="rightText">{currentPhone?.ram}</p>
            </div>
          </div>
        </div>
        <div className="product-id">
          <p className="product-id-p">ID: 802390</p>
        </div>
      </div>
      <div className="productInfo-info">
        <div className="productInfo-left-block">
          <h1 className="productInfo-left-block-h1">About</h1>
          <div className="productInfo-desc-block">
            <h2 className="productInfo-desc-h2">!!!desc.map!!!</h2>
            <p className="productInfo-desc-p">
              A transformative triple‑camera system that adds tons of capability
              without complexity. An unprecedented leap in battery life. And a
              mind‑blowing chip that doubles down on machine learning and pushes
              the boundaries of what a smartphone can do. Welcome to the first
              iPhone powerful enough to be called Pro.
            </p>
          </div>
          <div className="productInfo-desc-block">
            <h2 className="productInfo-desc-h2">Camera</h2>
            <p className="productInfo-desc-p">
              Meet the first triple‑camera system to combine cutting‑edge
              technology with the legendary simplicity of iPhone. Capture up to
              four times more scene. Get beautiful images in drastically lower
              light. Shoot the highest‑quality video in a smartphone — then edit
              with the same tools you love for photos. You’ve never shot with
              anything like it.
            </p>
          </div>
          <div className="productInfo-desc-block">
            <h2 className="productInfo-desc-h2">
              Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it.
              Love it.
            </h2>
            <p className="productInfo-desc-p">
              iPhone 11 Pro lets you capture videos that are beautifully true to
              life, with greater detail and smoother motion. Epic processing
              power means it can shoot 4K video with extended dynamic range and
              cinematic video stabilization — all at 60 fps. You get more
              creative control, too, with four times more scene and powerful new
              editing tools to play with.
            </p>
          </div>
        </div>
        <div className="productInfo-right-block">
          <h1 className="productInfo-left-block-h1">Tech specs</h1>
          <div className="product-tech-divs">
            <div className="desc-line">
              <p className="leftText-desc">Screen</p>
              <p className="rightText-desc">6.5” OLED</p>
            </div>
            <div className="desc-line">
              <p className="leftText-desc">Resolution</p>
              <p className="rightText-desc">2688x1242</p>
            </div>
            <div className="desc-line">
              <p className="leftText-desc">Processor</p>
              <p className="rightText-desc">Apple A12 Bionic</p>
            </div>
            <div className="desc-line">
              <p className="leftText-desc">RAM</p>
              <p className="rightText-desc">3 GB</p>
            </div>
            <div className="desc-line">
              <p className="leftText-desc">Built in memory</p>
              <p className="rightText-desc">64 GB</p>
            </div>
            <div className="desc-line">
              <p className="leftText-desc">Camera</p>
              <p className="rightText-desc">12 Mp + 12 Mp + 12 Mp (Triple)</p>
            </div>
            <div className="desc-line">
              <p className="leftText-desc">Zoom</p>
              <p className="rightText-desc">Optical, 2x</p>
            </div>
            <div className="desc-line">
              <p className="leftText-desc">Cell</p>
              <p className="rightText-desc">GSM, LTE, UMTS</p>
            </div>
          </div>
        </div>
      </div>
      <div className="newPhone-container">
        <div className="newPhone-header">
          <h1 className="newPhones-h1">You may also like</h1>
          <div className="slide-btns">
            <button className="arrow-btn" onClick={handlePrevSlide}>
              <img src="./uploadedImg/RightArrow.png"></img>
            </button>

            <button className="arrow-btn" onClick={handleNextSlide}>
              <img src="./uploadedImg/LeftArrow.png"></img>
            </button>
          </div>
        </div>
        <Carousel
          responsive={responsive}
          arrows={false}
          ref={carouselRef}
          itemClass="carousel-item-padding-0-px"
          containerClass="carousel-container"
        >
          {sortedByYears.map(sortedByYear => (
            <Card phone={sortedByYear} key={sortedByYear.id} />
          ))}
        </Carousel>
      </div>
      <Outlet />
    </div>
  );
};
