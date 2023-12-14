import './App.scss';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Footer } from './Components/Footer/Footer';
import { Header } from './Components/Header/Header';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  return (
    <body className="body">
      <div className="App">
        <Header />

        <ScrollToTop />
        <body className='body'>
          <Outlet />
        </body>
        <Footer />
      </div>
    </body>

  );
};

export default App;
