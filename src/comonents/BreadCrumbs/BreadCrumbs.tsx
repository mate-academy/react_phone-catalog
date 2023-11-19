import { Link } from 'react-router-dom';
import './BreadCrumbs.scss';

type Props = {
  linkName: string,
};

export const BreadCrumbs: React.FC<Props> = ({ linkName }) => {
  return (
    <div className="bread-crumbs">
      <Link to="/">
        <span className="icon icon--home" />
      </Link>

      <span className="icon icon--arrow-dis icon--next" />

      <p
        className="text text--small text--gray"
      >
        {linkName}
      </p>
    </div>
  );
};
