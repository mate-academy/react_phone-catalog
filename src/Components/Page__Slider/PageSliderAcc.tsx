import arrRight from '../../images/icons/Chevron (Arrow Right).svg';
import arrLeft from '../../images/icons/Chevron (Arrow Left).svg';
import React from 'react';

// eslint-disable-next-line max-len
import arrRightDisabled from '../../images/icons/Chevron (Arrow Right) grey.png';

type Props = {
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  activeQuantity: number;
};

export const PageSliderAcc: React.FC<Props> = ({
  activePage,
  setActivePage,
  activeQuantity,
}: Props) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page__models-page">
      <button
        onClick={() => {
          setActivePage(activePage - 1);
          handleScrollToTop();
        }}
        disabled={activePage === 0}
        className={`page__models-button page__models-arr ${activePage === 0 ? 'page__models-arr-disabled' : ''}`}
      >
        <img
          className={`${activePage === 0 ? 'page__models-arr-left' : ''}`}
          src={activePage === 0 ? arrRightDisabled : arrLeft}
          alt=""
        />
      </button>
      <button
        onClick={() => {
          setActivePage(0);
          handleScrollToTop();
        }}
        className={`page__models-button ${activePage === 0 ? 'page__models-button_active' : ''}`}
      >
        1
      </button>
      <button
        onClick={() => {
          setActivePage(1);
          handleScrollToTop();
        }}
        className={`page__models-button ${activePage === 1 ? 'page__models-button_active' : ''} ${activeQuantity === 64 ? 'page__models-disabled' : ''}`}
      >
        2
      </button>
      <button
        onClick={() => {
          setActivePage(2);
          handleScrollToTop();
        }}
        className={`page__models-button ${activePage === 2 ? 'page__models-button_active' : ''} ${activeQuantity === 64 ? 'page__models-disabled' : ''} ${activeQuantity === 32 ? 'page__models-disabled' : ''}`}
      >
        3
      </button>
      <button
        onClick={() => {
          setActivePage(3);
          handleScrollToTop();
        }}
        className={`page__models-button ${activePage === 3 ? 'page__models-button_active' : ''} ${activeQuantity === 64 ? 'page__models-disabled' : ''} ${activeQuantity === 32 ? 'page__models-disabled' : ''} ${activeQuantity === 16 ? 'page__models-disabled' : ''}`}
      >
        4
      </button>
      <button
        onClick={() => {
          setActivePage(activePage + 1);
          handleScrollToTop();
        }}
        className={`page__models-button page__models-arr ${activePage === 3 ? 'page__models-arr-disabled' : ''} ${activePage === 0 && activeQuantity === 64 ? 'page__models-arr-disabled' : ''} ${activePage === 1 && activeQuantity === 32 ? 'page__models-arr-disabled' : ''}  ${activePage === 2 && activeQuantity === 16 ? 'page__models-arr-disabled' : ''} `}
        disabled={
          activePage === 3 ||
          (activePage === 0 && activeQuantity === 64) ||
          (activePage === 1 && activeQuantity === 32) ||
          (activePage === 2 && activeQuantity === 16)
        }
      >
        <img
          src={
            activePage === 3 ||
            (activePage === 0 && activeQuantity === 64) ||
            (activePage === 1 && activeQuantity === 32) ||
            (activePage === 2 && activeQuantity === 16)
              ? arrRightDisabled
              : arrRight
          }
          alt=""
        />
      </button>
    </div>
  );
};
