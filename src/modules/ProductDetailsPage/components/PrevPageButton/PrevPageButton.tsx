import { useNavigate } from 'react-router-dom';

import classes from './PrevPageButton.module.scss';

export const PrevPageButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={classes.PrevPageButton}
      onClick={() => navigate(-1)}
    >
      Back
    </button>
  );
};
