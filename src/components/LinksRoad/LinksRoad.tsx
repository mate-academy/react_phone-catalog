import { Link } from 'react-router-dom';
import './LinksRoad.module.scss';
import HomeIcon from '../../../public/img/icons/Home.svg';
import Chevron from '../../../public/img/icons/Chevron (Arrow Right gray).svg';

interface LinksRoadProps {
  category?: string;
  productTitle?: string;
}

export const LinksRoad: React.FC<LinksRoadProps> = ({
  category,
  productTitle,
}) => {
  const crumbs: { label: React.ReactNode; path: string }[] = [
    {
      label: <img src={HomeIcon} alt="home icon" className="breadcrumb_img" />,
      path: '/',
    },
  ];

  if (typeof category === 'string') {
    crumbs.push({
      label: category.charAt(0).toUpperCase() + category.slice(1),
      path: `/${category}`,
    });
  }

  if (productTitle) {
    crumbs.push({
      label: productTitle,
      path: '',
    });
  }

  return (
    <nav className="breadcrumb">
      {crumbs.map((crumb, index) => (
        <span key={index} className="breadcrumb_item">
          {crumb.path ? (
            <Link to={crumb.path} className="breadcrumb_link">
              {crumb.label}
            </Link>
          ) : (
            <span className="breadcrumb_link">{crumb.label}</span>
          )}
          {index < crumbs.length - 1 && (
            <img className="breadcrumb_separator" src={Chevron} alt="Chevron" />
          )}
        </span>
      ))}
    </nav>
  );
};
