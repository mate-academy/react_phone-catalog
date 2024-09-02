import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import './Accessories.scss';
import { Card } from '../Home/components/NewPhones/components';
import { Sort } from '../Phones/sortFunction';
import { getVisiableAccess } from './sortFunction';
import { AccessoriesContext } from '../../../PageContext';
import { Loader } from '../Phones/components';
import { Link, useSearchParams } from 'react-router-dom';

export const Accessories: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const postsPerPage = +(searchParams.get('postsPerPage') || 8);
  const sort = searchParams.get('sortBy') || '';

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const accessories = useContext(AccessoriesContext);
  const visible = getVisiableAccess(accessories, sort as Sort);

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

  const currentCards = visible.slice(firstPostIndex, lastPostIndex);

  const pages = [];

  for (let i = 1; i <= Math.ceil(accessories.length / postsPerPage); i++) {
    pages.push(i);
  }

  function nextPage() {
    setCurrentPage(index => {
      if (index === pages.length) {
        return 1;
      }

      return index + 1;
    });
  }

  function prevPage() {
    setCurrentPage(index => {
      if (index === 1) {
        return pages.length;
      }

      return index - 1;
    });
  }

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="phones-container">
      <div className="fav-link">
        <Link to="/" className="favIcon">
          <img src="./uploadedImg/home.svg"></img>
        </Link>
        <a className="favIcon">
          <img src="./uploadedImg/right.svg"></img>
        </a>
        <p className="fav-link-p">Accessories</p>
      </div>
      <h1 className="phones-container-h1">Accessories</h1>
      <p className="phones-container-p">{`${accessories.length} models`}</p>
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
              <img src="./uploadedImg/down.svg"></img>
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
              <img src="./uploadedImg/down.svg"></img>
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
            <div className="fav-is-empty">There are no accessories yet</div>
          )}
        </div>
      )}

      {!isLoading && (
        <div className="btn-container">
          <button className="arrow-btn-LR" onClick={prevPage}>
            <img src="./uploadedImg/left.svg"></img>
          </button>
          {pages.map((page, index) => (
            <button
              className={
                page === currentPage ? 'btn-class-active' : 'btn-class'
              }
              key={index}
              onClick={() => {
                setCurrentPage(page);
              }}
            >
              {page}
            </button>
          ))}
          <button className="arrow-btn-LR" onClick={nextPage}>
            <img src="./uploadedImg/right.svg"></img>
          </button>
        </div>
      )}
    </div>
  );
};
