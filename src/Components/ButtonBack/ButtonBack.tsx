import { Link } from 'react-router-dom';

import './buttonBack.scss';

export const ButtonBack = () => {
  return (
    <Link to="-1" className="back">
      <div className="back--icon icon" />

      <p className="back--title">Back</p>
    </Link>
  );
};
