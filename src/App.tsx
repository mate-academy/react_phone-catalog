// import { Outlet } from 'react-router-dom';
// import { useContext } from 'react';

import './App.scss';
// import { Loader } from './components/Loader';

export const App = () => {
  // const { isError, isLoading } = useContext(StateStore);

  return (
    <div className="App">
      {/* <Header /> */}

      <div className="container">

        {/* {isLoading && (
          <Loader />
        )} */}

        {/* {!isLoading && (
          isError ? (
            <ErrorMessage />
          ) : (
            <Outlet />
          )
        )} */}
      </div>

      {/* <Footer /> */}
    </div>
  );
};
