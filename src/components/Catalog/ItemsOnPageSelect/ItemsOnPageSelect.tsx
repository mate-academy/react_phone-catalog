import React from 'react';
import './ItemsOnPageSelect.scss';
import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export const ItemsOnPageSelect = () => {
  const perPageOptions = ['8', '16', '32', '64', 'All'];
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [pseudoSelectValue, setPseudoSelectValue] = useState<string>();

  useEffect(() => {
    if (!searchParams.get('per_page')) {
      setPseudoSelectValue('8')
    } else {
      setPseudoSelectValue(searchParams.get('per_page') || undefined);
    }
  }, [searchParams])

  const handleOptionClick = (item: string) => {
    searchParams.set("per_page", item);
    history.push({
      search: searchParams.toString()
    });
    setIsOpen(false);
    setPseudoSelectValue(item)
  }

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (event.target === document
        .querySelector('.ItemsOnPageSelect__pseudo-select')) {
        setIsOpen(!isOpen);
      }
      if (event.target !== document
        .querySelector('.ItemsOnPageSelect__pseudo-select')
        && event.target !== document
          .querySelector('.ItemsOnPageSelect__option')) {
        setIsOpen(false);
      }
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  })

  return (
    <div className="ItemsOnPageSelect">
      <span className="ItemsOnPageSelect__legend">Items on page</span><br></br>
      <div
        className={isOpen
          ? "ItemsOnPageSelect__pseudo-select ItemsOnPageSelect__pseudo-select--open"
          : "ItemsOnPageSelect__pseudo-select"}>
        {pseudoSelectValue}
        <div
          className={isOpen
            ? "ItemsOnPageSelect__options-wrapper"
            : "ItemsOnPageSelect__options-wrapper ItemsOnPageSelect__options-wrapper--invisible"}
        >
          {perPageOptions.map(item => (
            <span
              onClick={() => { handleOptionClick(item) }}
              className="ItemsOnPageSelect__option"
              key={item}
            >{item}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

