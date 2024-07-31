import { createContext, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { Menu } from './components/Menu';
import { NotFoundPage } from './components/NotFoundPage';

interface Context {
  updatedAt: Date;
  setUpdatedAt: (date: Date) => void;
}

export const AppContext = createContext<Context>({
  updatedAt: new Date(),
  setUpdatedAt: () => {},
});

export const Root = () => {
  const [updatedAt, setUpdatedAt] = useState<Date>(new Date());

  const data = {
    updatedAt,
    setUpdatedAt,
  };

  return (
    <AppContext.Provider value={data}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="/menu" element={<Menu />} />
        </Routes>
      </HashRouter>
    </AppContext.Provider>
  );
};
