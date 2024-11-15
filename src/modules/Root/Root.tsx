// eslint-disable-next-line import/no-extraneous-dependencies
// import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from '../App';
export const Root = () => (
  // <Provider store={store}>
  <Router>
    <Routes>
      <Route path="/" element={<App />}></Route>
    </Routes>
  </Router>
  // </Provider>
);
