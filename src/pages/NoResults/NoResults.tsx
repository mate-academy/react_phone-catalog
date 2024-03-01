type Props = {
  headline?: string,
};

export const NoResults: React.FC<Props> = ({
  headline = 'Page not found',
}) => {
  return (
    <div
      className="commonPage-container font-header"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px',
      }}
    >
      {headline}
    </div>
  );
};
