import { Route, Router, Routes } from 'react-router-dom';
import './base/App.scss';
import { Suspense } from 'react';
import { HomePage } from './pages/HomePage';
import { Layout } from './components/Layout';
import { Loader } from './components/Loader/Loader';

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route
            path="/"
            element={(
              <Suspense fallback={<Loader />}>
                <HomePage />
              </Suspense>
            )}
          />
          <Route path="/phones" />
          <Route path="/tablets" />
          <Route path="/accessories" />
          <Route path="/favorites" />
          <Route path="/shopping-cart" />
          <Route path="*" element={<h1>You have reached the wrong path</h1>}/>
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
