/* eslint-disable import/no-extraneous-dependencies */
import SavedSearchIcon from '@mui/icons-material/SavedSearch';

interface SearchIconProps {
  className?: string;
}

const SearchIcon = ({ className }: SearchIconProps) => {
  return (
    <div className={className}>
      <SavedSearchIcon />
    </div>
  );
};

export default SearchIcon;
