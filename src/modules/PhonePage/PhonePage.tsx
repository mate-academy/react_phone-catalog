import { useContext, useEffect } from 'react';
import styles from './PhonePage.module.scss';
import { StateContext } from '../../Store';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard';
import classNames from 'classnames';
import { Select } from '../../components/Select';

export const PhonePage = () => {
  const state = useContext(StateContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { products } = state;
  const pageFromSearchParam = searchParams.get('page') || '';
  const quantityFromSearchParam = searchParams.get('quantity') || '';
  const queryFromSearchParam = searchParams.get('sortBy') || '';
  const currentPage = pageFromSearchParam ? +pageFromSearchParam : 0;
  const quantity = quantityFromSearchParam ? +quantityFromSearchParam : 4;
  const query = queryFromSearchParam ? queryFromSearchParam : '';

  const currentIndex = currentPage * quantity;

  const phones = products
    .filter(product => product.category === 'phones')
    .sort((a, b) => b.year - a.year);

  let sortingPhones = [...phones];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectedSorting = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;

    params.set('sortBy', value);
    setSearchParams(params);

    params.set('page', '0');
    setSearchParams(params);
  };

  if (query === 'Newest') {
    sortingPhones = sortingPhones.sort((a, b) => b.year - a.year);
  }

  if (query === 'Cheapest') {
    sortingPhones = sortingPhones.sort((a, b) => a.fullPrice - b.fullPrice);
  }

  if (query === 'Alphabetically') {
    sortingPhones = sortingPhones.sort((a, b) => a.name.localeCompare(b.name));
  }

  const pagesCount = Math.ceil(phones.length / quantity);

  sortingPhones = sortingPhones.slice(currentIndex, currentIndex + quantity);

  const handleChangeQuatity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    params.set('quantity', value);
    setSearchParams(params);

    params.set('page', '0');
    setSearchParams(params);
  };

  const handleNext = () => {
    if (currentPage >= pagesCount - 1) {
      return;
    }

    params.set('page', `${currentPage + 1}`);
    setSearchParams(params);
  };

  const handlePrev = () => {
    if (currentPage <= 0) {
      return;
    }

    params.set('page', `${currentPage - 1}`);
    setSearchParams(params);
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
            <label htmlFor="sortByYear" className={styles.label}>
              Sort by
            </label>
            <Select
              name="sortByYear"
              id="sortByYear"
              value={query}
              onChange={handleSelectedSorting}
              options={['Newest', 'Cheapest', 'Alphabetically']}
            />
          </div>
          <div className={styles.fieldSecond}>
            <label htmlFor="itemsOnPage" className={styles.label}>
              Items on page
            </label>
            <Select
              name="itemsOnPage"
              id="itemsOnPage"
              value={quantity}
              onChange={handleChangeQuatity}
              options={[4, 8, 16]}
            />
          </div>
        </section>

        <ul className={styles.list}>
          {sortingPhones.map(phone => (
            <li key={phone.id} className={styles.listItem}>
              <div className={styles.card}>
                <ProductCard
                  key={phone.id}
                  img={phone.image}
                  name={phone.name}
                  price={phone.fullPrice}
                  screen={phone.screen}
                  capacity={phone.capacity}
                  ram={phone.ram}
                  secondPrice={phone.price}
                  product={phone}
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
            <Link to={`?page=${currentPage - 1}`}>
              <button className={styles.buttonIsActive} onClick={handlePrev}>
                <img src="img/ArrowLeft.svg" alt="Previous" />
              </button>
            </Link>
          )}
          <div className={styles.middleButton}>
            {[...Array(4)].map((_, idx) => {
              let buttonNum = idx;

              if (currentPage >= 4) {
                buttonNum = idx + currentPage - 3;
              }

              return (
                // eslint-disable-next-line react/jsx-key
                <Link to={`?page=${buttonNum}`}>
                  <button
                    key={buttonNum}
                    className={getButtonActiveClass(buttonNum)}
                  >
                    {1 + buttonNum}
                  </button>
                </Link>
              );
            })}
          </div>
          {currentPage === pagesCount - 1 ? (
            <button className={styles.button} onClick={handleNext}>
              <img src="img/arrowRightLight.svg" alt="Next" />
            </button>
          ) : (
            <Link to={`?page=${currentPage + 1}`}>
              <button className={styles.buttonIsActive} onClick={handleNext}>
                <img src="img/ArrowRight.svg" alt="Next" />
              </button>
            </Link>
          )}
        </section>
      </div>
    </>
  );
};
