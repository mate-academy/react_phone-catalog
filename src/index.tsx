import ReactDOM from 'react-dom';
import { Root } from './Root';

const root = document.getElementById('root');

if (root) {
  // eslint-disable-next-line react/no-deprecated
  ReactDOM.render(<Root />, root);
}
