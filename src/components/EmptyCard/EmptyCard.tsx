import './EmptyCard.scss';

export const EmptyCard: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="empty">
      <div className="empty__title">
        {`Your ${title} is empty ...`}
      </div>
    </div>
  );
};
