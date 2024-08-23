import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import './Phones.scss';
import { Card } from '../Home/components/NewPhones/components';
import { Sort, getVisiablePhones } from './sortFunction';
import { PhoneContext } from '../../../PageContext';
import { Loader } from './components';
import { useSearchParams } from 'react-router-dom';

export const Phones: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const postsPerPage = +(searchParams.get('postsPerPage') || 24);
  const sort = searchParams.get('sortBy') || '';
  const currentPage = +(searchParams.get('currentPage') || 1);

  const [isLoading, setIsLoading] = useState(false);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const phones = useContext(PhoneContext);
  const visible = getVisiablePhones(phones, sort as Sort);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  function changePostsPerPage(e: ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('postsPerPage', e.target.value);
    setSearchParams(params);
  }

  function handleSortOfPhones(e: ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('sortBy', e.target.value);
    setSearchParams(params);
  }

  function handleCurrentPage(current: string) {
    const params = new URLSearchParams(searchParams);

    params.set('currentPage', current);
    setSearchParams(params);
  }

  const currentCards = visible.slice(firstPostIndex, lastPostIndex);

  const pages = [];

  for (let i = 1; i <= Math.ceil(phones.length / postsPerPage); i++) {
    pages.push(i);
  }

  function handlePrevPage() {
    const params = new URLSearchParams(searchParams);

    if (currentPage === 1) {
      params.set('currentPage', pages.length.toString());
    } else {
      params.set('currentPage', (+currentPage - 1).toString());
    }

    setSearchParams(params);
  }

  function handleNextPage() {
    const params = new URLSearchParams(searchParams);

    if (+currentPage === pages.length) {
      params.set('currentPage', '1');
    } else {
      params.set('currentPage', (+currentPage + 1).toString());
    }

    setSearchParams(params);
  }

  return (
    <div className="phones-container">
      <div className="fav-link">
        <a className="favIcon">
          <img src="/uploadedImg/Home.png"></img>
        </a>
        <a className="favIcon">
          <img src="/uploadedImg/LeftArrow.png"></img>
        </a>
        <p className="fav-link-p">Phones</p>
      </div>
      <h1 className="phones-container-h1">Mobile phones</h1>
      <p className="phones-container-p">{`${phones.length} models`}</p>
      <div className="sort-block">
        <div className="phones-sort-container">
          <p className="SortBy-p">Sort by</p>
          <div className="sortBy-container">
            <select
              className="sortBy-box"
              onChange={handleSortOfPhones}
              value={sort}
            >
              <option value="Newest">Newest</option>
              <option value="Alphabetically">Alphabetically</option>
              <option value="Cheapest">Cheapest</option>
            </select>
            <div className="select-btn">
              <img src="./uploadedImg/DownArrow.png"></img>
            </div>
          </div>
        </div>
        <div className="phones-sort-container">
          <p className="SortBy-p">Items on page</p>
          <div className="sortBy-container">
            <select
              className="sortBy-box"
              onChange={changePostsPerPage}
              value={postsPerPage}
            >
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="24">24</option>
            </select>
            <div className="select-btn">
              <img src="./uploadedImg/DownArrow.png"></img>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="phones-card-container">
          {currentCards.length > 0 ? (
            currentCards.map(currentCard => (
              <Card phone={currentCard} key={currentCard.id} />
            ))
          ) : (
            <div className="fav-is-empty">There are no phones yet</div>
          )}
        </div>
      )}

      {!isLoading && (
        <div className="btn-container">
          <button className="arrow-btn-LR" onClick={handlePrevPage}>
            <img src="./uploadedImg/RightArrow.png"></img>
          </button>
          {pages.map((page, index) => (
            <button
              className={
                page === currentPage ? 'btn-class-active' : 'btn-class'
              }
              key={index}
              onClick={() => {
                handleCurrentPage(page.toString());
              }}
            >
              {page}
            </button>
          ))}
          <button className="arrow-btn-LR" onClick={handleNextPage}>
            <img src="./uploadedImg/LeftArrow.png"></img>
          </button>
        </div>
      )}
    </div>
  );
};
