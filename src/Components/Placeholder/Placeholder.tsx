import './Placeholder.scss';

type Props = {
  title: string,
  productsCount: number,
};

export const Placeholder: React.FC<Props> = ({ title, productsCount }) => {
  return (
    <div className="placeholder">
      <h1>{title}</h1>

      <p>
        {`${productsCount} models`}
      </p>
    </div>
  );
};
