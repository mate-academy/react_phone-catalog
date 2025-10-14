import s from './ProductOptions.module.scss';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getColor } from '../../../../utils/helpers/getColor';

type Props = {
  productId: string;
  colors: string[];
  capacities: string[];
};

export const ProductOptions: React.FC<Props> = ({
  colors,
  capacities,
  productId,
}) => {
  const location = useLocation();

  const id = useMemo(() => {
    let hash = 0;

    for (let i = 0; i < productId.length; i++) {
      hash = (hash << 5) - hash + productId.charCodeAt(i);
      hash |= 0;
    }

    return Math.abs(hash);
  }, [productId]);

  const [, category, path] = location.pathname.split('/');
  const slugParts = path.split('-');

  const selectedCapacity = slugParts.find(part =>
    capacities.some(c => part.toLowerCase().includes(c.toLowerCase())),
  );

  const capacityIndex = slugParts.indexOf(selectedCapacity || '');
  const selectedColor = slugParts.slice(capacityIndex + 1).join('-');
  const baseModel = slugParts.slice(0, capacityIndex).join('-');

  const getColorLink = (color: string) =>
    `/${category}/${baseModel}-${selectedCapacity}-${color
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')}`;

  const getCapacityLink = (capacity: string) =>
    `/${category}/${baseModel}-${capacity.toLowerCase()}-${selectedColor}`;

  return (
    <div className={s.productOptions}>
      <div className={s.section}>
        <div className={s.header}>
          <div className={s.title}>Available colors</div>
          <span className={s.id}>ID:{id}</span>
        </div>

        <div className={s.colorList}>
          {colors.map(color => {
            const isActive = selectedColor === color.toLowerCase();

            return (
              <div
                key={color}
                className={`${s.colorLinkWrapper} ${isActive ? s.active : ''}`}
              >
                <Link
                  to={getColorLink(color)}
                  className={s.colorCircle}
                  style={{ backgroundColor: getColor(color) }}
                  aria-label={`Select color ${color}`}
                />
              </div>
            );
          })}
        </div>
      </div>

      <span className={s.divider}></span>

      <div className={s.section}>
        <div className={s.title}>Select capacity</div>

        <div className={s.capacityList}>
          {capacities.map(capacity => {
            const isActive = selectedCapacity === capacity.toLowerCase();

            return (
              <Link
                key={capacity}
                to={getCapacityLink(capacity)}
                className={`${s.capacityLink} ${isActive ? s.active : ''}`}
              >
                {capacity.replace(/([0-9]+)([A-Za-z]+)/, '$1 $2')}
              </Link>
            );
          })}
        </div>
      </div>

      <span className={s.divider}></span>
    </div>
  );
};
