import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Accessory, Phone, Tablet } from '../../../../api/types';
import { ButtonCart } from '../../../shared/components/ButtonCart';
import { ButtonFav } from '../../../shared/components/ButtonFav';
import { Line } from '../../../shared/components/Line';
import { Price } from '../../../shared/components/Price';
import { TechSpecs } from '../TechSpecs';
import { CapacitySelection } from './components/CapacitySelection';
import { ColorSelection } from './components/ColorSelection';
import { useContext, useMemo } from 'react';
import { DataContext } from '../../../../context/ContextProvider';
import { COLOR_MAP } from '../../utility/colorMap';
import scss from './MainControls.module.scss';

interface Props {
  item: Phone | Tablet | Accessory;
  variants: Phone[] | Tablet[] | Accessory[];
}

export const MainControls: React.FC<Props> = ({ item, variants }) => {
  const { products } = useContext(DataContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { category, productId } = useParams();

  const hasDiscount = location.state?.hasDiscount;

  const idForCart = useMemo(() => {
    const found = products.find(p => p.itemId === productId);

    return found ? found.id : 0;
  }, [products, productId]);

  const handleColorChange = (newColor: keyof typeof COLOR_MAP) => {
    if (!item) {
      return;
    }

    const productToNav = variants.find(
      p =>
        p.namespaceId === item.namespaceId &&
        p.capacity === item.capacity &&
        p.color === newColor,
    );

    if (productToNav) {
      navigate(`/${category}/${productToNav.id}`);
    }
  };

  const handleCapacityChange = (newCapacity: string) => {
    if (!item) {
      return;
    }

    const productToNav = variants.find(
      p =>
        p.namespaceId === item.namespaceId &&
        p.capacity === newCapacity &&
        p.color === item.color,
    );

    if (productToNav) {
      navigate(`/${category}/${productToNav.id}`);
    }
  };

  return (
    <section className={scss.mainControls}>
      <ColorSelection
        availableColors={item.colorsAvailable}
        currentColor={item.color}
        setColor={handleColorChange}
        id={idForCart}
      />
      <Line marginTop={2.4} marginBottom={2.4} />
      <CapacitySelection
        availableCapacities={item.capacityAvailable}
        currentCapacity={item.capacity}
        setCapacity={handleCapacityChange}
      />
      <Line marginTop={2.4} marginBottom={2.4} />
      <Price
        normal={item.priceRegular}
        discount={item.priceDiscount}
        hasDiscount={hasDiscount}
      />
      <div className={scss.mainControls__buttonsWrapper}>
        <ButtonCart
          productId={idForCart}
          className={scss.mainControls__cartButton}
          image={item.images[0]}
          name={item.name}
          price={item.priceDiscount}
        />
        <ButtonFav
          productId={idForCart}
          className={scss.mainControls__favButton}
          hasDiscount={false}
        />
      </div>
      <TechSpecs item={item} tech={false} />
    </section>
  );
};
