import MenuNav from './MenuNav/index';

type MenuProps = {
  className?: string;
  handleMenuClick?: () => void;
};

export const Menu: React.FC<MenuProps> = ({ className, handleMenuClick }) => {
  return <MenuNav className={className} handleMenuClick={handleMenuClick} />;
};
