import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './Path.scss';

type Props = {
  pathElems: string[],
  pathBoldElems: string[],
};

export const Path: React.FC<Props> = ({ pathElems, pathBoldElems }) => {
  return (
    <div className="path">
      <Link
        to="/home"
        className="path__link"
      >
        <img
          src="./img/path/pathHome.svg"
          alt="home"
          className="path__img"
        />
      </Link>
      <div className="path__arrow">{'>'}</div>
      {pathElems.map((elem, index, arr) => {
        if (arr.length - 1 > index) {
          return (
            <>
              <Link
                to={`/${elem}`}
                className={classNames(
                  'path__text',
                  { path__bold: pathBoldElems.includes(elem) },
                )}
                key={elem}
              >
                {elem}
              </Link>
              <div className="path__arrow">{'>'}</div>
            </>
          );
        }

        return (
          <Link
            to={`/${elem}`}
            className={classNames(
              'path__text',
              { path__bold: pathBoldElems.includes(elem) },
            )}
            key={elem}
          >
            {elem}
          </Link>
        );
      })}
    </div>
  );
};
