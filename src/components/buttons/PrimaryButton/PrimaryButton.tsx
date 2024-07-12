import { Link } from 'react-router-dom';

import classes from './PrimaryButton.module.scss';

type Props = {
  link: string;
  text: string;
};

export const PrimaryButton: React.FC<Props> = ({ link, text }) => {
  return (
    <Link to={link} className={classes.PrimaryButton}>
      {text}
    </Link>
  );
};
