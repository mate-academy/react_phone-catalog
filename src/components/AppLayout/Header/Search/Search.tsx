import { useContext, useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';

import { ProductContext } from '../../../../context/ProductContext';

import style from './Search.module.scss';

type Props = {
  category: string;
};

export const Search: React.FC<Props> = ({ category }) => {
  // const [product, setProduct] = useState<Products[]>([]);
  const [onChange, setOnChange] = useState('');

  const { product, setVisibleProduct } = useContext(ProductContext);

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

  return (
    <div className={style.search}>
      <input
        className={style.search__input}
        type="text"
        onChange={handleOnChange}
        value={onChange}
        placeholder={`Search in ${category}...`}
      />
      <IoSearch className={style.search__icon} />
    </div>
  );
};
