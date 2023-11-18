import {
  HashRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import App from './App';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home" element={<Navigate to="/" />} />
        <Route index element={<h1 className="title">Home page</h1>} />

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
