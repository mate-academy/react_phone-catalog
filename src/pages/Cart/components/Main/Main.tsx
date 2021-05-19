import React from 'react';

import { Back } from '../../../ProductDetailsPage/Back/Back';
import { CartBlock } from '../CartBlock/CartBlock';
import './Main.scss';

export const Main = () => {
  return (
    <main className="Main">
      <div className="Main-Container">
        <Back />
        <h1 className="Cart-Title">
          Cart
        </h1>
        <CartBlock />
      </div>
    </main>
  );
};
