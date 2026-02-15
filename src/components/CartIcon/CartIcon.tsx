/* eslint-disable import/no-extraneous-dependencies */
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface CartIconProps {
  className?: string;
}

const FavouritesIcon = ({ className }: CartIconProps) => {
  return (
    <div className={className}>
      <AddShoppingCartIcon />
    </div>
  );
};

export default FavouritesIcon;
