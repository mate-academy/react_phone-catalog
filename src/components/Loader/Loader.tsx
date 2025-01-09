import './Loader.scss';

type Props = {
  style?: React.CSSProperties;
};

export const Loader: React.FC<Props> = ({ style }) => (
  <div className="Loader" data-cy="Loader" style={style}>
    <div className="Loader__content" />
  </div>
);
