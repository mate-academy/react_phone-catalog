import React from 'react';
import './PaginationStyles.scss';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

interface Props {
  handleSetActivePage: (page: any) => void;
  pages: number;
  activePage: number;
  activeSection: number;
}

const Pagination: React.FC<Props> = ({
  handleSetActivePage,
  pages,
  activePage,
  activeSection,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const AmountPages = Array.from({ length: pages }, (_, i) => i + 1);
  const pixelsToTranslate = activeSection > 1 ? (activeSection - 1) * 160 : 0;

  const handleClick = (elem: number) => {
    handleSetActivePage(elem);
    const params = new URLSearchParams(searchParams);
    params.set('page', `${elem}`);

    if (elem === 1) {
      params.delete('page');
    }

    setSearchParams(params);
  };

  const handleSetPrevPage = () => {
    const result = activePage > 1 ? activePage - 1 : activePage;
    handleSetActivePage(result);
    handleClick(result);
  };

  const handleSetNextPage = () => {
    const result = activePage < pages ? activePage + 1 : activePage;
    handleSetActivePage(result);
    handleClick(result);
  };

  return (
    <div className="pagination__buttons">
      <button className="pagination__prev" onClick={() => handleSetPrevPage()}>
        <img src="icons/arrow-up-black.png" alt="" />
      </button>
      <div className="pagination__main--wrapper">
        <ul
          className="pagination__main--buttons"
          style={{ transform: `translateX(-${pixelsToTranslate}px)` }}
        >
          {AmountPages.map(elem => (
            <li
              className={classNames('pagination__page', {
                'page--active': elem === activePage,
              })}
              onClick={() => handleClick(elem)}
              key={elem}
            >
              {elem}
            </li>
          ))}
        </ul>
      </div>

      <button className="pagination__next" onClick={() => handleSetNextPage()}>
        <img src="icons/arrow-up-black.png" alt="" />
      </button>
    </div>
  );
};

export default Pagination;
