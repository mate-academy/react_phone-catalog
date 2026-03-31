import './EmptyState.scss';

interface Props {
  imageSrc: string;
  title: string;
  description?: string;
}

export function EmptyState({ imageSrc, title, description }: Props) {
  return (
    <div className="empty-state">
      <img className="empty-state__image" src={imageSrc} alt={title} />
      <h2 className="empty-state__title">{title}</h2>
      {description && (
        <p className="empty-state__description">{description}</p>
      )}
    </div>
  );
}
