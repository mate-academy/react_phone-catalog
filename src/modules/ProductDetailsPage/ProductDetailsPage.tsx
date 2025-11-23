import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Accessory, Phone, Tablet } from '../../api/types';
import { DataContext } from '../../context/ContextProvider';
import scss from './ProductDetailsPage.module.scss';
import { Loader } from '../shared/components/Loader';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ButtonBack } from '../shared/components/ButtonBack';
import { ProductGallery } from './components/ProductGallery/ProductGallery';
import { ColorSelection } from './components/ColorSelection/ColorSelection';
import { COLOR_MAP } from './utility/colorMap';

export const ProductDetailsPage = () => {
  const [item, setItem] = useState<Phone | Tablet | Accessory | undefined>(
    undefined,
  );
  const [isError, setIsError] = useState<boolean>(false);
  const [color, setColor] = useState<keyof typeof COLOR_MAP | null>(null);
  const { category, productId } = useParams();
  const { phones, tablets, accessories, products, isLoading } =
    useContext(DataContext);
  const idForCart = useMemo(() => {
    const found = products.find(p => p.itemId === productId);

    return found ? found.id : 0;
  }, [products, productId]);

  useEffect(() => {
    let listToSearch: Phone[] | Tablet[] | Accessory[] = [];

    switch (category) {
      case 'phones':
        listToSearch = phones;
        break;
      case 'tablets':
        listToSearch = tablets;
        break;
      case 'accessories':
        listToSearch = accessories;
        break;
      default:
        setIsError(true);
        // eslint-disable-next-line no-console
        console.error('Unknown category:', category);

        return;
    }

    if (listToSearch && listToSearch.length > 0) {
      const detailProd = listToSearch.find(prod => prod.id === productId);

      if (detailProd) {
        setItem(detailProd);
        setColor(detailProd.color);
        setIsError(false);
      } else {
        setItem(undefined);
        setColor(null);
        setIsError(true);
        // eslint-disable-next-line no-console
        console.error('Product was not found -->', productId);
      }
    }
  }, [phones, tablets, accessories, productId, category]);

  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className={scss.errorNotification}>
        <h2>Product was not found</h2>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={scss.errorNotification__button}
        >
          Go back to previous page
        </button>
      </div>
    );
  }

  if (item === undefined || color === null) {
    return <Loader />;
  }

  return (
    <section>
      <Breadcrumbs category={item.category} productName={item.name} />
      <ButtonBack />
      <h2>{item.name}</h2>
      <ProductGallery item={item} />
      <ColorSelection
        availableColors={item.colorsAvailable}
        currentColor={color}
        setColor={setColor}
        id={idForCart}
      />
    </section>
  );
};
