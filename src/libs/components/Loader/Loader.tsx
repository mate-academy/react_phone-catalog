import './Loader.scss';

type Props = {
  type?: 'page' | 'section'
};

export const Loader:React.FC<Props> = ({
  type = 'page',
}) => {
  return (
    <div className={`loader loader--${type}`}>
      <div className="loader__content" />
    </div>
  );
};
