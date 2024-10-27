import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { ContextProvider } from './ContextProvider';

export const Root = () => (
  <ContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  </ContextProvider>
);
