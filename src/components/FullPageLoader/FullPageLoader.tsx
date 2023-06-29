import { Loader } from '../UI/Loader/Loader';
import './FullPageLoader.scss';

export const FullPageLoader = () => (
  <div className="page-loader">
    <Loader width={300} />
  </div>
);
