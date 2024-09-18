import homeIcon from '../../imgs/Home.svg';
import arrowRight from '../../imgs/Chevron (Arrow Right).svg';
import './CataloguePage.scss';
import { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { handleButton, utils } from '../../utils/generalFunctions';
import heartEmpty from '../../imgs/Favourites.svg';
import heartFull from '../../imgs/Favourites Filled.svg';
import { LikedIdContext } from '../../utils/context';

export const CataloguePage: React.FC = () => {
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [selectedItemSort, setSelectedItemSort] = useState('None');
  const [isOpenItems, setIsOpenItems] = useState(false);
  const [selectedItemItems, setSelectedItemItems] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const { category } = useParams();
  const {
    addLikedId,
    removeLikedId,
    addCardId,
    removeCardId,
    likedIds,
    cardIds,
  } = useContext(LikedIdContext);

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
    handleButton.scrollTop();
    setCurrentPage(pageNumber);
  };

  const handlePagePrevious = () => {
    handleButton.scrollTop();
    setCurrentPage(currentPage - 1);
  };

  const handlePageNext = () => {
    handleButton.scrollTop();
    setCurrentPage(currentPage + 1);
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

  const isLiked = (id: string) => {
    return likedIds.filter((likedId: string) => likedId === id).length === 1;
  };

  const inCard = (id: string) => {
    return cardIds.filter((cardId: string) => cardId === id).length === 1;
  };

  const pagesToShow = 5;
  const halfPagesToShow = Math.floor(pagesToShow / 2);
  const calculateStartPage = () => {
    let startPage = Math.max(1, currentPage - halfPagesToShow);

    if (startPage + pagesToShow - 1 > totalPages) {
      startPage = Math.max(1, totalPages - pagesToShow + 1);
    }

    return startPage;
  };

  const currentStartPage = calculateStartPage();

  const visiblePages = Array.from(
    { length: Math.min(pagesToShow, totalPages - currentPage + 1) },
    (_, i) => currentStartPage + i,
  );

  return (
    <section className="items">
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

          <div className="items_title">
            <p className="items_title_text">{category}</p>
            <p className="items_title_items">{`${itemsCount} models`}</p>
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

          <div className="items_catalog">
            <div className="items_catalog_container">
              {renderedItems.map((item, index) => (
                <div className="productCard" key={index}>
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
          <div className="items_buttons">
            <div className="items_buttons_cont">
              <button
                className="items_buttons_button items_buttons_button--left"
                onClick={handlePagePrevious}
                disabled={currentPage === 1}
              ></button>
              {visiblePages.map(page => (
                <button
                  key={page}
                  className={`items_buttons_button${page === currentPage ? '--active' : ''
                    }`}
                  onClick={() => {
                    handlePageChange(page);
                  }}
                >
                  {page}
                </button>
              ))}
              <button
                className="items_buttons_button items_buttons_button--right"
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
