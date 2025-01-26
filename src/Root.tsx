import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { PeopleProvider } from './context/PeopleContext';
import { HomePage } from './components/HomePage/HomePage';
import { Phones } from './components/Phones/Phones';

export const Root = () => (
  <Router>
    <PeopleProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/phones" element={<Phones />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          {/* <Route path="people">
            <Route path=":slug?" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
      </Routes>
    </PeopleProvider>
  </Router>
);
