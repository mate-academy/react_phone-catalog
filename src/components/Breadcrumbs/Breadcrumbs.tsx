import { Link } from 'react-router-dom';
import { getCorrectPathname } from '../../helpers/calc/helper';
import './style.scss';

type BreadcrumbsProps = {
  pathes: string[]
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  pathes,
}) => {
  const pathesLength = pathes.length;

  return (
    <div className="App__breadcrumb">
      <div className="breadcrumb">
        <Link to="/" className="icon icon--house" />
        {pathes.map((path, index) => {
          const correctPath = getCorrectPathname(path);
          const isPathArray = Array.isArray(correctPath);
          const correctLink = isPathArray ? correctPath[1] : path;
          const correctText = isPathArray ? correctPath[0] : path;

          if (index === pathesLength - 1) {
            return (
              <div
                key={correctLink}
                className="breadcrumb__part"
              >
                <i className="icon icon--arrow-right--disabled" />
                <p className="breadcrumb__text">
                  {correctText}
                </p>
              </div>
            );
          }

          return (
            <div className="breadcrumb__part">
              <i className="icon icon--arrow-right--disabled" />
              <Link
                key={path}
                to={correctLink}
                className="breadcrumb__link"
              >
                {correctText}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
