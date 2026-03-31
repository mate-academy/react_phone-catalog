import { Link } from 'react-router-dom';
import './Breadcrumbs.scss';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: Props) => {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link to="/" className="breadcrumbs__link breadcrumbs__link--home">
        Home
      </Link>

      {items.map((item) => (
        <span key={item.label} className="breadcrumbs__segment">
          <span className="breadcrumbs__separator">›</span>
          {item.to ? (
            <Link to={item.to} className="breadcrumbs__link">
              {item.label}
            </Link>
          ) : (
            <span className="breadcrumbs__current">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};
