import { FC } from 'react';

// Styles
import './Loader.scss';

export const Loader: FC = () => (
  <div className="loader">
    <div className="loader__circle">
      <div className="loader__loading" />

      <div className="loader__center" />
    </div>
  </div>
);
