import React, { FC, useState, useEffect } from 'react';
import './_SmallCatalog.scss';
import cx from 'classnames';

interface Props {
  titleName: string;
}

export const SmallCatalog: FC<Props> = (props) => {
  const { titleName } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [width, setWidth] = useState(window.innerWidth);

  const arr = [];
  const amount = 24;

  for (let i = 1; i <= amount; i += 1) {
    arr.push(i);
  }

  const indexOfLast = currentPage * cardsPerPage;
  const indexOfFirst = indexOfLast - cardsPerPage;
  const visibleCards = arr.slice(indexOfFirst, indexOfLast);

  const handleLeft = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleRight = () => {
    setCurrentPage(currentPage + 1);
  };

  const positionPage = (array: number[], quantity: number): number => {
    return Math.ceil(array.length / quantity);
  };

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (width > 1401) {
      setCardsPerPage(4);
    } else if (width > 961 && width < 1400) {
      setCardsPerPage(3);
    } else if (width > 641 && width < 960) {
      setCardsPerPage(2);
    } else if (width < 640) {
      setCardsPerPage(1);
    }
  }, [width]);

  return (
    <div className="smCatalog">
      <div className="smCatalog__prices-top">
        <h3 className="smCatalog__title">{titleName}</h3>
        <div className="smCatalog__control-btns">
          <button
            disabled={currentPage === 1}
            onClick={handleLeft}
            type="button"
            className={cx('smCatalog__btn smCatalog__btn--left', {
              'smCatalog__btn--left--notActive': currentPage === 1,
            })}
          />
          <button
            disabled={currentPage === positionPage(arr, cardsPerPage)}
            onClick={handleRight}
            type="button"
            className={cx('smCatalog__btn smCatalog__btn--right', {
              'smCatalog__btn--right--notActive':
                currentPage === positionPage(arr, cardsPerPage),
            })}
          />
        </div>
      </div>
      <div className="smCatalog__prices-main">
        {
          visibleCards.map(card => (
            <div className="temp-block" key={card}>
              <h3 className="temp-block__title">{card}</h3>
            </div>
          ))
        }
      </div>
    </div>
  );
};
