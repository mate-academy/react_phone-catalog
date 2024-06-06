import './MainInfo.scss';
import { ProductDetails } from '../../../../../types/ProductDetails';

type Props = {
  product: ProductDetails | null;
};

export const MainInfo: React.FC<Props> = ({ product }) => {
  const productChars = [
    { label: 'Screen', value: product?.screen },
    { label: 'Resolution', value: product?.resolution },
    { label: 'Processor', value: product?.processor },
    { label: 'RAM', value: product?.ram },
  ];

  return (
    <>
      {productChars.map(ch => (
        <div key={ch.label} className="mainInfo__block">
          <p className="mainInfo__title small-text">{ch.label}</p>
          <p className="mainInfo__info small-text uppercase">{ch.value}</p>
        </div>
      ))}
    </>
  );
};
