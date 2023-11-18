import {
  Navigate,
  Route,
  Routes,
  HashRouter as Router,
} from 'react-router-dom';
import { App } from './App';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home" element={<Navigate to="/" />} />
        <Route index element={<h1 className="title">Home page</h1>} />
        <Route path="phones" element={<h1 className="title">Phones</h1>} />
        <Route path="tablets" element={<h1 className="title">Tablets</h1>} />
        <Route
          path="accessories"
          element={<h1 className="title">Accessories</h1>}
        />

        {/* <Route
          path="tabs"
          element={<h1 className="title">Tabs page</h1>}
        >
          <Route path=":tabId?" element={<TabsSection />} />
        </Route> */}

        <Route
          path="*"
          element={<h1 className="title">Page not found</h1>}
        />
      </Route>
    </Routes>
  </Router>
);
