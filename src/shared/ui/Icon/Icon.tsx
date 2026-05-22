import { Link } from 'react-router-dom';
import './Icon.scss';
import LogoSvg from '@/assets/image/logo/logo.svg?react';

type Props = {
  name: 'menu' | 'heart';
};

export const Icon: React.FC = ({ type }: Props) => {
  return (
    <>
      {type === 'button' && <button className="icon"></button>}{' '}
      {type === 'link' && <Link className="icon"></Link>}
    </>
  );
};
