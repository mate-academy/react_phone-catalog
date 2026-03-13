import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { ThemeProvaider } from './context/ThemeContext';
import { HomePage } from './modules/HomePage';

export const Root = () => {
  return (
    <ThemeProvaider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvaider>
  );
};
