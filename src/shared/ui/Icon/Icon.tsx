import { Link } from 'react-router-dom';
import './Icon.scss';

type Props = {
  name: 'menu' | 'heart';
};

export const Icon: React.FC<Props> = ({ name }: Props) => {
  return (
    <>
      {name === 'menu' && <button className="icon"></button>}{' '}
      {name === 'heart' && <Link to={'/'} className="icon"></Link>}
    </>
  );
};
