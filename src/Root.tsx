import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';

export const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/phones" element={<App />} />
        <Route path="/favourites" element={<App />} />
        <Route path="/basket" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};
