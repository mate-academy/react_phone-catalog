import clsx from 'clsx';
import './Loader.scss';

type Props = {
  style?: React.CSSProperties;
  classModifier?: string;
};

export const Loader: React.FC<Props> = ({ classModifier, style }) => (
  <div
    className={clsx('Loader', classModifier && classModifier)}
    data-cy="loader"
    style={{ ...style }}
  >
    <div className="Loader__content" />
  </div>
);
