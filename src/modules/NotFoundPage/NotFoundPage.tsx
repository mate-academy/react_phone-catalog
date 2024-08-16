import React from 'react';
import { Header } from '../../components/Header';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export const NotFoundPage: React.FC = () => {
  const { previousPage, setPreviousPage } = useAppContext()
  setPreviousPage(useLocation().pathname)
  console.log('location',previousPage)
    return (

      <div>
        <Header />
        <center>
          In progress
        </center>
      </div>
    );
};
