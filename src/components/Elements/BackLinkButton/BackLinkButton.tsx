import './BackLinkButton.scss';
import { Link } from 'react-router-dom';

export const BackLinkButton = () => {
  return (
    <Link to={`../`} className="link-back">
      <i className="icon icon--arrow-left"></i>
      Back
    </Link>
  );
};
