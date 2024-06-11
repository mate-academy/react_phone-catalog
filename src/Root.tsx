import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { ContextProvider } from './store/context';

export const Root = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
          </Route>

          <Route path="/phones" element={<App />} />
          <Route path="/favourites" element={<App />} />
          <Route path="/basket" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
};
