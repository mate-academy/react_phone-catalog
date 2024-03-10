import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from './Context';
import HomeWhite from '../img/Home-white.svg';
/* eslint-disable */

export const Tablets = () => {
  const { itemsOnPage, setItemsOnPage } = useAppContext();
  const [changeItemsOnPage, setChangeItemsOnPage] = useState<boolean>(false);
  const { sortParam, setSortParam } = useAppContext();
  const [changeSort, setChangeSort] = useState<boolean>(false);
  const [cartPhones, setCartPhones] = useState<string>('');
  const [
    prevCartPhonesArr,
    setPrevCartPhonesArr,
  ] = useState< string[] | undefined>();

  const { getPhone, setGetPhone } = useAppContext();
  const [errorMessage, setErrorMessage] = useState('');
  // eslint-disable-next-line max-len
  const url = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();

        setGetPhone(data);
      } catch (error) {
        setErrorMessage('Error during fetch:');
      }
    };

    fetchData();
  }, []);

  const blockItemsRef = useRef<HTMLDivElement>(null);
  const blockSortRef = useRef<HTMLDivElement>(null);

  const getTablets = getPhone?.filter(
    (product) => product.category === 'tablets',
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (blockItemsRef.current
          && !blockItemsRef.current.contains(event.target as Node)) {
        setChangeItemsOnPage(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        blockSortRef.current
        && !blockSortRef.current.contains(event.target as Node)
      ) {
        setChangeSort(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChangeItems = () => {
    if (!changeItemsOnPage) {
      setChangeItemsOnPage(true);
    } else {
      setChangeItemsOnPage(false);
    }
  };

  const handleChangeSort = () => {
    if (!changeSort) {
      setChangeSort(true);
    } else {
      setChangeSort(false);
    }
  };

  // const handleCart = (id:string) => {
  //   cartPhones.push(id);
  //   console.log(cartPhones);
  // }

  useEffect(() => {
    if (prevCartPhonesArr?.includes(cartPhones)) {
      setPrevCartPhonesArr(
        prevCartPhonesArr?.filter(
          phone => phone !== cartPhones,
        ),
      );
      setCartPhones('');
    } else {
      setPrevCartPhonesArr((prevCartPhonesArr
        ? [...prevCartPhonesArr, cartPhones]
        : [cartPhones]));
      setCartPhones('');
    }
  }, [cartPhones]);

  return (
    <section className="phones__wrapper">
      <div className="phones__content">
        <div className="phones__header">
          <h3 className="phones__header__title">Tablets</h3>
          <p className="phones__header__paragraph">{`${getTablets?.length} models`}</p>
          {!getTablets && !!errorMessage ? (
            <div className="phones__header__buttons">
              <div className="phones__header__buttons__sort" ref={blockSortRef}>
                <h5 className="phones__header__buttons__sort__title">
                  Sort by
                </h5>
                <button
                  type="button"
                  className="phones__header__buttons__sort__button"
                  onClick={handleChangeSort}
                >
                  <span className="phones__header__buttons__sort__button__text">
                    {sortParam}
                  </span>
                  {/* <img className="phones__header__buttons__sort__button__img"
                  src={changeSort ? ArrowUp : ArrowDown} alt="" /> */}
                </button>
                {changeSort
                  && (
                    <div
                      className="phones__header__buttons__sort__select"
                    >
                      <span
                        // eslint-disable-next-line
                        className="phones__header__buttons__sort__select__option"
                        onClick={() => {
                          setSortParam('Newest'); handleChangeSort();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setSortParam('Newest'); handleChangeSort();
                          }
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        Newest
                      </span>
                      <span
                        // eslint-disable-next-line
                        className="phones__header__buttons__sort__select__option"
                        onClick={() => {
                          setSortParam('Alphabetically'); handleChangeSort();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setSortParam('Alphabetically'); handleChangeSort();
                          }
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        Alphabetically
                      </span>
                      <span
                        // eslint-disable-next-line
                        className="phones__header__buttons__sort__select__option"
                        onClick={() => {
                          setSortParam('Cheapest'); handleChangeSort();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setSortParam('Cheapest'); handleChangeSort();
                          }
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        Cheapest
                      </span>
                    </div>
                  )}
              </div>
              <div
                className="phones__header__buttons__amount"
                ref={blockItemsRef}
              >
                <h5 className="phones__header__buttons__amount__title">
                  Items on page
                </h5>
                <button
                  type="button"
                  className="phones__header__buttons__amount__button"
                  onClick={handleChangeItems}
                >
                  <span
                    className="phones__header__buttons__amount__button__text"
                  >
                    {itemsOnPage}
                  </span>
                  {/* <img
                    className="phones__header__buttons__amount__button__img"
                    src={changeItemsOnPage ? ArrowUp : ArrowDown} alt="arrow" /> */}
                </button>
                {changeItemsOnPage
                  && (
                    <div className="phones__header__buttons__amount__select">
                      <span
                        className="phones__header__buttons__amount__select__option"
                        onClick={() => {
                          setItemsOnPage(4); handleChangeItems();
                        }}
                      >
                        4
                      </span>
                      <span
                        className="phones__header__buttons__amount__select__option"
                        onClick={() => {
                          setItemsOnPage(8); handleChangeItems();
                        }}
                      >
                        8
                      </span>
                      <span
                        className="phones__header__buttons__amount__select__option"
                        onClick={() => {
                          setItemsOnPage(16); handleChangeItems();
                        }}
                      >
                        16
                      </span>
                      <span
                        className="phones__header__buttons__amount__select__option"
                        onClick={() => {
                          setItemsOnPage(getPhone?.length); handleChangeItems();
                        }}
                      >
                        all
                      </span>
                    </div>
                  )}
              </div>
            </div>
          ) : (<div>
            <p className="phones__header__paragraph">
              Tablets NOT found
            </p>
            <NavLink to="/" className="phones__header__return-home">
              Return HOME page
              <img className="phones__header__return-home__img" src={HomeWhite} alt="building" />
            </NavLink>
          </div>)}
        </div>
        <div className="phones__goods">
          <div className="phones__goods__cards">
            {!!getTablets && getTablets.map((phone) => (
              <div className="hot-prices__goods__cards__good-card">
                <img
                  src={`https://mate-academy.github.io/react_phone-catalog/_new/${phone.image}`}
                  alt=""
                  className="hot-prices__goods__cards__good-card__img"
                />
                <div className="hot-prices__goods__cards__good-card__header">
                  <h4 className="hot-prices__goods__cards__good-card__header__name">
                    {phone.name}
                  </h4>
                  <div className="hot-prices__goods__cards__good-card__header__prace">
                    <p className="hot-prices__goods__cards__good-card__header__prace__new">
                      {`$${phone.price}`}
                    </p>
                  </div>
                  <div className="hot-prices__goods__cards__good-card__header__line" />
                  <div className="hot-prices__goods__cards__good-card__main">
                    <div className="hot-prices__goods__cards__good-card__main__titles">
                      <h5 className="hot-prices__goods__cards__good-card__main__titles__title">
                        Screen
                      </h5>
                      <h5 className="hot-prices__goods__cards__good-card__main__titles__title">
                        Capacity
                      </h5>
                      <h5 className="hot-prices__goods__cards__good-card__main__titles__title">
                        RAM
                      </h5>
                    </div>
                    <div className="hot-prices__goods__cards__good-card__main__info">
                      <h5 className="hot-prices__goods__cards__good-card__main__info__title">
                        {phone.screen}
                      </h5>
                      <h5 className="hot-prices__goods__cards__good-card__main__info__title">
                        {phone.capacity}
                      </h5>
                      
                      <h5
                        // eslint-disable-next-line
                        className="hot-prices__goods__cards__good-card__main__info__title">
                        {phone.ram}
                        {' '}
                      </h5>
                    </div>
                  </div>
                  <div className="hot-prices__goods__cards__good-card__buttons">

                    <button
                      type="button"
                      className={prevCartPhonesArr
                        && prevCartPhonesArr.includes(phone.id)
                        // eslint-disable-next-line
                        ? 'hot-prices__goods__cards__good-card__buttons__cart--added'
                        : 'hot-prices__goods__cards__good-card__buttons__cart'}
                      tabIndex={0}
                      aria-label="Previous Image"
                      onClick={() => setCartPhones(phone.id)}
                    >
                      {prevCartPhonesArr
                        && prevCartPhonesArr.includes(phone.id)
                        ? 'Added to cart'
                        : 'Add to cart'}
                    </button>
                    <button
                      type="button"
                      // eslint-disable-next-line
                      className="hot-prices__goods__cards__good-card__buttons__favorite"
                      tabIndex={0}
                      aria-label="Previous Image"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
