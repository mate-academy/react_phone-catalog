import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { MenuMobile } from './components/MenuMobile/MenuMobile';

import './App.scss';

const App = () => {
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  return (
    <div className="App">
      <Layout
        onMobileClicked={setIsMenuClicked}
      >
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>

      <MenuMobile
        isMenuClicked={isMenuClicked}
        setIsMenuClicked={setIsMenuClicked}
      />
    </div>
  );
};

export default App;
