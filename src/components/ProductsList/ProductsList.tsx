import { FC, useState } from 'react';
import { Products } from 'src/types/products';
import style from './productList.module.scss';

import { Dropdown } from '../Dropdown/Dropdown';

type Props = {
  data: Products[];
  title: string;
};

export const ProductList: FC<Props> = ({ title, data }) => {
  const sortBy = ['Newest', 'Alphabetically', 'Cheapest'];
  const sortPage = ['16', '8', '4'];
  const [selected, setSelected] = useState('Chose One');

  return (
    <>
      <h2 className="title">{title}</h2>
      <span className={style.quantity}>{data.length}</span>
      <div className={style.drowdowns}>
        <div>
          <span>Sort by</span>
          <Dropdown sort={sortBy} selected={selected} onSelect={setSelected} />
        </div>
        <div>
          <span>Items on page</span>
          <Dropdown
            sort={sortPage}
            selected={selected}
            onSelect={setSelected}
          />
        </div>
      </div>
    </>
  );
};
