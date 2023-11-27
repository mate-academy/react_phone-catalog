import './Loader.scss';

type LoaderProps = {
  width: number;
};

export const Loader = ({ width }: LoaderProps) => (
  <img
    className="loader"
    width={width}
    src="img/loader.png"
    alt="Loading indicator"
  />
);
