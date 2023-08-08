import {
  Link,
  useParams,
} from 'react-router-dom';
import icon from '../../images/icons/home.svg';

import './style.scss';

type Props = {
  page: string,
  name?: string,
};

export const Breadcrumbs: React.FC<Props> = ({ page, name }) => {
  const { phoneId } = useParams();

  const transformFirstChar = (word: string) => (
    `${word.charAt(0).toUpperCase() + word.slice(1)}`
  );

  const linkTitle = transformFirstChar(page);

  return (
    <div className="breadcrumbs">
      <Link
        to="/"
        className="breadcrumbs__home"
      >
        <img src={icon} alt="img_Link" />
      </Link>

      {phoneId ? (
        <>
          <Link
            to={`/${page}`}
            className="breadcrumbs__link"
          >
            {linkTitle}
          </Link>

          <span className="breadcrumbs__text">
            {name}
          </span>
        </>
      ) : (
        <span className="breadcrumbs__text">{linkTitle}</span>
      )}
    </div>
  );
};
