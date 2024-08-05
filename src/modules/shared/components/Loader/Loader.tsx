import { PuffLoader } from 'react-spinners';
import './Loader.scss';

type Props = {
  heightVh: number;
};

export const Loader: React.FC<Props> = ({ heightVh }) => (
  <div className="loader" style={{ height: `${heightVh}vh` }}>
    <PuffLoader size={160} />
  </div>
);
