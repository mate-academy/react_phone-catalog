import classNames from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

type Props = {
  parentClassName?: string;
};

export const Path: React.FC<Props> = ({ parentClassName = '' }) => {
  const location = useLocation();
  const paths = location.pathname.split('/');
  const navigate = useNavigate();

  return (
    <section
      className={classNames('path', {
        [`${parentClassName}__path`]: parentClassName,
      })}
    >
      <Link className="path__home" to="/" />
      {paths.map(
        part =>
          part.trim() && (
            <Fragment key={part}>
              <p className="path__arrow" />
              <p
                onClick={() => {
                  const linkPath = paths.slice(1, paths.indexOf(part) + 1);

                  if (part !== paths[paths.length - 1]) {
                    navigate('/' + linkPath.join('/'));
                  }
                }}
                className={classNames('path__name small-text', {
                  'path__name-link': part !== paths[paths.length - 1],
                })}
              >
                {part[0].toUpperCase()}
                {part.slice(1)}
              </p>
            </Fragment>
          ),
      )}
    </section>
  );
};
