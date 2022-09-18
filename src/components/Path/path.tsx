import { Link } from 'react-router-dom';
import React, { useMemo } from 'react';
import classNames from 'classnames';

import './Path.scss';

type Props = {
  pathElems: string[],
  pathBoldElems: string[],
};

export const Path: React.FC<Props> = ({ pathElems, pathBoldElems }) => {
  const prepPathElems = useMemo(() => pathElems.map(elem => (
    elem[0].toUpperCase() + elem.slice(1))), [pathElems]);
  const prepPathBoldElems = useMemo(() => pathBoldElems.map(elem => (
    elem[0].toUpperCase() + elem.slice(1))), [pathBoldElems]);

  return (
    <div className="path">
      <Link
        to="/home"
        className="path__link"
      />
      <div className="path__arrow" />
      {prepPathElems.map((elem, index, arr) => {
        if (arr.length - 1 > index) {
          return (
            <React.Fragment key={elem}>
              <Link
                to={`/${elem}`}
                className={classNames(
                  'path__text',
                  { path__bold: prepPathBoldElems.includes(elem) },
                )}
                key={elem}
              >
                {elem}
              </Link>
              <div className="path__arrow" />
            </React.Fragment>
          );
        }

        return (
          <p
            className={classNames(
              'path__text',
              { path__bold: pathBoldElems.includes(elem) },
            )}
            key={elem}
          >
            {elem}
          </p>
        );
      })}
    </div>
  );
};
