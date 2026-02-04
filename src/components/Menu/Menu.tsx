import MenuNav from './MenuNav/index';

type MenuProps = {
  className?: string;
};

export const Menu: React.FC<MenuProps> = ({ className }) => {
  return <MenuNav className={className} />;
};
