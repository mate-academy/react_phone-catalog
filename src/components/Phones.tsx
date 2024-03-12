import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from './Context';
import ArrowDown from '../img/arrow-down.svg';
import ArrowUp from '../img/arrow-up.svg';
// import FavoriteAdded from '../img/favourites filled.svg';
import filledFavoriteImage from '../img/favourites-filled.svg';
import { Pagination } from './Pagination';

// import cn from 'classnames';
/* eslint-disable */
interface Phones {
  id: string;
  category: string;
  phoneId: string;
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

export const Phones = () => {
  // const { page, perPage, sortParam } = useParams();
  const { itemsOnPage, setItemsOnPage } = useAppContext();
  const [changeItemsOnPage, setChangeItemsOnPage] = useState<boolean>(false);
  const { sortParam, setSortParam } = useAppContext();
  const [changeSort, setChangeSort] = useState<boolean>(false);
  const { favoritePhones, setFavoritePhones } = useAppContext();
  const { prevFavoriteArr, setPrevFavoriteArr } = useAppContext();
  const { cartPhones, setCartPhones } = useAppContext();
  const { prevCartPhonesArr, setPrevCartPhonesArr } = useAppContext();
  // const { currentPage, setCurrentPage } = useAppContext();
  const  { visibleElems } = useAppContext();
  const { setCurrentPage } = useAppContext();

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
        setItemsOnPage(data.length)
      } catch (error) {
        setErrorMessage('Error during fetch:');
      }
    };

    fetchData();
  }, []);

  const blockItemsRef = useRef<HTMLDivElement>(null);
  const blockSortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (blockItemsRef.current && !blockItemsRef.current.contains(event.target as Node)) {
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
      if (blockSortRef.current && !blockSortRef.current.contains(event.target as Node)) {
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
  const [price, setPrice] = useState<number>(0);
  
  
  useEffect(() => {
    let newProductInCart = { id: cartPhones, count: 1, fullPrice: price };
    if (cartPhones.trim() !== "") {
      if (prevCartPhonesArr?.some(elem => elem.id === cartPhones)) {
        setPrevCartPhonesArr(prevCartPhonesArr => prevCartPhonesArr?.filter(phone => phone.id !== cartPhones));
      } else {
        setPrevCartPhonesArr(prevCartPhonesArr => prevCartPhonesArr ? [...prevCartPhonesArr, newProductInCart] : [newProductInCart]);
      }
    }
    setCartPhones('');
    setPrice(0);
    console.log(prevCartPhonesArr)
}, [cartPhones, prevCartPhonesArr]);

  // const [favoritePhones, setFavoritePhones] = useState<string>('');
  // const [ prevFavoriteArr, setPrevFavoriteArr ] = useAppContext();

  useEffect(() => {
    if (favoritePhones.trim() !== "") {
      if (prevFavoriteArr?.includes(favoritePhones)) {
        setPrevFavoriteArr(prevFavoriteArr => prevFavoriteArr?.filter(phone => phone !== favoritePhones));
      } else {
        setPrevFavoriteArr(prevFavoriteArr => (prevFavoriteArr ? [...prevFavoriteArr, favoritePhones] : [favoritePhones]));
      }
    }
    setFavoritePhones(''); 
  }, [favoritePhones, prevFavoriteArr]);

  errorMessage;

  const { setSelectedProduct } = useAppContext();

  console.log(prevFavoriteArr);

  return (
    <section className="phones__wrapper">
      <div className="phones__content">
        <div className="phones__header">
          <h3 className="phones__header__title">Mobile phones</h3>
          <p className="phones__header__paragraph">{`${getPhone?.length} models`}</p>

          <div className="phones__header__buttons">
            <div className="phones__header__buttons__sort" ref={blockSortRef}>
              <h5 className="phones__header__buttons__sort__title">Sort by</h5>
              <button className="phones__header__buttons__sort__button" onClick={handleChangeSort}>
                <span className="phones__header__buttons__sort__button__text">{sortParam}</span>
                <img className="phones__header__buttons__sort__button__img" src={changeSort ? ArrowUp : ArrowDown} alt="" />
              </button>
              {changeSort
                && (
                  <div className="phones__header__buttons__sort__select">
                    <span
                      className="phones__header__buttons__sort__select__option"
                      onClick={() => {
                        setSortParam('Newest'); handleChangeSort();
                      }}
                    >
                      Newest
                    </span>
                    <span
                      className="phones__header__buttons__sort__select__option"
                      onClick={() => {
                        setSortParam('Alphabetically'); handleChangeSort();
                      }}
                    >
                      Alphabetically
                    </span>
                    <span
                      className="phones__header__buttons__sort__select__option"
                      onClick={() => {
                        setSortParam('Cheapest'); handleChangeSort();
                      }}
                    >
                      Cheapest
                    </span>
                  </div>
                )}
            </div>
            <div className="phones__header__buttons__amount" ref={blockItemsRef}>
              <h5 className="phones__header__buttons__amount__title">Items on page</h5>
              <button className="phones__header__buttons__amount__button" onClick={handleChangeItems}>
                <span className="phones__header__buttons__amount__button__text">{itemsOnPage !== getPhone?.length ? itemsOnPage : "all"}</span>
                <img className="phones__header__buttons__amount__button__img" src={changeItemsOnPage ? ArrowUp : ArrowDown} alt="arrow" />
              </button>
              {changeItemsOnPage
                && (
                  <div className="phones__header__buttons__amount__select">
                    <span
                      className="phones__header__buttons__amount__select__option"
                      onClick={() => {
                        setItemsOnPage(4); handleChangeItems(); setCurrentPage(1);
                      }}
                    >
                      4
                    </span>
                    <span
                      className="phones__header__buttons__amount__select__option"
                      onClick={() => {
                        setItemsOnPage(8); handleChangeItems(); setCurrentPage(1);
                      }}
                    >
                      8
                    </span>
                    <span
                      className="phones__header__buttons__amount__select__option"
                      onClick={() => {
                        setItemsOnPage(16); handleChangeItems(); setCurrentPage(1);
                      }}
                    >
                      16
                    </span>
                    <span
                      className="phones__header__buttons__amount__select__option"
                      onClick={() => {
                        setItemsOnPage(getPhone?.length); handleChangeItems(); setCurrentPage(1);
                      }}
                    >
                      all
                    </span>
                  </div>
                )}
            </div>
          </div>
        </div>
        <div className="phones__goods">
          <div className="phones__goods__cards">
            {!!visibleElems && visibleElems.map((phone) => (
              <div className="hot-prices__goods__cards__good-card">
                {/* <p>{phone.itemId}</p> */}
                <NavLink
                  to={`/phones/${phone.itemId}`}
                  onClick={() =>setSelectedProduct(phone.itemId)}
                >
                  <img
                    src={`https://mate-academy.github.io/react_phone-catalog/_new/${phone.image}`}
                    alt=""
                    className="hot-prices__goods__cards__good-card__img"
                  />
                </NavLink>
                
                <div className="hot-prices__goods__cards__good-card__header">
                  
                  <NavLink
                    to={`/phones/${phone.itemId}`}
                    onClick={() =>setSelectedProduct(phone.itemId)}
                    className="hot-prices__goods__cards__good-card__header__name"
                  >
                    {phone.name}
                  </NavLink>
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
                      <h5 className="hot-prices__goods__cards__good-card__main__info__title">
                        {phone.ram}
                        {' '}
                      </h5>
                    </div>
                  </div>
                  <div className="hot-prices__goods__cards__good-card__buttons">

                    <button
                      type="button"
                      className={prevCartPhonesArr && prevCartPhonesArr.some(elem => elem.id === phone.id) ? 'hot-prices__goods__cards__good-card__buttons__cart--added' : 'hot-prices__goods__cards__good-card__buttons__cart'}
                      tabIndex={0}
                      aria-label="Previous Image"
                      onClick={() => {setCartPhones(phone.id), setPrice(phone.price)}}
                    >
                      {prevCartPhonesArr && prevCartPhonesArr.some(elem => elem.id === phone.id) ? 'Added to cart' : 'Add to cart'}
                    </button>
                    <button
                      type="button"
                      className="hot-prices__goods__cards__good-card__buttons__favorite"
                      style={prevFavoriteArr && prevFavoriteArr.includes(phone.id) ? {backgroundImage: `url(${filledFavoriteImage})`} : undefined}
                      tabIndex={0}
                      aria-label="Previous Image"
                      onClick={() => setFavoritePhones(phone.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Pagination />
      </div>
    </section>
  );
};
