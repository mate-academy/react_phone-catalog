import React, { Fragment } from 'react';
import './Breadcrumbs.scss';
import classNames from 'classnames';

type Props = {
  paths: string[];
};

export const Breadcrumbs: React.FC<Props> = ({ paths }) => {
  return (
    <div className="breadcrumbs">
      <img src="/icons/home.svg" alt="" />
      {paths.map((path, index) => (
        <Fragment key={index}>
          <img src="/icons/breadcrumbs_arrow_right.svg" alt="Arrow right" />
          <div
            className={classNames('breadcrumbs__path small-text', {
              'breadcrumbs__path--black': paths.length > 1 && index === 0,
              'breadcrumbs__path--last': index === paths.length - 1,
            })}
          >
            {path}
          </div>
        </Fragment>
      ))}
    </div>
  );
};
