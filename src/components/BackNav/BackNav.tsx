import { useNavigate } from 'react-router-dom';

import './BackNav.scss';

export const BackNav = () => {
  const navigate = useNavigate();

  return (
    <nav className="back" onClick={() => navigate(-1)}>
      <div className="back__arrow"></div>
      <div className="back__text">Back</div>
    </nav>
  );
};
