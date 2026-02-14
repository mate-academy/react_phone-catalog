import './EmptyMessage.module.scss';

export const EmptyMessage: React.FC<{ category: string }> = ({ category }) => (
  <div className="empty-message">There are no {category} yet 😢</div>
);
