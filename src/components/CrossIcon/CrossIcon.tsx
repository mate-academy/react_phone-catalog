/* eslint-disable import/no-extraneous-dependencies */
import CloseIcon from '@mui/icons-material/Close';

interface CrossIconProps {
  className?: string;
}

const CrossIcon = ({ className }: CrossIconProps) => {
  return (
    <div className={className}>
      <CloseIcon />
    </div>
  );
};

export default CrossIcon;
