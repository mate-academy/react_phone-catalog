/* eslint-disable import/no-extraneous-dependencies */
import MenuIcon from '@mui/icons-material/Menu';

interface BurgerMeniIconProps {
  className?: string;
}

const BurgerMenuIcon = ({ className }: BurgerMeniIconProps) => {
  return (
    <div className={className}>
      <MenuIcon />
    </div>
  );
};

export default BurgerMenuIcon;
