import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          {/* <Route index element={DEFAULT PAGE}/> */}
        </Route>
      </Routes>
    </Router>
  );
};
