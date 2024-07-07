import './Back.scss';
import { useLocation, useNavigate } from 'react-router-dom';

export const Back = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  function goBack() {
    if (state && state.pathname) {
      navigate({ pathname: state.pathname, search: state?.search });
    } else {
      navigate('..');
    }
  }

  return (
    <>
      <div className="back" onClick={goBack}>
        <div className="back__icon"></div>
        <p className="back__text">Back</p>
      </div>
    </>
  );
};
