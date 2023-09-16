// import { createRoot } from 'react-dom/client';
// import { Root } from './Root';

// const container = document.getElementById('root') as HTMLDivElement;

// createRoot(container).render(<Root />);

import ReactDOM from 'react-dom';
import { Root } from './Root';

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);
