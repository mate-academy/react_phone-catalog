import { ButtonBack } from '../../atoms/Buttons/ButtonBack';
import { Typography } from '../../atoms/Typography/Typography';
import { Breadcrumbs } from '../BreadCrumbs/BreadCrumbs';

type Props = {
  title: string;
};

export const ProductItemTopBar: React.FC<Props> = ({ title }) => (
  <div className="flex flex-col gap-6 md:gap-10">
    <Breadcrumbs />
    <div className="flex flex-col gap-4">
      <ButtonBack />
      <Typography level="h2">{title}</Typography>
    </div>
  </div>
);
