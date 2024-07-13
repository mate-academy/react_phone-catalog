import { Link } from 'react-router-dom';
import Styles from './Crumbs.module.scss';
import React from 'react';

type Props = {
  path: string[];
  details?: string;
};

export const Crumbs: React.FC<Props> = ({ path, details }) => {
  return (
    <div className={Styles.crumbs}>
      <Link to={'/'}>
        <img
          className={Styles.crumbs__item}
          src=".\img\svg\Home.svg"
          alt="home"
        />
      </Link>

      {path.map(item => {
        return (
          <React.Fragment key={item}>
            <img
              className={Styles.crumbs__item}
              src=".\img\svg\arrow_right_active.svg"
              alt="arrow right"
            />
            <Link to={`/${item}`}>
              <p className={Styles.crumbs__paragraph}>{`${item}`}</p>
            </Link>
          </React.Fragment>
        );
      })}

      {details && (
        <>
          <img
            className={Styles.crumbs__item}
            src=".\img\svg\arrow_right_active.svg"
            alt="arrow right"
          />
          <p
            className={Styles.crumbs__details}
          >{`${details.charAt(0).toUpperCase() + details.slice(1).replaceAll('-', ' ')}`}</p>
        </>
      )}
    </div>
  );
};
