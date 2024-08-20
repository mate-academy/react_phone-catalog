import homeIcon from '../../imgs/Home.svg';
import arrowRight from '../../imgs/Chevron (Arrow Right).svg';
import './PhonesPage.scss';
import products from '../../api/products.json';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const PhonesPage: React.FC = () => {
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [selectedItemSort, setSelectedItemSort] = useState('None');
  const [isOpenItems, setIsOpenItems] = useState(false);
  const [selectedItemItems, setSelectedItemItems] = useState('None');

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const optionsSort = ['Newest', 'Oldest', 'Expensive', 'Cheap'];
  const optionsItems = ['5', '10', '15', '20'];
  const toggleDropdownSort = () => setIsOpenSort(!isOpenSort);
  const toggleDropdownItems = () => setIsOpenItems(!isOpenItems);
  const handleOptionSort = (option: string) => {
    setSelectedItemSort(option);
    setIsOpenSort(false);
  };

  const handleOptionItems = (option: string) => {
    setSelectedItemItems(option);
    setIsOpenItems(false);
  };

  const availabePhones = products.filter(
    product => product.category === 'phones',
  ).length;
  const phones = products.filter(
    product => product.category === 'phones' && product.year === 2022,
  );

  return (
    <section className="phones">
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
          </div>

          <div className="phones_title">
            <p className="phones_title_text">Mobile phones</p>
            <p className="phones_title_items">{`${availabePhones} models`}</p>
          </div>

          <div className="filter">
            <div className="filter_container">
              <div className="filter_sortBy">
                <p className="filter_sortBy_title">Sort by</p>
                <div className="dropdown">
                  <button
                    onClick={toggleDropdownSort}
                    className="dropdown_button"
                  >
                    {selectedItemSort}
                    <img
                      src={arrowRight}
                      alt="arrow"
                      style={{
                        transform: `rotate(${isOpenSort ? 90 : 270}deg)`,
                        transition: 'transform 0.5s ease-in-out',
                      }}
                    />
                  </button>
                  {isOpenSort && (
                    <ul className="dropdown_menu">
                      {optionsSort.map((option, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            handleOptionSort(option);
                          }}
                          className="dropdown_menu_item"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="onPage">
                <p className="filter_onPage_title">Items on Page</p>
                <div className="dropdown">
                  <button
                    onClick={toggleDropdownItems}
                    className="dropdown_button dropdown_button--onPage"
                  >
                    {selectedItemItems}
                    <img
                      src={arrowRight}
                      alt="arrow"
                      style={{
                        transform: `rotate(${isOpenItems ? 90 : 270}deg)`,
                        transition: 'transform 0.5s ease-in-out',
                      }}
                    />
                  </button>
                  {isOpenItems && (
                    <ul className="dropdown_menu">
                      {optionsItems.map((option, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            handleOptionItems(option);
                          }}
                          className="dropdown_menu_item"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="phones_catalog">
            <div className="phones_catalog_container">
              {phones.map((phone, index) => (
                <Link
                  to={`/phones/${phone.itemId}`}
                  className="productCard"
                  key={index}
                  onClick={scrollTop}
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
