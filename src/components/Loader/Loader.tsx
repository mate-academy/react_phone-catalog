import loader from '../../assets/images/loader.png';

import './Loader.scss';

export const Loader = () => (
  <img className="loader" width={100} src={loader} alt="Loading indicator" />
);
