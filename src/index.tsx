import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';

const Root = () => {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
};

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);
