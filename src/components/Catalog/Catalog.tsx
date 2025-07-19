import { useContext, useEffect, useState } from 'react';
import './Catalog.scss';
import { ProductsContext } from '../../context/ProductContext';
import classNames from 'classnames';
import ReactPaginate from 'react-paginate';

export const Catalog = () => {
  const { phones, products } = useContext(ProductsContext);
  const [itemPerPage, setItemPerPage] = useState('16');
  const [typeSort, setTypeSort] = useState('Newest');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isItemsOpen, setIsItemsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const getSortedPhones = () => {
    const sorted = [...phones];

    if (typeSort === 'Newest') {
      return sorted.sort((a, b) => {
        const prodA = products.find(val => val.itemId === a.id);
        const prodB = products.find(val => val.itemId === b.id);

        return (prodB?.year || 0) - (prodA?.year || 0);
      });
    }

    if (typeSort === 'Alphabetically') {
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (typeSort === 'Cheapest') {
      return sorted.sort((a, b) => a.priceDiscount - b.priceDiscount);
    }

    return sorted;
  };

  const sortedPhones = getSortedPhones();

  const itemsPerPageNum = itemPerPage === 'all' ? phones.length : +itemPerPage;
  const pageCount =
    itemPerPage === 'all' ? 1 : Math.ceil(phones.length / itemsPerPageNum);
  const startIndex = currentPage * itemsPerPageNum;
  const endIndex = startIndex + itemsPerPageNum;
  const visiblePhones = sortedPhones.slice(startIndex, endIndex);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [itemPerPage, typeSort]);

  return (
    <main className="catalog">
      <div className="navigation">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            // eslint-disable-next-line max-len
            d="M7.59038 0.807088C7.83112 0.619846 8.16823 0.619846 8.40897 0.807088L14.409 5.47375C14.5714 5.60006 14.6663 5.79426 14.6663 5.99999V13.3333C14.6663 13.8638 14.4556 14.3725 14.0806 14.7475C13.7055 15.1226 13.1968 15.3333 12.6663 15.3333H3.33301C2.80257 15.3333 2.29387 15.1226 1.91879 14.7475C1.54372 14.3725 1.33301 13.8638 1.33301 13.3333V5.99999C1.33301 5.79426 1.42799 5.60006 1.59038 5.47375L7.59038 0.807088ZM2.66634 6.32605V13.3333C2.66634 13.5101 2.73658 13.6797 2.8616 13.8047C2.98663 13.9298 3.1562 14 3.33301 14H12.6663C12.8432 14 13.0127 13.9298 13.1377 13.8047C13.2628 13.6797 13.333 13.5101 13.333 13.3333V6.32605L7.99967 2.1779L2.66634 6.32605Z"
            fill="#F1F2F9"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            // eslint-disable-next-line max-len
            d="M5.33301 8.00001C5.33301 7.63182 5.63148 7.33334 5.99967 7.33334H9.99967C10.3679 7.33334 10.6663 7.63182 10.6663 8.00001V14.6667C10.6663 15.0349 10.3679 15.3333 9.99967 15.3333C9.63148 15.3333 9.33301 15.0349 9.33301 14.6667V8.66668H6.66634V14.6667C6.66634 15.0349 6.36786 15.3333 5.99967 15.3333C5.63148 15.3333 5.33301 15.0349 5.33301 14.6667V8.00001Z"
            fill="#F1F2F9"
          />
        </svg>
        <svg
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            // eslint-disable-next-line max-len
            d="M0.528758 0.528606C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606L5.47157 4.52861C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141L1.47157 9.47141C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861L4.05735 5.00001L0.528758 1.47141C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z"
            fill="#4A4D58"
          />
        </svg>
        <a className="navigation__link" href="#">
          Phones
        </a>
      </div>
      <div className="header">
        <h1 className="header__title">Phones</h1>
        <p className="header__counts">95 models</p>
      </div>
      <div className="sorter">
        <div className="dropdown-container">
          <p className="dropdown-container-text">Sort by</p>
          <div>
            <div
              className={classNames('dropdown-header', { active: isSortOpen })}
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              <span id="selected-text">{typeSort}</span>
              <svg
                className="dropdown-arrow"
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  // eslint-disable-next-line max-len
                  d="M9.47124 0.528636C9.73159 0.788986 9.73159 1.2111 9.47124 1.47145L5.47124 5.47144C5.21089 5.73179 4.78878 5.73179 4.52843 5.47144L0.528433 1.47144C0.268083 1.2111 0.268083 0.788985 0.528433 0.528636C0.788782 0.268286 1.21089 0.268286 1.47124 0.528636L4.99984 4.05723L8.52843 0.528636C8.78878 0.268287 9.21089 0.268287 9.47124 0.528636Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div
              className={classNames('dropdown-list', { active: isSortOpen })}
              id="dropdown-list"
            >
              <div
                className={classNames('dropdown-item', {
                  selected: typeSort === 'Newest',
                })}
                onClick={() => {
                  setTypeSort('Newest');
                  setIsSortOpen(false);
                }}
              >
                Newest
              </div>
              <div
                className={classNames('dropdown-item', {
                  selected: typeSort === 'Alphabetically',
                })}
                onClick={() => {
                  setTypeSort('Alphabetically');
                  setIsSortOpen(false);
                }}
              >
                Alphabetically
              </div>
              <div
                className={classNames('dropdown-item', {
                  selected: typeSort === 'Cheapest',
                })}
                onClick={() => {
                  setTypeSort('Cheapest');
                  setIsSortOpen(false);
                }}
              >
                Cheapest
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown-container">
          <p className="dropdown-container-text">Items on page</p>
          <div>
            <div
              className={classNames('dropdown-header', { active: isItemsOpen })}
              onClick={() => setIsItemsOpen(!isItemsOpen)}
            >
              <span id="selected-text">{itemPerPage}</span>
              <svg
                className="dropdown-arrow"
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  // eslint-disable-next-line max-len
                  d="M9.47124 0.528636C9.73159 0.788986 9.73159 1.2111 9.47124 1.47145L5.47124 5.47144C5.21089 5.73179 4.78878 5.73179 4.52843 5.47144L0.528433 1.47144C0.268083 1.2111 0.268083 0.788985 0.528433 0.528636C0.788782 0.268286 1.21089 0.268286 1.47124 0.528636L4.99984 4.05723L8.52843 0.528636C8.78878 0.268287 9.21089 0.268287 9.47124 0.528636Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div
              className={classNames('dropdown-list', { active: isItemsOpen })}
              id="dropdown-list"
            >
              <div
                className={classNames('dropdown-item', {
                  selected: itemPerPage === '4',
                })}
                onClick={() => {
                  setItemPerPage('4');
                  setIsItemsOpen(false);
                }}
              >
                4
              </div>
              <div
                className={classNames('dropdown-item', {
                  selected: itemPerPage === '8',
                })}
                onClick={() => {
                  setItemPerPage('8');
                  setIsItemsOpen(false);
                }}
              >
                8
              </div>
              <div
                className={classNames('dropdown-item', {
                  selected: itemPerPage === '16',
                })}
                onClick={() => {
                  setItemPerPage('16');
                  setIsItemsOpen(false);
                }}
              >
                16
              </div>
              <div
                className={classNames('dropdown-item', {
                  selected: itemPerPage === 'all',
                })}
                onClick={() => {
                  setItemPerPage('all');
                  setIsItemsOpen(false);
                }}
              >
                all
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="list">
        {visiblePhones.map(item => {
          return (
            <div className="card" key={item.id}>
              <img
                className="card__image"
                src={item.images[0]}
                alt={item.name}
              />
              <p className="card__name">{item.name}</p>

              <div className="card__prices">
                <p className="card__price--discount">${item.priceDiscount}</p>
                <p className="card__price--regular">${item.priceRegular}</p>
              </div>

              <div className="card__spec">
                <p className="card__label">Screen</p>
                <p className="card__value">{item.screen}</p>
              </div>
              <div className="card__spec">
                <p className="card__label">Capacity</p>
                <p className="card__value">{item.capacity}</p>
              </div>
              <div className="card__spec">
                <p className="card__label">RAM</p>
                <p className="card__value">{item.ram}</p>
              </div>

              <div className="card__actions">
                <button className="card__button--add">Add to cart</button>
                <button className="card__button--like">
                  <img src="./icons/like.svg" alt="like" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          pageCount={pageCount}
          onPageChange={handlePageClick}
          marginPagesDisplayed={0}
          pageRangeDisplayed={4}
          containerClassName="pagination"
          activeClassName="active"
          breakLabel={null}
          forcePage={currentPage}
        />
      )}
    </main>
  );
};
