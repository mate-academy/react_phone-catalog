import React from 'react';
import './IconsBar.scss';
import { Link } from 'react-router-dom';

type Props = {
  pageType: 'phones' | 'tablets' | 'accessories' | 'favorites' | 'cart';
};
export const IconsBar: React.FC<Props> = ({ pageType }) => {
  return (
    <div className="icons-bar">
      <Link to="/" className="icons-bar__icon icons-bar__icon--home"></Link>
      <div className="icons-bar__icon icons-bar__icon--right-arrow"></div>
      <Link to={`/${pageType}`} className="icons-bar__breadcrumb-link">
        {pageType}
      </Link>
    </div>
  );
};
