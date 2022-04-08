import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import './Logo.scss';

export const Logo: FunctionComponent = () => (
  <Link to="/" className="Logo" />
);
