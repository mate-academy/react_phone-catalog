import { Ping } from '@uiball/loaders';
import './Loader.scss';

export const Loader = () => (
  <div className="loader">
    <Ping
      size={65}
      speed={1.8}
      color="black"
    />
  </div>
);
