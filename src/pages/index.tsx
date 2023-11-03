import { Route, Routes } from 'react-router-dom';
import { Default } from './Default';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Default />} />
    </Routes>
  );
};
