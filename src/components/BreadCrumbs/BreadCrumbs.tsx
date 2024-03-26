import React from 'react';
import { Link } from 'react-router-dom';
import './BreadCrumbs.scss';

type Props = {
  link?: string;
  name: string;
};

export const BreadCrumbs: React.FC<Props> = ({ link, name }) => {
  return (
    <div className="page__brad-crumbs brad-crumbs" data-cy="breadCrumbs">
      <Link to="/">
        <i className="ico ico-home" />
      </Link>
      {link && (
        <>
          <i className="ico ico-right" />
          <Link to={`../${link}`} className="brad-crumbs__cat-name">
            {link}
          </Link>
        </>
      )}
      <i className="ico ico-right" />
      <p className="brad-crumbs__name">{name}</p>
    </div>
  );
};
