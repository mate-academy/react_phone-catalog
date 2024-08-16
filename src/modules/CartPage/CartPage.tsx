import React from 'react';
import { Header } from '../../components/Header';
import { useLocation } from 'react-router-dom';
import { PreviousPage } from '../../components/PreviousPage';

export const CartPage: React.FC = () => {
  const category = useLocation().pathname.slice(1)
  console.log('PAGE CLICKED',category)
    return (

      <div>
        <PreviousPage category={category}/>
        <Header />
        <center>
          In progress
        </center>
      </div>
    );
};
