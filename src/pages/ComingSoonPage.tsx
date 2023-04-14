type Props = {
  text: string,
};

export const NonePage: React.FC<Props> = ({ text }) => {
  return (
    <main className="coming-soon-page">
      <div className="coming-soon-page__title">
        {text}
      </div>
    </main>
  );
};
