import './PageHeading.scss';

type PageHeadingProps = {
  title: string;
  amount?: number;
};

export const PageHeading: React.FC<PageHeadingProps> = ({ title, amount }) => {
  return (
    <div className="page-heading">
      <h1 className="page-heading__title">{title}</h1>
      {amount !== undefined && amount !== 0 && (
        <p className="page-heading__description">
          {`${amount} models`}
        </p>
      )}
    </div>
  );
};
