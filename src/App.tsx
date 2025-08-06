// import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';

import { Header } from './components/Header';

// import { PhoneInfoType } from './types/PhoneInfoType';
// import { TabletInfoType } from './types/TabletInfoType';
// import { AccessoryInfoType } from './types/AccessoryInfoType';

import './styles/style.scss';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage/HomePage';
import { ProductCategoryPage } from './components/ProductCategoryPage';
import { ProductInfoPage } from './components/ProductInfoPage';

import { PathProvider } from './components/contexts/PathContext';

// import { useLocation, useSearchParams } from 'react-router-dom';

export const App = () => {
  // const location = useLocation();
  // const [, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   if (location.pathname === '/') {
  //     setSearchParams({});
  //   }
  // }, [location.pathname]);

  return (
    <PathProvider>
      <div className="App">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} >

              <Route path="/:category" >
                <Route index element={<ProductCategoryPage />} />

                <Route path="/:productId" element={<ProductInfoPage />} />

              </Route>

            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </PathProvider>
  );
};
