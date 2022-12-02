import { Link } from 'react-router-dom';

type ElementProps = {
  name: string,
  path: string,
  isLastLink: boolean,
};

export const HomeLink = () => (
  <>
    <Link
      to="/"
      className="breadcrumbs__link breadcrumbs__link--home"
    >
      {}
    </Link>
    <div className="breadcrumbs__separator">{}</div>
  </>
);

export const CategoryLink:React.FC<ElementProps> = ({
  name,
  path,
  isLastLink,
}) => (
  <>
    {isLastLink ? (
      <p className="breadcrumbs__plain-text">{name}</p>
    ) : (
      <>
        <Link
          to={path}
          className="breadcrumbs__link"
        >
          {name}
        </Link>
      </>
    )}
  </>
);

export const ProductName = ({
  name,
}: { name: string }) => (
  <>
    <div className="breadcrumbs__separator">{}</div>
    <p className="breadcrumbs__plain-text">{name}</p>
  </>
);
