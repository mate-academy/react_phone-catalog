import { Link } from 'react-router-dom';
import './WayFromHome.scss';
import { Fragment } from 'react';

type Props = {
  lastPoint: string,
  interimPoints?: { text: string, link: string }[],
};

export const WayFromHome: React.FC<Props> = ({
  lastPoint, interimPoints,
}) => {
  return (
    <div className="way" data-cy="breadCrumbs">
      <Link
        to="/"
        aria-label="to home"
        title="go to home"
        className="way__home way__icon16"
      />

      <div className="way__arrow-right way__icon16" />

      {!!interimPoints && interimPoints.map(tab => (
        <Fragment key={tab.link}>
          <Link
            to={tab.link}
            className="way__name way__link"
          >
            {tab.text}
          </Link>

          <div className="way__arrow-right way__icon16" />
        </Fragment>
      ))}

      <p className="way__name">{lastPoint}</p>
    </div>
  );
};
