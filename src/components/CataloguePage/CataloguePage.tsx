import homeIcon from '../../imgs/Home.svg';
import arrowRight from '../../imgs/Chevron (Arrow Right).svg';
import './CataloguePage.scss';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { utils } from '../../utils/generalFunctions';
import heartEmpty from '../../imgs/Favourites.svg';
import heartFull from '../../imgs/Favourites Filled.svg';

export const CataloguePage: React.FC = () => {
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [selectedItemSort, setSelectedItemSort] = useState('None');
  const [isOpenItems, setIsOpenItems] = useState(false);
  const [selectedItemItems, setSelectedItemItems] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const { category } = useParams();

  const scrollTop = () => {
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const optionsSort = ['None', 'Newest', 'Oldest', 'Expensive', 'Cheap'];
  const normalizeOptionSort = optionsSort.filter(
    opt => opt !== selectedItemSort,
  );
  const optionsItems = [5, 10, 15, 20];
  const normalizeOptionsItems = optionsItems.filter(
    opt => opt !== selectedItemItems,
  );
  const toggleDropdownSort = () => setIsOpenSort(!isOpenSort);
  const toggleDropdownItems = () => setIsOpenItems(!isOpenItems);
  const handleOptionSort = (option: string) => {
    setSelectedItemSort(option);
    setIsOpenSort(false);
  };

  const handleOptionItems = (option: number) => {
    setSelectedItemItems(option);
    setIsOpenItems(false);
  };

  // const availabePhones = products.filter(
  //   product => product.category === 'phones',
  // ).length;

  // const phones = products.filter(
  //   product => product.category === 'phones'
  // );

  const items = utils.findProduct(category);
  const itemsCount = items.length;

  const totalPages = Math.ceil(items.length / selectedItemItems);

  const filterSortBy = (option: string) => {
    switch (option) {
      case 'Newest':
        return items.sort((a, b) => b.year - a.year);
      case 'Oldest':
        return items.sort((a, b) => a.year - b.year);
      case 'Expensive':
        return items.sort((a, b) => b.price - a.price);
      case 'Cheap':
        return items.sort((a, b) => a.price - b.price);
      default:
        return items;
    }
  };

  const sortedProduct = filterSortBy(selectedItemSort);

  const renderedItems = sortedProduct.slice(
    (currentPage - 1) * selectedItemItems,
    currentPage * selectedItemItems,
  );

  const handlePageChange = (pageNumber: number) => {
    scrollTop();
    setCurrentPage(pageNumber);
  };

  const handlePagePrevious = () => {
    scrollTop();
    setCurrentPage(currentPage - 1);
  };

  const handlePageNext = () => {
    scrollTop();
    setCurrentPage(currentPage + 1);
  };

  const cardItems = utils.getFromStorage('card');
  const likedItems = utils.getFromStorage('liked');
  const [state, setState] = useState(false);

  const handleButtonCard = (id: string) => {
    if (cardItems.filter((cardId: string) => cardId === id).length === 1) {
      setState(!state);

      return utils.removedFromCard(id);
    }

    setState(!state);

    return utils.addToCart(id);
  };

  const handleButtonHeart = (id: string) => {
    if (likedItems.filter((likedId: string) => likedId === id).length === 1) {
      setState(!state);

      return utils.removedFromLiked(id);
    }

    setState(!state);

    return utils.addToLiked(id);
  };

  const isLiked = (id: string) => {
    return likedItems.filter((likedId: string) => likedId === id).length === 1;
  };

  const inCard = (id: string) => {
    return cardItems.filter((cardId: string) => cardId === id).length === 1;
  };

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
            <p className="homeHistory_text">{category}</p>
          </div>

          <div className="phones_title">
            <p className="phones_title_text">{category}</p>
            <p className="phones_title_items">{`${itemsCount} models`}</p>
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
                      {normalizeOptionSort.map((option, index) => (
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
                      {normalizeOptionsItems.map((option, index) => (
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
              {renderedItems.map((phone, index) => (
                <div className="productCard" key={index}>
                  <div className="productCard_container">
                    <Link
                      to={`/${category}/${phone.itemId}`}
                      className="productCard_container_link"
                      onClick={scrollTop}
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
                        <p className="productCard_price">{`$${phone.price}`}</p>
                        <p className="productCard_fullPrice">{`$${phone.fullPrice}`}</p>
                      </div>

                      <div className="productCard_info">
                        <div className="productCard_info_screen">
                          <p className="productCard_info_title">Screen</p>
                          <p className="productCard_info_text">
                            {phone.screen}
                          </p>
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
                    </Link>
                    <div className="productCard_buttons">
                      <button
                        className="productCard_buttons_add"
                        onClick={() => handleButtonCard(phone.itemId)}
                        style={{
                          backgroundColor: `${inCard(phone.itemId) ? '#FAFBFC' : '#216CFF'}`,
                          color: `${inCard(phone.itemId) ? '#216CFF' : '#FAFBFC'}`,
                          border: `${inCard(phone.itemId) ? '1px solid #E2E6E9' : 'none'}`,
                        }}
                      >
                        {`${inCard(phone.itemId) ? 'Added to Card' : 'Add to Card'}`}
                      </button>
                      <button
                        className="productCard_buttons_heart"
                        onClick={() => handleButtonHeart(phone.itemId)}
                        style={{
                          backgroundImage: `${isLiked(phone.itemId) ? `url('${heartFull}` : `url('${heartEmpty}`}')`,
                        }}
                      ></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="phones_buttons">
            <div className="phones_buttons_cont">
              <button
                className="phones_buttons_button phones_buttons_button--left"
                onClick={handlePagePrevious}
                disabled={currentPage === 1}
              ></button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`phones_buttons_button${i + 1 === currentPage ? '--active' : ''}`}
                  onClick={() => {
                    handlePageChange(i + 1);
                  }}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="phones_buttons_button phones_buttons_button--right"
                onClick={handlePageNext}
                disabled={currentPage === totalPages}
              ></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
