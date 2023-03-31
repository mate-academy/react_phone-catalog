import { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  lastPage: string,
  link?: string | null,
  type?: string | null,
};

export const History: FC<Props> = ({
  lastPage,
  link,
  type,
}) => (
  <div
    className="history history--current"
    data-cy="breadCrumbs"
  >
    <Link className="history__home" to="/" replace />
    {link && (
      <>
        <span className="history__arrow history__arrow--next" />
        <Link
          className="history__page"
          to={`/${link}`}
        >
          {type}
        </Link>
      </>
    )}

    <span className="history__arrow history__arrow--next" />
    <p
      className="history__page history__page--last"
    >
      {lastPage}
    </p>
  </div>
);

History.defaultProps = {
  link: null,
  type: null,
};
