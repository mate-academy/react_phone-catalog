import { memo } from 'react';
import { ColorRing } from 'react-loader-spinner';
import './Spinner.scss';

export const Spinner = memo(() => (
  <div className="spinner">
    <ColorRing
      height="120"
      width="120"
      ariaLabel="loading"
    />
  </div>
));
