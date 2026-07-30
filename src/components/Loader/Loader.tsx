import MoonLoader from 'react-spinners/MoonLoader';
import './Loader.scss';

export const Loader = () => {
  return (
    <div className="loader">
      <MoonLoader color="#313237" size={50} />
    </div>
  );
};
