export const ErrorMessage = ({ title }: { title: string }) => {
  return (
    <div className="error">
      <p className="body-text">{title}</p>
    </div>
  );
};
