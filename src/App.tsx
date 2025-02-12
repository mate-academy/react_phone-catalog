import { Route, Routes } from 'react-router-dom';
import './App.scss';

import { Layout } from './shared/Layout';
import { HomePage } from './modules/HomePage';

export const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<h1>404 Page not found</h1>} />
      </Routes>
    </Layout>
  );
};
