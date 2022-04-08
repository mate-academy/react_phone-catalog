import { FunctionComponent } from 'react';

// Styles
import './Loader.scss';

export const Loader: FunctionComponent = () => (
  <div className="Loader">
    <div className="Loader__circle">
      <div className="Loader__loading" />

      <div className="Loader__center" />
    </div>
  </div>
);
