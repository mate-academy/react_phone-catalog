/* eslint-disable import/no-extraneous-dependencies */
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface FavouritesIconProps {
  className?: string;
}

const FavouritesIcon = ({ className }: FavouritesIconProps) => {
  return (
    <div className={className}>
      <FavoriteBorderIcon />
    </div>
  );
};

export default FavouritesIcon;
