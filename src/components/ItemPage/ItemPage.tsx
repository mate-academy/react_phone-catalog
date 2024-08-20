import homeIcon from '../../imgs/Home.svg';
import './ItemPage.scss';
import arrowRight from '../../imgs/Chevron (Arrow Right).svg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import phones from '../../api/phones.json';
import tablets from '../../api/tablets.json';
import accessories from '../../api/accessories.json';
import { useEffect, useState } from 'react';
import { handleButton, utils } from '../../utils/generalFunctions';

export const ItemPage: React.FC = () => {
  const [activeImg, setActiveImg] = useState(0);
  const { itemName } = useParams();
  const [category, setCategory] = useState(
    itemName ? itemName.split('-')[1] : '',
  );

  const getItem = (currentCategory: string | undefined) => {
    switch (currentCategory) {
      case 'iphone':
        setCategory('phones');

        return phones.filter(item => item.id === itemName);
      case 'ipad':
        setCategory('tablets');

        return tablets.filter(item => item.id === itemName);
      case 'watch':
        setCategory('accessories');

        return accessories.filter(item => item.id === itemName);
      default:
        return phones.filter(item => item.id === itemName);
    }
  };

  const [item] = getItem(category);
  const colors = item.colorsAvailable;
  const capacities = item.capacityAvailable;

  const [activeItem, setActiveItem] = useState(item);
  const [activeColor, setActiveColor] = useState(item.color);
  const [activeCapacity, setActiveCapacity] = useState(item.capacity);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveItem(item);
    setActiveColor(item.color);
    setActiveCapacity(item.capacity);
  }, [item, itemName]);

  const handleColor = (color: string) => {
    setActiveColor(color);
    const [newActive] = phones.filter(
      product =>
        product.color === color &&
        product.capacity === activeCapacity &&
        product.namespaceId === activeItem.namespaceId,
    );

    navigate(`/${category}/${newActive.id}`);
  };

  const handleCapacity = (capacity: string) => {
    setActiveCapacity(capacity);
    const [newActive] = phones.filter(
      product =>
        product.color === activeColor &&
        product.capacity === capacity &&
        product.namespaceId === activeItem.namespaceId,
    );

    navigate(`/${category}/${newActive.id}`);
    setActiveItem(newActive);
  };

  const phonesSale = utils.findSale('phones');

  const prevLike = () => {
    setCurrentIndex(handleButton.previous(currentIndex, phonesSale));
  };

  const nextLike = () => {
    setCurrentIndex(handleButton.next(currentIndex, phonesSale));
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
            <p className="homeHistory_text">Phones</p>
            <img
              src={arrowRight}
              alt="arrowRight"
              className="homeHistory_arrow"
            />
            <p className="homeHistory_text">{activeItem.name}</p>
          </div>
          <p className="item_title">{activeItem.name}</p>
          <div className="item_imgBox">
            <div className="item_imgBox_innerBox">
              {activeItem.images.map((image, index) => (
                <div
                  className="item_imgBox_innerBox_imgContainer"
                  key={index}
                  onClick={() => {
                    setActiveImg(index);
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

          <div className="item_activeImgContainer">
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
                          backgroundColor: `light${color}`,
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
                <button className="item_data_buttons_add">Add to card</button>
                <button className="item_data_buttons_heart"></button>
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
            {/* <div className="item_tech_container">
              <p className="item_tech_container_title">Camera</p>
              <p className="item_tech_container_text">{item.camera}</p>
            </div>
            <div className="item_tech_container">
              <p className="item_tech_container_title">Zoom</p>
              <p className="item_tech_container_text">{item.zoom}</p>
            </div> */}
            <div className="item_tech_container">
              <p className="item_tech_container_title">Cell</p>
              <p className="item_tech_container_text">{item.cell}</p>
            </div>
          </div>

          <div className="item_alsoLike">
            <div className="item_alsoLike_container1">
              <h2 className="item_alsoLike_title">You may also like</h2>
              <div className="item_alsoLike_container1_buttons">
                <button
                  className="item_alsoLike_container1_buttons_left"
                  onClick={prevLike}
                  disabled={currentIndex === 0}
                >
                  &#10094;
                </button>
                <button
                  className="item_alsoLike_container1_buttons_right"
                  onClick={nextLike}
                  disabled={phonesSale.length - currentIndex === 4}
                >
                  &#10095;
                </button>
              </div>
            </div>
            <div className="item_alsoLike_container2">
              {phonesSale.map((phone, index) => (
                <Link
                  to={`/phones/${phone.itemId}`}
                  className="productCard"
                  key={index}
                  onClick={handleButton.scrollTop}
                  style={{
                    transform: `translateX(-${currentIndex * 105}%)`,
                    transition: 'transform 0.5s ease-in-out',
                  }}
                >
                  <div className="productCard_container">
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
                        <p className="productCard_info_text">
                          {phone.capacity}
                        </p>
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
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
