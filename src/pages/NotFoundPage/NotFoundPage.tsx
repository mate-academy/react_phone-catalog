import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './NotFoundPage.scss';

export const NotFoundPage: React.FC = () => {
  const [counter, setCounter] = useState(5);
  const [showCounter, setShowCounter] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const intialTimer = setTimeout(() => {
      setShowCounter(true);
    }, 2000);

    return () => clearTimeout(intialTimer);
  }, []);

  useEffect(() => {
    if (showCounter) {
      if (counter === 0) {
        navigate('/');
      }

      const timer = setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    return () => {};
  }, [counter, showCounter, navigate]);

  return (
    <section className="NotFoundPage Main__notFoundPage">
      <h1>Page not found :/</h1>
      <Link to="/" className="NotFoundPage__link">
        Go home page
      </Link>
      {showCounter && (
        <p className="NotFoundPage__info">
          Redirecting to the Home Page in {counter}... seconds
        </p>
      )}
    </section>
  );
};
