import { HashRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
    </Routes>
  </HashRouter>
);
