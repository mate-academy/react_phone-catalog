import { Link } from 'react-router-dom';
import './BackLink.scss';

export const BackLink = () => (
  <Link
    to={`../`}
    className='link-back'
  >
    <i className="icon icon--arrow-left"></i>
    Back
  </Link>
)
