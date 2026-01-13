import { EmptyState } from '../../components/EmptyState';

export const NotFoundPage: React.FC = () => (
  <EmptyState
    message="404 — Page Not Found"
    imageSrc="/public/img/page-not-found.png"
    alt="Page Not Found"
  />
);
