import { Loader } from '@components/UI';
import './FullPageLoader.scss';

export const FullPageLoader = () => (
  <div className="page-loader">
    <Loader width={300} />
  </div>
);
