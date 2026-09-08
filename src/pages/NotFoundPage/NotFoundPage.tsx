import './NotFoundPage.scss';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: FC = () => (
  <div className="container">
    <p>Page not found</p>
    <Link to="/">Go to HomePage</Link>
  </div>
);
