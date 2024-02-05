import './product-detail.scss';

type Props = {
  title: string,
  value: string | undefined,
};

export const ProductDetail: React.FC<Props> = ({ title, value }) => {
  return (
    <div className="detail">
      <p className="detail__title">{title}</p>
      <p className="detail__value">
        {value}
      </p>
    </div>
  );
};
