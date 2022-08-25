import { ProductItem } from '../ProductItem/ProductItem';
import { Phone } from '../../types/Phone';
import './ProductList.scss';

type Props = {
  phoneCatalogCopy: Phone[] | null;
  perPageParam: string | null;
  pageSelected: number;
};

export const ProductList: React.FC<Props> = (
  {
    phoneCatalogCopy,
    perPageParam,
    pageSelected,
  },
) => {
  return (
    <div className="ProductList">
      {
        phoneCatalogCopy && phoneCatalogCopy.length > 0 && (
          phoneCatalogCopy
            .filter((el, index) => {
              if (!perPageParam) {
                return el;
              }

              const min = (pageSelected - 1) * Number(perPageParam);
              const max = pageSelected * Number(perPageParam);

              return index + 1 > min && index + 1 <= max;
            })
            .map(info => {
              return (
                <ProductItem info={info} key={info.id} />
              );
            })
        )
      }
    </div>
  );
};
