import { useContext, useState } from 'react';
import styles from './PhonePage.module.scss';
import { StateContext } from '../../Store';
import { Footer } from '../../components/Footer';
import { Link } from 'react-router-dom';
import { PhoneCard } from '../../components/PhoneCard';
import classNames from 'classnames';

export const PhonePage = () => {
  const state = useContext(StateContext);
  const { products } = state;
  const [query, setQuery] = useState('');
  const [quantity, setQuantity] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);

  const currentIndex = currentPage * quantity;
  // const [currentIndex, setCurrentIndex] = useState(0);

  const phones = products
    .filter(product => product.category === 'phones')
    .sort((a, b) => b.fullPrice - a.fullPrice);

  let sortingPhones = [...phones];

  const handleSelectedSorting = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setQuery(event.target.value);
  };

  if (query === 'Newest') {
    sortingPhones = sortingPhones.filter(phone => phone.year >= 2022);
  }

  if (query === 'Cheapest') {
    sortingPhones = sortingPhones.sort((a, b) => a.fullPrice - b.fullPrice);
  }

  if (query === 'Iphone 14') {
    sortingPhones = sortingPhones.filter(phone =>
      phone.name.includes('iPhone 14'),
    );
  }

  if (query === 'Iphone 13') {
    sortingPhones = sortingPhones.filter(phone =>
      phone.name.includes('iPhone 13'),
    );
  }

  if (query === 'Iphone 12') {
    sortingPhones = sortingPhones.filter(phone =>
      phone.name.includes('iPhone 12'),
    );
  }

  if (query === 'Iphone 11') {
    sortingPhones = sortingPhones.filter(phone =>
      phone.name.includes('iPhone 11'),
    );
  }

  const pagesCount = Math.ceil(phones.length / quantity);

  console.log(
    '=',
    phones.length,
    quantity,
    pagesCount,
    'currentIndex=',
    currentIndex,
    'currentPage=',
    currentPage,
  );

  sortingPhones = sortingPhones.slice(currentIndex, currentIndex + quantity);

  const handleChangeQuatity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(+event.target.value);
    setCurrentPage(0);
  };

  const handleNext = () => {
    if (currentPage >= pagesCount - 1) {
      return;
    }

    setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage <= 0) {
      return;
    }

    setCurrentPage(currentPage - 1);
  };

  const getButtonActiveClass = (page: number) => {
    return classNames(
      currentPage === page ? styles.buttonActive : styles.button,
    );
  };

  return (
    <>
      <div className={styles.container}>
        <section className={styles.top}>
          <Link to="/">
            <img
              src="img/Home.Icon.svg"
              alt="iconHome"
              className={styles.iconHome}
            />
          </Link>
          <img
            src="img/arrowRightLight.svg"
            alt="arrowRight"
            className={styles.arrowRight}
          />
          <h4 className={styles.name}>Phones</h4>
        </section>
        <h1 className={styles.title}>Mobile phones</h1>
        <h4 className={styles.subtitle}>{`${phones.length} phones`}</h4>
        <section className={styles.selectContainer}>
          <div className={styles.field}>
            <label htmlFor="filter-query" className={styles.label}>
              Sort by
            </label>
            <select
              name="sortByYear"
              id="sortByYear"
              className={styles.select}
              value={query}
              onChange={handleSelectedSorting}
            >
              <option value="Newest" className={styles.optionName}>
                Newest
              </option>
              <option value="Cheapest" className={styles.optionName}>
                Cheapest
              </option>
              <option value="Iphone 14" className={styles.optionName}>
                Iphone 14
              </option>
              <option value="Iphone 13" className={styles.optionName}>
                Iphone 13
              </option>
              <option value="Iphone 12" className={styles.optionName}>
                Iphone 12
              </option>
              <option value="Iphone 11" className={styles.optionName}>
                Iphone 11
              </option>
            </select>
          </div>
          <div className={styles.fieldSecond}>
            <label htmlFor="filter-query" className={styles.label}>
              Items on page
            </label>
            <select
              name="itemsOnPage"
              id="itemsOnPage"
              className={styles.select}
              value={quantity}
              onChange={handleChangeQuatity}
            >
              <option value="4" className={styles.optionName}>
                4
              </option>
              <option value="8" className={styles.optionName}>
                8
              </option>
              <option value="16" className={styles.optionName}>
                16
              </option>
            </select>
          </div>
        </section>
        <ul className={styles.list}>
          {sortingPhones.map(phone => (
            <li key={phone.id} className={styles.listItem}>
              <div className={styles.card}>
                <PhoneCard
                  key={phone.id}
                  img={phone.image}
                  name={phone.name}
                  price={phone.fullPrice}
                  screen={phone.screen}
                  capacity={phone.capacity}
                  ram={phone.ram}
                  secondPrice={phone.price}
                />
              </div>
            </li>
          ))}
        </ul>
        <section className={styles.sliderButton}>
          {currentPage === 0 ? (
            <button className={styles.button}>
              <img src="img/arrowLeftLight.svg" alt="Previous" />
            </button>
          ) : (
            <button className={styles.buttonActive} onClick={handlePrev}>
              <img src="img/ArrowLeft.svg" alt="Previous" />
            </button>
          )}
          <div className={styles.middleButton}>
            {[...Array(4)].map((_, idx) => {
              let buttonNum = idx;

              if (currentPage >= 4) {
                buttonNum = idx + currentPage - 3;
              }

              return (
                <button
                  key={buttonNum}
                  className={getButtonActiveClass(buttonNum)}
                  onClick={() => setCurrentPage(buttonNum)}
                >
                  {1 + buttonNum}
                </button>
              );
            })}
          </div>
          {currentPage === pagesCount - 1 ? (
            <button className={styles.button} onClick={handleNext}>
              <img src="img/arrowRightLight.svg" alt="Next" />
            </button>
          ) : (
            <button className={styles.buttonActive} onClick={handleNext}>
              <img src="img/ArrowRight.svg" alt="Next" />
            </button>
          )}
          {/* <button className={styles.button}>
            <img src="img/ArrowRight.svg" alt="previous" />
          </button> */}
        </section>
        <div className={styles.border}></div>
        <Footer />
      </div>
    </>
  );
};
