import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './ShopCategory.scss';
import products from '../../../api/products.json';

export const ShopCategory: React.FC = () => {
  const navigate = useNavigate();
  const phonesAll = products.filter(item => item.type === 'phone');
  const tabletsAll = products.filter(item => item.type === 'tablet');
  const accessoriesAll = products.filter(item => item.type === 'accessories');

  return (
    <div data-cy="categoryLinksContainer" className="shopcategory">
      <h1 className="shopcategory__title">Shop by category</h1>
      <div className="shopcategory__box-content">
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
