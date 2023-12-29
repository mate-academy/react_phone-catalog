import { NavLink } from 'react-router-dom';
import './backlink.scss';

type Props = {
  text: string;
};

export const BackLink: React.FC<Props> = ({
  text,
}) => {
  return (
    <div className="back">
      <NavLink
        className="back__link"
        to="/"
      />
      <div className="back-arrow" />
      <h1 className="back__title">{text}</h1>
    </div>
  );
};
