import { Link } from 'react-router-dom';
import { useCurrentPath } from '../contexts/PathContext';
import './breadcrumbsNav.scss';

export const BreadcrumbsNav: React.FC = () => {
  const currentPath = useCurrentPath();

  const parts = currentPath.split('/');
  const back = `/${parts[1]}`;

  const pageCategory = parts[1]?.replace(/^./, l => l.toUpperCase());

  const modelName = parts[2]
    ?.split('-')
    .map(word => {
      if (word.toLowerCase().endsWith('gb')) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');

  return (
    <div className="breadcrumbsNav-block">
      <div className="breadcrumbs-navigation">
        <Link to={'/'} className="homeLinck icon">
          <img src="/img/icons/Home.svg" alt="Home Page icon" />
        </Link>

        <img src="/img/icons/NotActiveArrowRight.svg" alt="arrow icon" />

        <Link to={back} className="breadcrumbs-link">
          {pageCategory}
        </Link>

        {modelName && (
          <img src="/img/icons/NotActiveArrowRight.svg" alt="arrow icon" />
          )}

        {modelName && <div className="model-name">{modelName}</div>}
      </div>


      <div className="button-back-block">
        <Link to={back} className="icon">
          <img src="/img/icons/ArrowLeft.svg" alt="arrow icon" className='icon' />
        </Link>

        <Link to={back} className="breadcrumbs-link">
          <div className='back-text'>Back</div>
        </Link>
      </div>

    </div>
  );
};
