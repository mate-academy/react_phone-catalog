// import { useDispatch } from 'react-redux';

type Props = {
  wide?: boolean;
};

export const AddToCartBtn: React.FC<Props> = ({ wide }) => {
  // const dispatch = useDispatch();

  // const handleAddProduct = () => {
  //   productsSlice.add
  // };

  return (
    <button
      type="button"
      className={`addToCartBtn ${wide ? 'addToCartBtn-wide' : ''}`}
      onClick={(event) => {
        event.preventDefault();
        // eslint-disable-next-line no-console
        console.log('added to cart');
      }}
    >
      Add to cart
    </button>
  );
};
