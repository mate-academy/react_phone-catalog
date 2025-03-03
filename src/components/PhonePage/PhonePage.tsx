// import { useEffect, useRef, useState } from 'react';
// import { ProductItem } from '../ProductItem/ProductItem';
import { MyDropdownItems, MyDropdownSortBy } from './DropDown/DropDow';
import './PhonePage.scss';

export const PhonesPage = () => {
  return (
    <main className="main__phonepage">
      <h1 className="mobile__title">Mobile phones</h1>
      <h1 className="mobile__models">95 models</h1>

      <div className="mobile__dropdown">
        <div className="mobile__sortby">
          <h3 className="sortby">Sort by</h3>
          <MyDropdownSortBy />
        </div>

        <div className="mobile__items">
          <h3 className="item__page">Items on page</h3>
          <MyDropdownItems />
        </div>
      </div>

      <div className="mobile__product">{/* <ProductItem /> */}</div>
    </main>
  );
};
