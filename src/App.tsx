import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.scss';
import { Navbar } from './Components/Header/Navbar';
import { Footer } from './Components/Footer/Footer';
import { SearchParameters } from './SearchParm/SearchParam';
import Loader from './Components/Loader/Loader';
import React from 'react';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div data-cy="app">
      <Navbar />
      <SearchParameters />
      {loading ? <Loader /> : <Outlet />}
      <Footer />
    </div>
  );
};
