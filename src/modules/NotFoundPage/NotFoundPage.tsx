import { EmptyState } from '../shared/components/EmptyState';

export const NotFoundPage = () => (
  <div>
    <EmptyState
      className={'container'}
      title="Page not found"
      imageSrc="img/page-not-found.png"
    />
  </div>
);
