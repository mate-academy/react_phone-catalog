import React from 'react';
import './NoResults.scss';
import { Link } from 'react-router-dom';

type Props = {
  categoryName: string;
};

export const NoResults: React.FC<Props> = ({ categoryName }) => {
  return (
    <div className="no-results">
      <h1 className="no-results__title">{`${categoryName} not found`}</h1>
      <p className="no-results__suggest">
        Would you like to see our <Link to="/shop/phone">phone</Link> or{' '}
        <Link to="/shop/tablet">tablet</Link> catalog? Or just go to{' '}
        <Link to="/">home page</Link>?
      </p>
    </div>
  );
};
