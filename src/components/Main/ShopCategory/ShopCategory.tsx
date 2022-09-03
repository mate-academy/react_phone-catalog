import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../../api/api';
import { Product } from '../../../react-app-env';
import './ShopCategory.scss';

export const ShopCategory: React.FC = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const phonesAll = allProducts.filter(item => item.type === 'phone');
  const tabletsAll = allProducts.filter(item => item.type === 'tablet');
  const accessoriesAll = allProducts.filter(item => item.type === 'accessory');

  useEffect(() => {
    getProducts()
      .then(result => {
        setAllProducts(result);
      })
      .catch((error) => {
        setErrorMsg(`${error}`);
      });
  },
  []);

  return (
    <div data-cy="categoryLinksContainer" className="shopcategory">
      <h1 className="shopcategory__title">Shop by category</h1>
      <div className="shopcategory__box-content">
        {errorMsg.length !== 0
        && <p className="phonespage__error">{errorMsg}</p>}
        <div className="shopcategory__box-category">
          <IconButton
            size="small"
            sx={{ padding: 0 }}
            className="shopcategory__iconbutton"
            onClick={() => {
              navigate('/phones');
            }}
          >
            <div className="shopcategory__image" />
          </IconButton>
          <h3 className="shopcategory__subtitle">Mobile phones</h3>
          <p className="shopcategory__counter">
            {`${phonesAll.length} models`}
          </p>
        </div>

        <div className="shopcategory__box-category">
          <IconButton
            size="small"
            sx={{ padding: 0 }}
            className="shopcategory__iconbutton"
            onClick={() => {
              navigate('/tablets');
            }}
          >
            <div className="shopcategory__image shopcategory__image--tablets" />
          </IconButton>
          <h3 className="shopcategory__subtitle">Tablets</h3>
          <p className="shopcategory__counter">
            {`${tabletsAll.length} models`}
          </p>
        </div>

        <div className="shopcategory__box-category">
          <IconButton
            size="small"
            sx={{ padding: 0 }}
            className="shopcategory__iconbutton"
            onClick={() => {
              navigate('/accessories');
            }}
          >
            <div
              className="shopcategory__image shopcategory__image--accessories"
            />
          </IconButton>
          <h3 className="shopcategory__subtitle">Accessories</h3>
          <p className="shopcategory__counter">
            {`${accessoriesAll.length} models`}
          </p>
        </div>
      </div>
    </div>
  );
};
