import type { Spec } from '../../../types/Specifications';
import { Typography } from '../../atoms/Typography/Typography';

type Props = {
  specifications: Spec[];
};

export const ProductCardSpecs: React.FC<Props> = ({ specifications }) => (
  <>
    <div className="flex flex-col gap-2">
      {specifications.map(([specName, specValue]) => (
        <div
          className="flex justify-between"
          key={specName}
        >
          <Typography className="text-secondary dark:text-secondary">
            {specName}
          </Typography>
          <Typography className="text-end">{specValue}</Typography>
        </div>
      ))}
    </div>
  </>
);
