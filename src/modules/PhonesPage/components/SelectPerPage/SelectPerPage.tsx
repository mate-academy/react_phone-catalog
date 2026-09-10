import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const SelectPerPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleItemsOnPage = (page: string) => {
    const params = new URLSearchParams(searchParams);

    if (page === 'all') {
      params.delete('perPage');
    } else {
      params.set('perPage', page);
    }

    params.delete('page');

    setSearchParams(params);
  };

  const perPage = searchParams.get('perPage');

  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="select" ref={selectRef}>
      <div className="select__content">
        <div
          className={
            !isActive
              ? 'select__header'
              : 'select__header select__header--active'
          }
          onClick={() => setIsActive(!isActive)}
        >
          <div className="select__value">{perPage || 'all'}</div>
          <div
            className={`select__icon icon--arrow-down ${isActive ? 'select__icon--rotate' : ''}`}
          ></div>
        </div>

        {isActive && (
          <div className="select__active-bar">
            <div className="select__active-bar-content">
              <div
                className="select__active-bar-option text-body"
                onClick={() => {
                  handleItemsOnPage('4');
                  setIsActive(false);
                }}
              >
                4
              </div>
              <div
                className="select__active-bar-option text-body"
                onClick={() => {
                  handleItemsOnPage('8');
                  setIsActive(false);
                }}
              >
                8
              </div>
              <div
                className="select__active-bar-option text-body"
                onClick={() => {
                  handleItemsOnPage('16');
                  setIsActive(false);
                }}
              >
                16
              </div>
              <div
                className="select__active-bar-option text-body"
                onClick={() => {
                  handleItemsOnPage('all');
                  setIsActive(false);
                }}
              >
                all
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectPerPage;
