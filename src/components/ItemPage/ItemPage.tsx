import homeIcon from '../../imgs/Home.svg';
import './ItemPage.scss';
import arrowRight from '../../imgs/Chevron (Arrow Right).svg';
import arrowLeft from '../../imgs/ArrowLeft.svg';
import heartEmpty from '../../imgs/Favourites.svg';
import heartFull from '../../imgs/Favourites Filled.svg';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import phones from '../../api/phones.json';
import tablets from '../../api/tablets.json';
import accessories from '../../api/accessories.json';
import { useContext, useEffect, useRef, useState } from 'react';
import { handleButton, utils } from '../../utils/generalFunctions';
import { LikedIdContext } from '../../utils/context';

type Item = {
  id: string;
  camera?: string;
  capacity: string;
  capacityAvailable: string[];
  category: string;
  cell: string[];
  color: string;
  colorsAvailable: string[];
  description: { title: string; text: string[] }[];
  images: string[];
  name: string;
  namespaceId: string;
  priceDiscount: number;
  priceRegular: number;
  processor: string;
  ram: string;
  resolution: string;
  screen: string;
  zoom?: string;
};

export const ItemPage: React.FC = () => {
  const [activeImg, setActiveImg] = useState(0);
  const { itemName } = useParams();
  const location = useLocation();
  const category = location.pathname.split('/')[1];

  const getCurrentProduct = (category: string) => {
    if (category === 'phones') {
      return phones;
    }

    if (category === 'tablets') {
      return tablets;
    }

    return accessories;
  };

  const currentProduct = getCurrentProduct(category);

  const getItem = (currentCategory: string): Item[] => {
    let obj: Item[] = [];

    switch (currentCategory) {
      case 'phones':
        obj = phones.filter(item => item.id === itemName);
        break;
      case 'tablets':
        obj = tablets.filter(item => item.id === itemName);
        break;
      case 'accessories':
        obj = accessories.filter(item => item.id === itemName);
        break;
      default:
        return [];
    }

    return obj;
  };

  const [item]: Item[] = getItem(category);
  const colors = item.colorsAvailable;
  const capacities = item.capacityAvailable;

  const [activeItem, setActiveItem] = useState(item);
  const [activeColor, setActiveColor] = useState(item.color);
  const [activeCapacity, setActiveCapacity] = useState(item.capacity);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const {
    addLikedId,
    removeLikedId,
    addCardId,
    removeCardId,
    cardIds,
    likedIds,
  } = useContext(LikedIdContext);

  const isLiked = (id: string) => {
    return likedIds.filter((likedId: string) => likedId === id).length === 1;
  };

  const inCard = (id: string) => {
    return cardIds.filter((cardId: string) => cardId === id).length === 1;
  };

  const card = inCard(activeItem.id);
  const liked = isLiked(activeItem.id);



  useEffect(() => {
    setActiveItem(item);
    setActiveColor(item.color);
    setActiveCapacity(item.capacity);
  }, [item, itemName, isLiked, inCard]);

  const handleColor = (color: string) => {
    setActiveColor(color);
    const [newActive] = currentProduct.filter(
      product =>
        product.color === color &&
        product.capacity === activeCapacity &&
        product.namespaceId === activeItem.namespaceId,
    );

    navigate(`/${category}/${newActive.id}`);
    setActiveItem(newActive);
  };

  const handleCapacity = (capacity: string) => {
    setActiveCapacity(capacity);
    const [newActive] = currentProduct.filter(
      product =>
        product.color === activeColor &&
        product.capacity === capacity &&
        product.namespaceId === activeItem.namespaceId,
    );

    navigate(`/${category}/${newActive.id}`);
    setActiveItem(newActive);
  };

  const alsoLike = utils.findSimilar(category, activeItem);

  const prevLike = () => {
    setCurrentIndex(handleButton.previous(currentIndex, alsoLike));
  };

  const nextLike = () => {
    setCurrentIndex(handleButton.next(currentIndex, alsoLike));
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

  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const touchDiff = touchStartX.current - touchEndX.current;

    if (touchDiff > 50) {
      const nextImg = activeImg === 4 ? 0 : activeImg + 1;

      console.log(nextImg);
      setActiveImg(+nextImg);
    } else if (touchDiff < -50) {
      const prevImg = activeImg === 0 ? 4 : activeImg - 1;

      console.log(prevImg);
      setActiveImg(+prevImg);
    }
  };

  return (
    <section className="item">
      <div className="container">
        <div className="grid">
          <div className="homeHistory">
            <img src={homeIcon} alt="homeIcon" className="homeHistory_img" />
            <img
              src={arrowRight}
              alt="arrowRight"
              className="homeHistory_arrow"
            />
            <p className="homeHistory_text">{category}</p>
            <img
              src={arrowRight}
              alt="arrowRight"
              className="homeHistory_arrow"
            />
            <p className="homeHistory_text homeHistory_text--extra">
              {activeItem.name}
            </p>
          </div>
          <Link to={`/${category}`} className="buttonBack">
            <img src={arrowLeft} alt="arrowLeft" className="buttonBack_arrow" />
            <p className="buttonBack_text">Back</p>
          </Link>

          <p className="item_title">{activeItem.name}</p>

          <div
            className="item_activeImgContainer item_activeImgContainer--phone"
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={activeItem.images[activeImg]}
              alt="activeImg"
              className="item_activeImgContainer_img"
            />
          </div>

          <div className="item_imgBox">
            <div className="item_imgBox_innerBox">
              {activeItem.images.map((image, index) => (
                <div
                  className="item_imgBox_innerBox_imgContainer"
                  key={index}
                  onClick={() => {
                    setActiveImg(index);
                  }}
                  style={{
                    border: ` 1px solid ${index === activeImg ? '#89939A' : '#E2E6E9'}`,
                  }}
                >
                  <img
                    src={image}
                    alt="img"
                    className="item_imgBox_innerBox_imgContainer_img"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="item_activeImgContainer item_activeImgContainer--tablet">
            <img
              src={activeItem.images[activeImg]}
              alt="activeImg"
              className="item_activeImgContainer_img"
            />
          </div>

          <div className="item_specs">
            <div className="item_colors">
              <div className="item_colors_container">
                <p className="item_colors_container_title">Available colors</p>
                <div className="item_colors_container_colors">
                  {colors.map((color, index) => (
                    <div
                      className="item_colors_container_colors_border"
                      key={index}
                      style={{
                        border: `2px solid ${activeColor === color ? '#0F0F11' : '#E2E6E9'}`,
                      }}
                    >
                      <button
                        style={{
                          backgroundColor: `${color}`,
                        }}
                        className="item_colors_container_colors_button"
                        onClick={() => {
                          handleColor(color);
                        }}
                      ></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="item_capacity">
              <p className="item_capacity_title">Select capacity</p>
              <div className="item_capacity_container">
                {capacities.map((capacity, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleCapacity(capacity);
                    }}
                    style={{
                      backgroundColor: `${activeCapacity === capacity ? '#0F0F11' : '#FAFBFC'}`,
                    }}
                    className="item_capacity_container_button"
                  >
                    <p
                      className="item_capacity_container_button_text"
                      style={{
                        color: `${activeCapacity === capacity ? '#fff' : '#0F0F11'}`,
                      }}
                    >
                      {capacity}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="item_data">
              <div className="item_data_prices">
                <p className="item_data_prices_sale">{`$${item.priceDiscount}`}</p>
                <p className="item_data_prices_full">{`$${item.priceRegular}`}</p>
              </div>

              <div className="item_data_buttons">
                <button
                  className="item_data_buttons_add"
                  onClick={() => handleButtonCard(activeItem.id)}
                  style={{
                    backgroundColor: `${card ? '#FAFBFC' : '#216CFF'}`,
                    color: `${card ? '#216CFF' : '#FAFBFC'}`,
                    border: `${card ? '1px solid #E2E6E9' : 'none'}`,
                  }}
                >{`${card ? 'Added to Card' : 'Add to Card'}`}</button>
                <button
                  className="item_data_buttons_heart"
                  onClick={() => handleButtonHeart(activeItem.id)}
                  style={{
                    backgroundImage: `${liked ? `url('${heartFull}` : `url('${heartEmpty}`}')`,
                  }}
                ></button>
              </div>

              <div className="item_data_info">
                <div className="item_data_info_box">
                  <p className="item_data_info_title">Screen</p>
                  <p className="item_data_info_text">{item.screen}</p>
                </div>
                <div className="item_data_info_box">
                  <p className="item_data_info_title">Resolution</p>
                  <p className="item_data_info_text">{item.resolution}</p>
                </div>
                <div className="item_data_info_box">
                  <p className="item_data_info_title">Processor</p>
                  <p className="item_data_info_text">{item.processor}</p>
                </div>
                <div className="item_data_info_box">
                  <p className="item_data_info_title">Ram</p>
                  <p className="item_data_info_text">{item.ram}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="item_about">
            <p className="item_about_title">About</p>
            <div className="item_about_articles">
              <p className="item_about_articles_title">
                {item.description[0].title}
              </p>
              <p className="item_about_articles_text">
                {item.description[0].text}
              </p>
            </div>
            <div className="item_about_articles">
              <p className="item_about_articles_title">
                {item.description[1].title}
              </p>
              <p className="item_about_articles_text">
                {item.description[1].text}
              </p>
            </div>
            <div className="item_about_articles item_about_articles--last">
              <p className="item_about_articles_title">
                {item.description[2].title}
              </p>
              <p className="item_about_articles_text">
                {item.description[2].text}
              </p>
            </div>
          </div>

          <div className="item_tech">
            <p className="item_tech_title">Tech specs</p>
            <div className="item_tech_container">
              <p className="item_tech_container_title">Screen</p>
              <p className="item_tech_container_text">{item.screen}</p>
            </div>
            <div className="item_tech_container">
              <p className="item_tech_container_title">Resolution</p>
              <p className="item_tech_container_text">{item.resolution}</p>
            </div>
            <div className="item_tech_container">
              <p className="item_tech_container_title">Processor</p>
              <p className="item_tech_container_text">{item.processor}</p>
            </div>
            <div className="item_tech_container">
              <p className="item_tech_container_title">RAM</p>
              <p className="item_tech_container_text">{item.ram}</p>
            </div>
            <div className="item_tech_container">
              <p className="item_tech_container_title">Built in memory</p>
              <p className="item_tech_container_text">{item.capacity}</p>
            </div>
            {item.camera && (
              <>
                <div className="item_tech_container">
                  <p className="item_tech_container_title">Camera</p>
                  <p className="item_tech_container_text">{item.camera}</p>
                </div>
                <div className="item_tech_container">
                  <p className="item_tech_container_title">Zoom</p>
                  <p className="item_tech_container_text">{item.zoom}</p>
                </div>
              </>
            )}
            <div className="item_tech_container">
              <p className="item_tech_container_title">Cell</p>
              <p className="item_tech_container_text">{item.cell}</p>
            </div>
          </div>

          <div className="itemSlider">
            <div className="itemSlider_container1">
              <h2 className="itemSlider_title">You may also like</h2>
              <div className="itemSlider_container1_buttons">
                <button
                  className="itemSlider_container1_buttons_left"
                  onClick={prevLike}
                  disabled={currentIndex === 0}
                >
                  &#10094;
                </button>
                <button
                  className="itemSlider_container1_buttons_right"
                  onClick={nextLike}
                  disabled={alsoLike.length - currentIndex === 4}
                >
                  &#10095;
                </button>
              </div>
            </div>
            <div className="itemSlider_container2">
              {alsoLike.map((item, index) => (
                <div
                  className="productCard"
                  key={index}
                  style={{
                    transform: `translateX(-${currentIndex * 105}%)`,
                    transition: 'transform 0.5s ease-in-out',
                  }}
                >
                  <div className="productCard_container">
                    <Link
                      to={`/${category}/${item.itemId}`}
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
                          backgroundImage: `${isLiked(item.itemId) ? `url('${heartFull}` : `url('${heartEmpty}`}')`,
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
