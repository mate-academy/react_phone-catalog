import React from 'react';

const HomePage = () => (
  <>
    {
      localStorage.length !== 0 && (
        <div className="header__basket--count">
          {localStorage.length !== 0 && localStorage.length - 1}
        </div>
      )
    }

    <h1>Home</h1>
  </>
);

export default HomePage;
