import { useNavigate } from 'react-router-dom';
import './NotFound.scss';

type Props = {
  title: string;
};

export const NotFound: React.FC<Props> = ({ title }) => {
  const navigate = useNavigate();
  const handleNavigate = () => navigate('/');

  return (
    <div className="not-found">
      <div className="not-found__container">
        <h2 className="not-found__title">Page not found</h2>
      </div>
      <button className="cart__button" type="button" onClick={handleNavigate}>
        {title}
      </button>
      <img
        src="./img/product-not-found.png"
        alt="NotFound"
        className="not-found--background"
      />
    </div>
  );
};
