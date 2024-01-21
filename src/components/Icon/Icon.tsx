import { Icons } from '../../types/enums/Icons';
import './style/Icon.scss';

interface Props {
  type: Icons,
  value?: number | null,
}

export const Icon: React.FC<Props> = ({
  type = Icons.Search,
  value = null,
}) => {
  return (
    <div className="icon">
      <span className={`icon-${type}`} />
      {value && (
        <span className="icon__value">
          <span className="font_body icon__value__quantity">{value}</span>
        </span>
      )}
    </div>
  );
};
