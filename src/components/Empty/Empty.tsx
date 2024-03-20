import { Link } from 'react-router-dom';
import './Empty.scss';
import { ButtonMain } from '../ButtonMain';

type Props = {
  title: string;
  buttonText: string;
  img: string;
};

export const Empty: React.FC<Props> = ({ title, buttonText, img }) => {
  return (
    <div className="empty">
      <img src={img} alt=" " className="empty__image" />
      <h1 className="title">{title}</h1>

      <Link to="/" className="empty__button">
        <ButtonMain text={buttonText} />
      </Link>
    </div>
  );
};
