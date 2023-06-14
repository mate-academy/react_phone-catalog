import { Route, Routes } from 'react-router-dom';
import './base/App.scss';
import { Suspense } from 'react';
import { HomePage } from './pages/HomePage';
import { Layout } from './components/Layout';

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route
            path="/"
            element={(
              <Suspense fallback={<h1>Loading...</h1>}>
                <HomePage />
              </Suspense>
            )}
          />
          <Route path="/phones" />
          <Route path="/tablets" />
          <Route path="/accessories" />
          <Route path="/favorites" />
          <Route path="/shopping-bag" />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
