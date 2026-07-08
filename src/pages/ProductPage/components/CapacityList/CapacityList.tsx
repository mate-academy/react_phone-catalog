import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/Button';
import { ProductDetailed } from '../../../../types/product';

type Props = {
  className?: string;
  product: ProductDetailed;
};

export const CapacityList: React.FC<Props> = ({ className, product }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const basePath = location.pathname.split('/')[1] || '';

  return (
    <div className={className}>
      {product.capacityAvailable.map(el => {
        const selected = el === product.capacity;
        const route = `${product.namespaceId}-${el.toLowerCase()}-${product.color.replace(/\s+/g, '-')}`;

        const handleChoose = () => {
          navigate(`/${basePath}/${route}`);
        };

        return (
          <Button
            key={el}
            variant="secondary"
            selected={selected}
            onClick={handleChoose}
          >
            {el}
          </Button>
        );
      })}
    </div>
  );
};
