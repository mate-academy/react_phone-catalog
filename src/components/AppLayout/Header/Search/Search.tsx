import {useContext, useEffect, useRef, useState} from 'react';
import {IoSearch} from 'react-icons/io5';

import {ProductContext} from '../../../../context/ProductContext';

import style from './Search.module.scss';

type Props = {
  category: string;
};

export const Search: React.FC<Props> = ({category}) => {
  const [onChange, setOnChange] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const {product, setVisibleProduct} = useContext(ProductContext);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue: string = event.target.value;

    newValue = newValue.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    setOnChange(newValue);
  };

  useEffect(() => {
    setVisibleProduct(
      product.filter(p =>
        p.name.toLowerCase().includes(onChange.toLowerCase()),
      ),
    );
  }, [onChange]);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={style.search}>
      <input
        ref={inputRef}
        className={style.search__input}
        type="text"
        onChange={handleOnChange}
        value={onChange}
        placeholder={`Search in ${category}...`}
      />
      <IoSearch className={style.search__icon} onClick={handleClick} />
    </div>
  );
};
