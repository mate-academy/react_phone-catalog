import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { ContextProvider } from './ContextProvider';
import { PhonePage } from './modules/PhonesPage';

export const Root = () => (
  <ContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" />} />
          <Route path="phones" element={<PhonePage />}>
            {/*<Route path=":product" element={<PhonePage />} />*/}
          </Route>
          {/*<Route path="*" element={<Navigate to="/" />} />*/}
        </Route>
      </Routes>
    </Router>
  </ContextProvider>
);
