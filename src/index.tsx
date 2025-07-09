// import ReactDOM from 'react-dom';
// import { Root } from './Root';
// // eslint-disable-next-line
// ReactDOM.render(<Root />, document.getElementById('root'));

import ReactDOM from 'react-dom/client';
import { Root } from './Root';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(<Root />);
