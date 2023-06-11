import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { Layout } from './components/Layout';

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" />
          <Route path="/tablets"  />
          <Route path="/accessories" />
          <Route path="/favorites"  />
          <Route path="/shopping-bag" />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
