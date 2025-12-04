import { useEffect, useRef } from 'react';
import s from './Dropdown.module.scss';
import { useSearchParams } from 'react-router-dom';

type Props = {
  type: 'sort'|'perPage',
  openFilter : string,
  setOpenFilter : (value: string) => void
};

export const Dropdown: React.FC<Props> = ({
  type,
  openFilter,
  setOpenFilter,
}) => {
  const getFilterList = (type: string) =>
    type === 'sort'
      ? ['Cheapest', 'Alphabetical', 'Newest']
      : ['all', '4', '8', '16'];

  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get(type);
  const isOpen = (type === openFilter);
  const filterList = getFilterList(type);
  const filterParam = param || filterList[0];

  const handleToggler = () => {
    setOpenFilter(isOpen ? '' : type);
    searchParams.set('page', '1');

  };

  const handleParam = (value: string) =>{
    const newParams = new URLSearchParams(searchParams);

    value === 'all'? newParams.delete(type) : newParams.set(type, value);
    setSearchParams(newParams);
    setOpenFilter('');
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenFilter('');
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    };
  }, [isOpen, setOpenFilter]);

  return(
    <div className={s.dropdown} ref={dropdownRef}>
      <div 
        className={`${s.dropdown__button} ${isOpen ? s['dropdown__button--open']: null}`}
        onClick={()=> {
handleToggler()
}}
      >
        <p className={s['dropdown__button-title']}>{filterParam}</p>
        <img className={s['dropdown__button-icon']} src={isOpen ? "/img/icons/up.svg" :"/img/icons/down.svg" }alt="down" />
      </div>

      <ul className={`${s.dropdown__list} ${isOpen? s['dropdown__list--open'] : null}`}>
        {filterList.map((value)=>{
          return (
            <li 
              className={`${s.dropdown__item} ${filterParam === value ? s['dropdown__item--active'] : null}`} 
              key={value}
              onClick={()=>handleParam(value)}
            >
              {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
