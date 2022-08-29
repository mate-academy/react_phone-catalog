import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { usersChoiceContext } from '../../context/UsersChoiceContext';
import './Tabs.scss';

export const Tabs = () => {
  const [search, setSearch] = useState('');
  const { likedGadgetsID, inCartID } = useContext(usersChoiceContext);

  return (
    <div className="Tab">
      <div className="Tab__menuUnit">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="Tab__form"
        >
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            className="Tab__input"
            placeholder="Search in phones"
            value={search}
          />
          {
            search !== '' ? (
              <button
                onClick={() => {
                  setSearch('');
                }}
                type="button"
                className="Tab__cancelBtn"
              >
                <img
                  src="./assets/close.svg"
                  alt="search"
                  className="Tab__iconClose"
                />
              </button>
            ) : (
              <div className="Tab__searchIcon">
                <img src="./assets/search.svg" alt="searchIcon" />
              </div>
            )
          }
        </form>
      </div>
      <div className="Tab__menuUnit">
        <Link
          to="/favourites"
          className="Tab__link"
        >
          <button
            type="button"
            className="Tab__button"
          >
            {
              likedGadgetsID.length > 0 && (
                <div className="Tab__numberOfLiked">
                  {likedGadgetsID.length}
                </div>
              )
            }
            <img src="./assets/heart.svg" alt="search" />
          </button>
        </Link>
      </div>
      <div className="Tab__menuUnit">
        <Link
          to="/cart"
          className="Tab__link"
        >
          <button type="button" className="Tab__button">
            {
              inCartID.length > 0 && (
                <div className="Tab__numberOfLiked">
                  {inCartID.length}
                </div>
              )
            }
            <img src="./assets/shoppingBag.svg" alt="shoppingBag" />
          </button>
        </Link>
      </div>
    </div>
  );
};
