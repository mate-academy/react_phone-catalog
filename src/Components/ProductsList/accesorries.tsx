import '../../styles/phones.scss';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export interface NewModel {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

interface Props {
  cart?: NewModel[];
  addingObjCart: (product: NewModel) => void;
  array?: NewModel[];
  setsmth?: (product: NewModel) => void;
  addingObj: (FavouritesA: NewModel) => void;
  FavouritesA: NewModel[];
}

export const Accessories: React.FC<Props> = ({
  cart = [],
  addingObjCart,
  array = [],
  setsmth,
  addingObj,
  FavouritesA,
}) => {
  const [sortBy, setSortBy] = useState('');
  const [size, setSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [Chuslo, setChuslo] = useState(0);

  const phoneProducts = array.filter(cobj => cobj.category === 'accessories');

  const navigate = useNavigate();

  const filteredArray = [...phoneProducts].sort((a, b) => {
    switch (sortBy) {
      case 'age':
        return b.year - a.year;
      case 'title':
        return a.name.localeCompare(b.name);
      case 'age__o':
        return a.year - b.year;
      case 'price':
        return a.price - b.price;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(filteredArray.length / size) || 1;

  const startIndex = (currentPage - 1) * size;
  const endIndex = startIndex + size;
  const visiblePhones = filteredArray.slice(startIndex, endIndex);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePagetext = () => {
    setChuslo(prev => Math.max(0, prev - 4));
  };

  const anotherfunction = () => {
    if (Chuslo + 4 < pageNumbers.length) {
      setChuslo(prev => prev + 4);
    }
  };

  const handlePageSelect = (page: number) => {
    setCurrentPage(page);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(Number(e.target.value));
    setCurrentPage(1);
    setChuslo(0);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handleProductClick = (product: NewModel) => {
    if (setsmth) {
      setsmth(product);
    }

    navigate('/product');
  };

  return (
    <div className="phones-page">
      <div className="rootline">
        <Link to="/">
          <img src="/img/Home.svg" alt="Home" />
        </Link>
        <p className="root__arrow"></p>
        <p className="root__thing">Accessories</p>
      </div>

      <h1 className="Mobile__phones">Accessories</h1>
      <p className="count">{phoneProducts.length} models</p>

      <div className="Filters__other">
        <div className="sort-block">
          <label htmlFor="sort-by" className="sort-block__label">
            Sort by
          </label>

          <select
            id="sort-by"
            value={sortBy}
            onChange={handleSortChange}
            className="sort-block__select"
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
            <option value="age__o">Oldest</option>
          </select>
        </div>

        <div className="sort-block">
          <label htmlFor="items-per-page" className="sort-block__label">
            Items on page
          </label>

          <select
            id="items-per-page"
            value={size}
            onChange={handleSizeChange}
            className="sort-block__select"
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value={filteredArray.length || 4}>All</option>
          </select>
        </div>
      </div>

      <div className="Phones__List">
        {visiblePhones.map(obj => {
          const isFavorite = FavouritesA.some(cobj => cobj.id === obj.id);
          const inCart = cart.some(cobj => cobj.id === obj.id);

          return (
            <Link
              key={obj.id}
              className="Brand__new__phone"
              to={`/${obj.category}/${obj.itemId}`}
              onClick={() => handleProductClick(obj)}
            >
              <img
                className="Brand__new__phone__image"
                src={obj.image}
                alt={obj.itemId}
              />

              <p className="Brand__new__phone__title">{obj.name}</p>

              <div className="Price">
                <span className="this__Price">${obj.price}</span>
                <span className="Price__without__Discount">
                  ${obj.fullPrice}
                </span>
              </div>

              <div className="phone__Line"></div>

              <ul className="charasteristics">
                <li className="each">
                  <span className="part__of__List">Screen</span>
                  <span className="part__of__char">{obj.screen}</span>
                </li>
                <li className="each">
                  <span className="part__of__List">Capacity</span>
                  <span className="part__of__char">{obj.capacity}</span>
                </li>
                <li className="each">
                  <span className="part__of__List">RAM</span>
                  <span className="part__of__char">{obj.ram}</span>
                </li>
              </ul>

              <div className="contract__buttons">
                <button
                  type="button"
                  className={inCart ? 'Added__to__Cart' : 'Add__to__cart'}
                  onClick={e => {
                    e.stopPropagation();
                    addingObjCart(obj);
                  }}
                >
                  {inCart ? 'Added to cart' : 'Add to cart'}
                </button>

                <button
                  type="button"
                  className="heart"
                  aria-label="Add to favorites"
                  onClick={e => {
                    e.stopPropagation();
                    addingObj(obj);
                  }}
                >
                  {isFavorite ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="#EB5757"
                    >
                      <path
                        /* eslint-disable-next-line */
                        d="M8 13.5L2.5 8C1 6.5 1 4 2.5 2.5C4 1 6.5 1 8 3C9.5 1 12 1 13.5 2.5C15 4 15 6.5 13.5 8L8 13.5Z"
                        stroke="#EB5757"
                        strokeWidth="1.5"
                      />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        /* eslint-disable-next-line */
                        d="M8 13.5L2.5 8C1 6.5 1 4 2.5 2.5C4 1 6.5 1 8 3C9.5 1 12 1 13.5 2.5C15 4 15 6.5 13.5 8L8 13.5Z"
                        stroke="#313237"
                        strokeWidth="1.5"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </Link>
          );
        })}
      </div>

      {size !== filteredArray.length && totalPages > 1 && (
        <div className="this__buttons">
          <button
            className="button__this"
            onClick={() => {
              handlePagetext();
            }}
            disabled={Chuslo === 0}
          >
            {'<'}
          </button>

          {Chuslo !== 0 ? (
            <button className="button__this" onClick={() => setChuslo(0)}>
              ...
            </button>
          ) : null}

          {pageNumbers.slice(Chuslo, Chuslo + 4).map(page => (
            <button
              key={page}
              className={`button__this ${page === currentPage ? 'is-active' : ''}`}
              onClick={() => handlePageSelect(page)}
            >
              {page}
            </button>
          ))}

          {Chuslo + 4 < totalPages && (
            <button
              className="button__this"
              onClick={() => {
                anotherfunction();
              }}
            >
              ...
            </button>
          )}

          <button
            className="button__this"
            onClick={() => {
              anotherfunction();
            }}
            disabled={Chuslo + 4 >= totalPages}
          >
            {'>'}
          </button>
        </div>
      )}
    </div>
  );
};
