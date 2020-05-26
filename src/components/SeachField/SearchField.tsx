
import React from 'react';
import './SearchField.scss';
import { useHistory, useLocation } from 'react-router-dom';


export const SearchField = () => {
  const addresses = [
    '/phones',
    '/tablets',
    '/accessories',
    '/favorites'
  ];



  const history = useHistory();
  const location = useLocation();
  const isOnPage = addresses.includes(location.pathname)
  const searchParams = new URLSearchParams(location.search);

  const handleButtonClick = () => {
    if (!searchParams.get("filter")) {
      return;
    }
    searchParams.set("filter", "");
    history.push({
      search: searchParams.toString()
    })
  }

  return (
    isOnPage
      ? <div className="SearchField">
        <input
          type="text"
          className="SearchField__input"
          placeholder={`Search in ${location.pathname.slice(1)}...`}
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            searchParams.set("filter", event.target.value);
            history.push({
              search: searchParams.toString()
            })
          }}
        />
        <button
          type="submit"
          className={searchParams.get("filter")
            ? "SearchField__button"
            : "SearchField__button SearchField__button--magnifier"}
          onClick={handleButtonClick}
        ></button>
      </div>
      : <span></span>

  )
}

