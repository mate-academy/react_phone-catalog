import classNames from 'classnames';
import './loader.scss';

type Props = {
  fullPage?: boolean,
};

export const Loader: React.FC<Props> = ({ fullPage }) => {
  return (
    <div className={classNames('loader', {
      'loader--full-page': fullPage,
    })}
    >
      <div className="loader__content" />
    </div>
  );
};
