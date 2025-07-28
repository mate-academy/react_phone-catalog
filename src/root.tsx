import { Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './Page/HomePage/HomePage';
import { PhonesPage } from './Page/PhonesPage';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}></Route>

      <Route index element={<HomePage />} />
      <Route path="/phones" element={<PhonesPage />} />
    </Routes>
  );
};
