import React from 'react';

const HomePage = () => {
  const countBasketItems
    = localStorage.buy ? localStorage.buy.split('&').length : 0;

  return (
    <>
      {
        countBasketItems !== 0 && (
          <div className="header__basket--count">
            {countBasketItems !== 0 && countBasketItems}
          </div>
        )
      }

      <h1>Home</h1>
    </>
  );
};

export default HomePage;
