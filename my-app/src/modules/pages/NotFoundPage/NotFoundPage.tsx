import { Link } from 'react-router-dom';
import { EmptyState } from '../../components/EmptyState';
import './NotFoundPage.scss';

export function NotFoundPage() {
  return (
    <div className="not-found-page">
      <EmptyState
        imageSrc="/img/page-not-found.png"
        title="Page not found"
        description="The page you're looking for doesn't exist."
      />
      <Link className="not-found-page__link" to="/">
        Back to home
      </Link>
    </div>
  );
}
