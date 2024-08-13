import React, { useState } from 'react';
import './Catalog';
import { PhoneTablet } from '../../types/PhoneTablet';
import { Accessories } from '../../types/Accessoreies';
import { useNavigate } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Menu } from '../Menu/Menu';

type Props = {
  products: PhoneTablet[] | Accessories[];
};

export enum ElementsPerPage {
  three = 3,
  five = 5,
  ten = 10,
  twenty = 20,
}

export const Catalog: React.FC<Props> = ({ products }) => {
  const [page, setPage] = useState(1);
  const [elemsPerPage, setElemsPerPage] = useState(ElementsPerPage.five);
  const navigate = useNavigate();
  const lastPage: number = +products.length;
  let itemsAndPage = [];

  function getElentsPerPageInUrl(value: number) {
    navigate(`?page=${page}&perPage=${value}`);
  }

  if (page === 1) {
    itemsAndPage = products.slice(0, elemsPerPage);
  } else {
    itemsAndPage = products.slice(
      (page - 1) * elemsPerPage,
      Math.min(elemsPerPage * page, lastPage),
    );
  }

  return (
    <div className="Catalog">
      <Header />
      <Menu />
      {/* <Outlet /> */}
      <select
        data-cy="perPageSelector"
        id="perPageSelector"
        className="form-control"
        onChange={event => {
          setPage(1);
          setElemsPerPage(+event.target.value);
          getElentsPerPageInUrl(+event.target.value);
        }}
      >
        <option value="3">{ElementsPerPage.three}</option>
        <option value="5" selected>
          {ElementsPerPage.five}
        </option>
        <option value="10">{ElementsPerPage.ten}</option>
        <option value="20">{ElementsPerPage.twenty}</option>
      </select>
      {itemsAndPage.map(item => (
        <div key={item.id}>{item.id}</div>
      ))}
    </div>
  );
};
