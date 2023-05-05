import { Link, useLocation } from 'react-router-dom';

type Props = {
  productName?: string,
};

export const Breadcrumbs: React.FC<Props> = ({ productName }) => {
  const location = useLocation();
  const paths = location.pathname.split('/');

  const getCrumbElement = (path: string, text: string, isLast: boolean) => {
    return (
      <>
        <div className="icon icon--right-disabled" />
        {isLast
          ? <div className="breadcrumbs__text">{text}</div>
          : <Link to={`/${path}`} className="breadcrumbs__link">{text}</Link>}
      </>
    );
  };

  const switchCrumb = (path: string, index: number, array: string[]) => {
    const isLast = index === array.length - 1;

    switch (path) {
      case '':
        return (<Link to="/" className="icon icon--home" />);

      case 'phones':
        return getCrumbElement(path, 'Mobile phones', isLast);

      case 'tablets':
        return getCrumbElement(path, 'Tablets', isLast);

      case 'accessories':
        return getCrumbElement(path, 'Accessories', isLast);

      case 'favorites':
        return getCrumbElement(path, 'Favorites', isLast);

      default:
        return getCrumbElement(path, productName || '', true);
    }
  };

  return (
    <ul className="breadcrumbs" data-cy="breadCrumbs">
      {paths.map((item, index, items) => (
        <li key={item} className="breadcrumbs__element">
          {switchCrumb(item, index, items)}
        </li>
      ))}
    </ul>
  );
};
