import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './componenst/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';

export const App = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default App;
