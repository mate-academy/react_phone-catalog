/* eslint-disable react-hooks/exhaustive-deps */
import { Product } from '../../types/Product';
import './ProductPageBlock.scss';
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import { themeClass } from '../../utils/themeClass';
import { useSearchParams } from 'react-router-dom';
import arrowLight from '../../images/arrow-rigth-light.svg';
import arrowDark from '../../images/arrow-right-dark.svg';
import { ProductCardDicount } from '../ProductCardDiscount/productCardDiscount';
import classNames from 'classnames';

type Props = {
  products: Product[];
};

export const ProductPageBlock: React.FC<Props> = ({ products }) => {
  const { light } = useContext(ThemeContext);
  const getClassName = themeClass(light);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortings = [
    'Year hight to low',
    'Year low to high',
    'Price high to low',
    'Price low to high',
    'Storage high to low',
    'Storage low to high',
  ];

  const itemsOptions = ['8', '16', '24', '32', '40'];

  const [currentSort, setCurrentSort] = useState(
    searchParams.get('sorting') || sortings[0],
  );

  const [itemsToShow, setItemsToShow] = useState(
    searchParams.get('itemsToShow') || itemsOptions[0],
  );

  const [isVisibleItems, setIsVisisbleItems] = useState(false);
  const [isVisibleSorting, setIsVisisbleSorting] = useState(false);

  const [productsToRender, setProductsToRender] = useState([...products]);

  function createArrayOfPages(n: number) {
    const arr = [];

    for (let i = 1; i <= n; i++) {
      arr.push(i.toString());
    }

    return arr;
  }

  const pages = createArrayOfPages(
    Math.ceil(productsToRender.length / +itemsToShow),
  );

  const [currentPage, setCurrentPage] = useState(
    searchParams.get('page') || '1',
  );

  const handleSortingToggle = () => {
    setIsVisisbleSorting(prev => !prev);
  };

  const handleItemsToggle = () => {
    setIsVisisbleItems(prev => !prev);
  };

  const handleSortingClose = () => {
    setIsVisisbleSorting(false);
  };

  const handleItemsClose = () => {
    setIsVisisbleItems(false);
  };

  const getStyleBlock = (isVisible: boolean) => {
    if (isVisible) {
      return { opacity: '1' };
    } else {
      return { opacity: '0', cursor: 'default' };
    }
  };

  const getOptionStyle = (isVisible: boolean) => {
    if (isVisible) {
      return { cursor: 'pointer' };
    } else {
      return { zIndex: '-3', cursor: 'default' };
    }
  };

  const renderPages = () => {
    const totalPages = pages.length;

    if (totalPages <= 5) {
      return pages;
    }

    const pageList = [];

    if (+currentPage > 1) {
      pageList.push('1');
    }

    if (+currentPage > 3) {
      pageList.push('...');
    }

    for (let i = Math.max(2, +currentPage - 2); i < +currentPage; i++) {
      pageList.push(i.toString());
    }

    pageList.push(+currentPage.toString());

    for (
      let i = +currentPage + 1;
      i <= Math.min(totalPages - 1, +currentPage + 2);
      i++
    ) {
      pageList.push(i.toString());
    }

    if (+currentPage < totalPages - 2) {
      pageList.push('...');
    }

    if (+currentPage < totalPages) {
      pageList.push(totalPages.toString());
    }

    return pageList;
  };

  const handleButtonClick = (page: string) => {
    if (page !== '...') {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    setCurrentPage(prev => (+prev + 1).toString());
  };

  const prevPage = () => {
    setCurrentPage(prev => (+prev - 1).toString());
  };

  const styleNextButton = () => {
    if (currentPage === pages[pages.length - 1]) {
      return { opacity: '0.5' };
    }

    return;
  };

  const stylePrevButton = () => {
    if (currentPage === '1') {
      return { opacity: '0.5' };
    }

    return;
  };

  useEffect(() => {
    searchParams.set('sorting', currentSort);

    setSearchParams(searchParams.toString());
  }, [currentSort]);

  useEffect(() => {
    searchParams.set('itemsToShow', itemsToShow);

    setSearchParams(searchParams.toString());
  }, [itemsToShow]);

  useEffect(() => {
    if (!pages.includes(currentPage)) {
      setCurrentPage('1');
    }
  }, [itemsToShow]);

  useEffect(() => {
    switch (currentSort) {
      case 'Year low to high':
        setProductsToRender(prev => prev.sort((a, b) => a.year - b.year));

        break;
      case 'Price high to low':
        setProductsToRender(prev => prev.sort((a, b) => b.price - a.price));

        break;
      case 'Price low to high':
        setProductsToRender(prev => prev.sort((a, b) => a.price - b.price));

        break;
      case 'Storage high to low':
        setProductsToRender(prev =>
          prev.sort((a, b) => a.capacity.localeCompare(b.capacity)),
        );

        break;
      case 'Storage low to high':
        setProductsToRender(prev =>
          prev.sort((a, b) => b.capacity.localeCompare(a.capacity)),
        );

        break;
      default:
        setProductsToRender(prev => prev.sort((a, b) => b.year - a.year));

        break;
    }
  }, [currentSort]);

  useEffect(() => {
    searchParams.set('page', currentPage);

    setSearchParams(searchParams.toString());
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  return (
    <>
      {!!products.length && (
        <>
          <div className={getClassName('sorting')}>
            <div
              className={getClassName('sorting-block')}
              onBlur={handleSortingClose}
              tabIndex={0}
            >
              <p className={getClassName('sorting-block-text')}>Sort by</p>

              <p
                className={getClassName('sorting-block-current')}
                onClick={handleSortingToggle}
              >
                {currentSort}
                <img
                  src={light ? arrowLight : arrowDark}
                  alt=""
                  style={{ transform: 'rotate(90deg)' }}
                />
              </p>

              <div
                className={getClassName('sorting-block-current-block')}
                style={getStyleBlock(isVisibleSorting)}
              >
                {sortings
                  .filter(a => a !== currentSort)
                  .map(sorting => (
                    <p
                      className={getClassName(
                        'sorting-block-current-block-option',
                      )}
                      key={sorting}
                      onClick={() => {
                        if (isVisibleSorting) {
                          setCurrentSort(sorting);
                          handleSortingClose();
                        }
                      }}
                      style={getOptionStyle(isVisibleSorting)}
                    >
                      {sorting}
                    </p>
                  ))}
              </div>
            </div>

            <div
              className={getClassName('sorting-block')}
              onBlur={handleItemsClose}
              tabIndex={0}
            >
              <p className={getClassName('sorting-block-text')}>
                Items on page
              </p>

              <p
                className={getClassName('sorting-block-current')}
                onClick={handleItemsToggle}
              >
                {itemsToShow}
                <img
                  src={light ? arrowLight : arrowDark}
                  alt=""
                  style={{ transform: 'rotate(90deg)' }}
                />
              </p>

              <div
                className={getClassName('sorting-block-current-block')}
                style={getStyleBlock(isVisibleItems)}
              >
                {itemsOptions
                  .filter(a => a !== itemsToShow)
                  .map(item => (
                    <p
                      className={getClassName(
                        'sorting-block-current-block-option',
                      )}
                      key={item}
                      onClick={() => {
                        if (isVisibleItems) {
                          setItemsToShow(item);
                          handleItemsClose();
                        }
                      }}
                      style={getOptionStyle(isVisibleItems)}
                    >
                      {item}
                    </p>
                  ))}
              </div>
            </div>
          </div>
          <div className="product-block">
            {[...productsToRender]
              .splice(
                +currentPage > 1 ? (+currentPage - 1) * +itemsToShow : 0,
                +itemsToShow,
              )
              .map(phone => (
                <ProductCardDicount product={phone} key={phone.id} />
              ))}
          </div>
          <div className="pages">
            <button
              className={getClassName('pages__button')}
              onClick={prevPage}
              disabled={currentPage === '1'}
              style={stylePrevButton()}
            >
              {'<'}
            </button>

            {renderPages().map((page, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(page.toString())}
                className={classNames(getClassName('pages__button'), {
                  active: page.toString() === currentPage,
                })}
              >
                {page}
              </button>
            ))}

            <button
              className={getClassName('pages__button')}
              onClick={nextPage}
              disabled={currentPage === pages[pages.length - 1]}
              style={styleNextButton()}
            >
              {'>'}
            </button>
          </div>
        </>
      )}
    </>
  );
};
