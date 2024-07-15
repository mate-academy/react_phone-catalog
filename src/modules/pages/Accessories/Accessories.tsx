import React, { ChangeEvent, useContext, useState } from 'react';
import './Accessories.scss';
import { Card } from '../Home/components/NewPhones/components';
import { Sort } from '../Phones/sortFunction';
import { AccessoriesContext } from '../../../App';
import { getVisiableAccess } from './sortFunction';

export const Accessories: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const accessories = useContext(AccessoriesContext);
  const [sort, setSort] = useState(Sort.newest);
  const visible = getVisiableAccess(accessories, sort);

  function changePostsPerPage(e: ChangeEvent<HTMLSelectElement>) {
    setPostsPerPage(+e.target.value);
  }

  function handleSortOfPhones(e: ChangeEvent<HTMLSelectElement>) {
    setSort(e.target.value as Sort);
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

  return (
    <div className="phones-container">
      <div> links</div>
      <h1 className="phones-container-h1">Tablets</h1>
      <p className="phones-container-p">{`${accessories.length} models`}</p>
      <div className="sort-block">
        <div className="phones-sort-container">
          <p className="SortBy-p">Sort by</p>
          <div className="sortBy-container">
            <select className="sortBy-box" onChange={handleSortOfPhones}>
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
            <select className="sortBy-box" onChange={changePostsPerPage}>
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

      <div className="phones-card-container">
        {currentCards.map(currentCard => (
          <Card phone={currentCard} key={currentCard.id} />
        ))}
      </div>
      <div className="btn-container">
        <button className="arrow-btn" onClick={prevPage}>
          <img src="./uploadedImg/RightArrow.png"></img>
        </button>
        {pages.map((page, index) => (
          <button
            className={page === currentPage ? 'btn-class-active' : 'btn-class'}
            key={index}
            onClick={() => {
              setCurrentPage(page);
            }}
          >
            {page}
          </button>
        ))}
        <button className="arrow-btn" onClick={nextPage}>
          <img src="./uploadedImg/LeftArrow.png"></img>
        </button>
      </div>
    </div>
  );
};
