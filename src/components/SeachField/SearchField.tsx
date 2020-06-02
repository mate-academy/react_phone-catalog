
import React, { useState } from 'react';
import './SearchField.scss';
import { useHistory, useLocation } from 'react-router-dom';
import { debounce } from '../../helpers/debounce'


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
  const [fieldValue, setFieldValue] = useState<string>('');


  const handleButtonClick = () => {
    if (!searchParams.get("filter")) {
      return;
    }
    searchParams.set("filter", "");
    history.push({
      search: searchParams.toString()
    })
    setFieldValue('');
  }


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.value);
    debounce((value: string) => {
      searchParams.set("filter", value)
      history.push({ search: searchParams.toString() });
    }, event.target.value, 1000);
  }

  return (
    isOnPage
      ? <div className="SearchField">
        <input
          type="text"
          className="SearchField__input"
          placeholder={`Search in ${location.pathname.slice(1)}...`}
          value={fieldValue || ""}
          onChange={handleInputChange}
        />
        <button
          type="button"
          className={searchParams.get("filter")
            ? "SearchField__button"
            : "SearchField__button SearchField__button--magnifier"}
          onClick={handleButtonClick}
        ></button>
      </div>
      : <span></span>

  )
}

