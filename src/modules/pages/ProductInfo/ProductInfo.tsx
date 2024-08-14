import { useContext, useEffect, useRef, useState } from 'react';
import './ProductInfo.scss';
import Carousel from 'react-multi-carousel';
import { Card } from '../Home/components/NewPhones/components';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  AccessoriesContext,
  PhoneContext,
  ProductsContext,
  TabletsContext,
} from '../../../PageContext';
import { Loader } from '../Phones/components';

export const ProductInfo = () => {
  const { addToBucket, handleFavItems, bucketItems, favItems, productData } =
    useContext(ProductsContext);
  const phones = useContext(PhoneContext);
  const tablets = useContext(TabletsContext);
  const accessories = useContext(AccessoriesContext);

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

  function suggestedProducts() {
    if (phones.find(phone => phone.id === currentPhone?.id)) {
      return phones;
    } else if (tablets.find(tablet => tablet.id === currentPhone?.id)) {
      return tablets;
    } else if (accessories.find(acce => acce.id === currentPhone?.id)) {
      return accessories;
    }

    return;
  }

  const suggestedProductsA = suggestedProducts();
  const sortedByYears = suggestedProductsA?.sort(
    (a, b) => b.priceRegular - a.priceRegular,
  );

  const [currentPicture, setCurrentPicture] = useState(currentPhone?.images[0]);
  const [currentColor, setCurrentColor] = useState(
    currentPhone?.colorsAvailable[0],
  );
  const [currentCapacity, setCurrentCapacity] = useState(
    currentPhone?.capacityAvailable[0],
  );

  function addPhone() {
    if (currentPhone) {
      addToBucket({
        item: currentPhone,
        count: 1,
      });
    }
  }

  function addFav() {
    if (currentPhone) {
      handleFavItems(currentPhone);
    }
  }

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  function getId() {
    const id = productData.find(product => product.itemId === currentPhone?.id);

    return id?.id;
  }

  const navigate = useNavigate();
  const location = useLocation();
  let currentLink = '';

  const crumbs = location.pathname
    .split('/')
    .filter(crumb => crumb !== '')
    .map(crumb => {
      currentLink += `/${crumb}`;

      return (
        <div className="crumb" key={crumb}>
          <Link className="crumb-link" to={currentLink}>
            {crumb}
          </Link>
        </div>
      );
    });

  return (
    <div className="desc-layout">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="productInfo-container">
          <div className="productInfo-h">
            <div className="productInfo-links-block">
              <div className="fav-link">
                <Link to="/" className="favIcon">
                  <img src="../uploadedImg/Home.png"></img>
                </Link>
                <div className="favIcon">
                  <img src="../uploadedImg/LeftArrow.png"></img>
                </div>
                <div className="margin-0">{crumbs[0]}</div>
                <div className="favIcon">
                  <img src="../uploadedImg/LeftArrow.png"></img>
                </div>
                <div className="margin-0">{crumbs[1]}</div>
              </div>
              <button className="bucket-link-btn" onClick={() => navigate(-1)}>
                <img
                  src="../uploadedImg/LeftBlackArrow.png"
                  className="close-img"
                ></img>
                <p className="bucket-link-p">Back</p>
              </button>
            </div>

            <h1 className="productInfo-h1">{currentPhone?.id}</h1>
          </div>
          <div className="productInfo-product">
            <div className="productInfo-pictures-block">
              <div className="productInfo-smallPictures-block">
                {currentPhone?.images.map(image => (
                  <button
                    className={
                      image === currentPicture
                        ? 'productInfo-smallPicture-active'
                        : 'productInfo-smallPicture'
                    }
                    key={image}
                    onClick={() => {
                      setCurrentPicture(image);
                    }}
                  >
                    <img className="product-picture" src={image}></img>
                  </button>
                ))}
              </div>
              <div className="selected-picture">
                <button className="productInfo-bigPicture">
                  <img
                    className="product-bigPicture"
                    src={currentPicture}
                  ></img>
                </button>
              </div>
            </div>
            <div className="product-info-rightBlock">
              <div className="product-colors-block">
                <p className="product-colors-p">Available colors</p>
                <div className="btns-block">
                  {currentPhone?.colorsAvailable.map(color => (
                    <button
                      className={
                        color === currentColor
                          ? 'product-circle-active'
                          : 'product-circle'
                      }
                      style={{ background: color }}
                      key={color}
                      onClick={() => setCurrentColor(color)}
                    ></button>
                  ))}
                </div>
              </div>
              <div className="gb-container">
                <p className="product-colors-p">Select capacity</p>
                <div className="gb-btns-block">
                  {currentPhone?.capacityAvailable.map(capacity => (
                    <button
                      className={
                        capacity === currentCapacity
                          ? 'gb-btns-active'
                          : 'gb-btns'
                      }
                      key={capacity}
                      onClick={() => setCurrentCapacity(capacity)}
                    >
                      {capacity}
                    </button>
                  ))}
                </div>
              </div>
              <div className="add-to-card-block">
                <div className="p-block">
                  <p className="currentPrice">{`$${currentPhone?.priceDiscount}`}</p>
                  <p className="fullPrice">{`$${currentPhone?.priceRegular}`}</p>
                </div>
                <div className="buttons-block">
                  {bucketItems.find(
                    item => item.item.id === currentPhone?.id,
                  ) ? (
                    // eslint-disable-next-line @typescript-eslint/indent
                    <button className="Added-btn-big">Added</button>
                  ) : (
                    // eslint-disable-next-line @typescript-eslint/indent
                    <button className="Add-btn-big" onClick={addPhone}>
                      Add to card
                      </button>
                    // eslint-disable-next-line @typescript-eslint/indent
                  )}
                  <button className="fav-btn-big" onClick={addFav}>
                    {favItems.find(item => item.id === currentPhone?.id) ? (
                      <img src="./uploadedImg/Fav.png" className="cursor"></img>
                    ) : (
                      <img
                        src="./uploadedImg/like-btn.png"
                        className="cursor"
                      ></img>
                    )}
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
              <p className="product-id-p">{`ID: ${getId()}`}</p>
            </div>
          </div>
          <div className="productInfo-info">
            <div className="productInfo-left-block">
              <h1 className="productInfo-left-block-h1">About</h1>
              {currentPhone?.description.map(desc => (
                <div className="productInfo-desc-block" key={desc.title}>
                  <h2 className="productInfo-desc-h2">{desc.title}</h2>
                  <p className="productInfo-desc-p">{desc.text}</p>
                </div>
              ))}
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
                  <p className="rightText-desc">
                    12 Mp + 12 Mp + 12 Mp (Triple)
                  </p>
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
              {sortedByYears?.map(sortedByYear => (
                <Card phone={sortedByYear} key={sortedByYear.id} />
              ))}
            </Carousel>
          </div>
          <Outlet />
        </div>
      )}
    </div>
  );
};
