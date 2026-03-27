import { BackCrumb } from '../../components/BackCrumb';
import { Breadcrumbs } from '../../components/Breadcrumbs';

type Props = {
  category: string;
};

export const ProductDetailPage = ({ category }: Props) => {
  return (
    <>
      <div className="grid">
        <Breadcrumbs />
        <BackCrumb />
        <div>{category}</div>
        <div>ProductDetailPage</div>
      </div>
    </>
  );
};
