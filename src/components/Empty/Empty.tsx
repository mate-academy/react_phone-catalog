import { Link } from 'react-router-dom';
import './Empty.scss';
import { ButtonMain } from '../ButtonMain';

type Props = {
  title: string;
  buttnText: string;
  img: string;
};

export const Empty: React.FC<Props> = ({ title, buttnText, img }) => {
  return (
    <div className="empty">
      <img src={img} alt=" " className="empty__image" />
      <h1 className="title">{title}</h1>

      <Link className="empty__button" to="/">
        <ButtonMain text={buttnText} />
      </Link>
    </div>
  );
};
