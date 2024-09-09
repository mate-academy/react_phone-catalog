import './App.module.scss';
import React, { useState, useEffect } from 'react';
import { Loader } from './components/Loader/Loader';
import { HomePage } from './modules/HomePage'

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <HomePage />
        </div>
      )};
    </div>
  );
};
