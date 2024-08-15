import { Nav } from '../Nav';
import './Menu.scss';

type Props = {
  className?: string;
};

export const Menu: React.FC<Props> = ({ className }) => (
  <aside className={`menu ${className}`}>
    <Nav className="nav--menu" />
  </aside>
);
