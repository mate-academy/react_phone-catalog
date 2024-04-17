import { useContext, useEffect, useState } from 'react';
import { Phone } from '../../../types/phone';
import { CatalogContext } from '../../CatalogContext';
import Arrow_Left from '../../../images/homePage/Arrow_Left.svg';
import Arrow_Right from '../../../images/homePage/Arrow_Right.svg';
import Vector_light_left from '../../../images/homePage/Vector_light_left.svg';
import Vector_light_right from '../../../images/homePage/Vector_light_right.svg';
import './BrandNew.scss';
import { ProductCard } from '../../../components/ProductCard/ProductCard';

export const BrandNew = () => {
  const { products, error } = useContext(CatalogContext);
  const brand = true;

  const [matches, setMatches] = useState(
    window.matchMedia('(min-width: 640px)').matches,
  );

  useEffect(() => {
    window
      .matchMedia('(min-width: 640px)')
      .addEventListener('change', e => setMatches(e.matches));
  }, []);

  const countQuantity = () => {
    if (!matches) {
      return 2;
    } else {
      return 4;
    }
  };

  const itemsOnPage = countQuantity();

  const [currentPage, setCurrentPage] = useState(1);

  const sorted = products?.sort((a, b) => (b.fullPrice > a.fullPrice ? 1 : -1));

  const sortBrandPhones = () => {
    const firstPageIndex = (currentPage - 1) * itemsOnPage;
    const lastPageIndex = firstPageIndex + itemsOnPage;

    return sorted?.slice(firstPageIndex, lastPageIndex);
  };

  const brandPhones = sortBrandPhones();

  const last = () => {
    if (products?.length === undefined) {
      return 0;
    } else {
      return Math.ceil(products?.length / itemsOnPage);
    }
  };

  const lastPage = last();

  const handleNextPage = () => {
    const updatedPage = currentPage + 1;

    setCurrentPage(updatedPage);
  };

  const handlePreviousPage = () => {
    const updatedPage = currentPage - 1;

    setCurrentPage(updatedPage);
  };

  return !error ? (
    <div className="hotPrices">
      <div className="hotPrices__container">
        <div className="hotPrices__top">
          <h1 className="hotPrices__head">Brand new models</h1>
          <div className="hotPrices__arrays">
            <button
              className="hotPrices__arrays__button
              hotPrices__arrays__left"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <img
                src={
                  currentPage === 1 ? `${Vector_light_left}` : `${Arrow_Left}`
                }
                className="hotPrices__arrays__img"
                alt={Arrow_Left}
              />
            </button>
            <button
              className="hotPrices__arrays__button"
              onClick={handleNextPage}
              disabled={currentPage === lastPage}
            >
              <img
                src={
                  currentPage === lastPage
                    ? `${Vector_light_right}`
                    : `${Arrow_Right}`
                }
                className="hotPrices__arrays__img"
                alt={Arrow_Right}
              />
            </button>
          </div>
        </div>
        <div className="hotPrices__cards">
          <div className="hotPrices__ribbon">
            {brandPhones?.map((phone: Phone) => (
              <ProductCard phone={phone} key={phone.id} brand={brand} />
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};
