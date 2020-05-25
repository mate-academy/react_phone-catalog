import React, { useState } from 'react';
import {useHistory, useLocation} from 'react-router-dom';

export const Search = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);


  const handleChange = (value: string): void => {
    setInputValue(value);
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if(inputValue.length) {
      searchParams.set('query',inputValue);
    } else {
      searchParams.delete('query');
    }
    history.push({
      search: searchParams.toString()
    })
  }

  return (
    <div className="customer-section__search">
      <form className="customer-section__form" onSubmit={handleSubmit}>
      <input type="text"
        className="search__input"
        name="search"
        placeholder=""
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
    />
    <button
      type="submit"
      className="customer-section__item--search">
    </button>
      </form>
    </div>
  )
}


//autocomplete="off"
/*
const [inptValue, setInputValue] = useState<string>('')

  const handleChange = (value: string): void => {
    setInputValue(value)
    console.log(value);
  }

  const handleSubmit = (e: React.FormEvent): void => {
    console.log('123');
    e.preventDefault();
  }


<form onSubmit={handleSubmit}>

<input type="text"
  className="search__input"
  name="search"
  placeholder=""


/>

<button type="submit" className="customer-section__item--search">
  </button>
</form>*/
