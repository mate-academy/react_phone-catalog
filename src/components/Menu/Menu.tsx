import { Nav } from '../Nav';

type Props = {
  className?: string;
};

export const Menu: React.FC<Props> = ({ className }) => (
  <aside className={`menu ${className}`}>
    <Nav className="nav--menu" />
  </aside>
);
