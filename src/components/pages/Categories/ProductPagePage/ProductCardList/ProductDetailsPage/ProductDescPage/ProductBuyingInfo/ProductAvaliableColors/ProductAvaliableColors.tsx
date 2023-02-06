import './ProductAvaliableColors.scss';
// import { useNavigate, useHistory } from 'react-router-dom';
import { colorsHex } from '../../../../../../../../../colorDictinary';

export const ProductAvaliableColors = ({
  product, products, setProduct,
} : any) => {
  // let {pathname} = useLocation();
  // const history = useHistory();

  const searchProductByColor = async (color: string) => {
    const newProduct = products.find((one: any) => {
      return one.phoneId === product.id.replace(product.color, color);
    });

    // console.log(pathname)

    try {
      const response = await fetch(
        `/_new/products/${newProduct.itemId}.json`,
        {
          method: 'GET',
        },
      );

      if (response.status === 200) {
        const result = await response.json();

        // navigate(`../${newProduct.id}`);
        window.history.replaceState(null, '', `/phones/${newProduct.id}`);

        // pathname=`phones${newProduct.id}`
        return setProduct(result);
      }
    } catch (err) {
      throw err;
    }

    // setProduct(newProduct)
    // console.log(window.history);
    window.history.replaceState(null, '', `/product/${newProduct.id}`);
    // history.replace({ pathname: `/product/${{newProduct.id}` });

    // window.location.reload(true);
  };

  return (
    <div className="avaliable-colors body12">
      <p>
        Avaliable colors
      </p>
      <ul className="avaliable-colors__list">
        {
          product.colorsAvailable.map((one: string) => {
            return (
              <li
                className="avaliable-colors__item"
                key={one}
                style={{
                  backgroundColor: colorsHex[one],
                }}
                onClick={() => {
                  searchProductByColor(one);
                }}
              >
                {/* {one} */}
              </li>
            );
          })
        }
      </ul>
      <div className="horizontal-line" />
    </div>
  );
};
