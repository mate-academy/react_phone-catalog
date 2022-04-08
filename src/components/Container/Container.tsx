import { FunctionComponent } from 'react';

import './Container.scss';

export const Container: FunctionComponent = ({ children }) => (
  <div className="Container">
    {children}
  </div>
);
