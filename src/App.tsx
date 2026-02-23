import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/NotFoundPage';
import { Layout } from './components/Layout';

export const App = () => (
  <div className="App">
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
    </HashRouter>
  </div>
);
