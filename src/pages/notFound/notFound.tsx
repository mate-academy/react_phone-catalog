import { useNavigate } from 'react-router-dom';
import notfoundImg from '../../img/page-not-found.png';
import { useEffect } from 'react';

export const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 5000);
  });

  return (
    <div className="not-found">
      <img className="not-found__img" src={notfoundImg} alt="" />
    </div>
  );
};
