import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Breadcrumbs.scss';
import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../store/ProductContext';
import { getDetailedItems } from '../../api/DetailedProduct';

function upperLetter(words: string) {
  const result = [];

  for (const word of words.split('-')) {
    const wordPiece =
      word.slice(0, 1).toUpperCase() + word.slice(1, word.length);

    result.push(wordPiece);
  }

  return result.join(' ');
}

export const Breadcrumbs = () => {
  const { state } = useLocation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { selectedProduct, onSelectedProduct } = useContext(ProductContext);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (!selectedProduct) {
      const getItems = async () => {
        const elements = pathname.split('/').filter(path => path);
        const items = await getDetailedItems(elements[0]);

        const res = items.find(item => item.id === elements[1]) || null;

        setCategoryName(upperLetter(elements[0]));

        onSelectedProduct(res);
      };

      getItems();
    } else {
      setCategoryName(upperLetter(selectedProduct.category));
    }
  }, [onSelectedProduct, pathname, selectedProduct]);

  function goBack() {
    onSelectedProduct(null);

    if (state && state.pathname) {
      navigate({ pathname: '..', search: state?.search });
    } else if (!state) {
      navigate({
        pathname: `/${categoryName}`,
      });
    }
  }

  return (
    <div className="breadcrumbs">
      <Link to={`/`} className="breadcrumbs--home"></Link>
      <div className="breadcrumbs--arrow-right"></div>
      <p
        className={classNames('breadcrumbs--text', {
          'breadcrumbs--text--is-active': selectedProduct,
        })}
        onClick={goBack}
      >
        {categoryName}
      </p>
      {selectedProduct?.category && (
        <>
          <div className="breadcrumbs--arrow-right"></div>
          <p className="breadcrumbs--text">{selectedProduct.name}</p>
        </>
      )}
    </div>
  );
};
