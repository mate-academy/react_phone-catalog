import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/hookStore';
import CartCard from './components/CartCard/CartCard';
import {
  AllPriceStyled,
  ButtonsModalStyled,
  CartStyled,
  ContainerStyled,
  ModalTextStyled,
  PriceBlockStyled,
  PriceInfoStyled,
  ProductItemsStyled,
  TitleStyled,
} from './styled';
import { StrCode } from '../../utils/enums';
import { NotFoundImg, ProductsNotFound } from '../ProductsPage/styled';
import { useState } from 'react';
import Modal from '../../components/Popup/Popup';
import { clearBacketId } from '../../features/basketSlice';
import GoBack from '../_shared/GoBack/GoBack';

const CartPage = () => {
  const [isBying, setIsBying] = useState(false);
  const { backetsId } = useAppSelector(state => state.backets);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleClear = () => {
    dispatch(clearBacketId());
    setIsBying(false);
  };

  const backetsPrice = backetsId
    .map(item => item.count * item.product.price)
    .reduce((cou, item) => cou + item, 0);

  const backetsCoung = backetsId.reduce((acc, item) => acc + item.count, 0);

  return (
    <CartStyled>
      <Modal isOpen={isBying} onClose={() => setIsBying(false)}>
        <ModalTextStyled>{t(StrCode.CheckoutCart)}</ModalTextStyled>

        <ButtonsModalStyled>
          <Button variant="dark" onFunc={handleClear}>
            {t(StrCode.Confirm)}
          </Button>

          <Button variant="white" onFunc={() => setIsBying(false)}>
            {t(StrCode.Cancel)}
          </Button>
        </ButtonsModalStyled>
      </Modal>

      <GoBack />

      <TitleStyled>{t(StrCode.Cart)}</TitleStyled>

      {!!backetsId.length ? (
        <ContainerStyled>
          <ProductItemsStyled>
            {backetsId.map(item => (
              <CartCard
                product={item.product}
                count={item.count}
                key={item.itemId}
              />
            ))}
          </ProductItemsStyled>

          <PriceBlockStyled>
            <AllPriceStyled>{`$${backetsPrice}`}</AllPriceStyled>

            <PriceInfoStyled>
              {`${t(StrCode.TotalFor)} ${backetsCoung} ${t(StrCode.Items)}`}
            </PriceInfoStyled>

            <Button variant="dark" onFunc={() => setIsBying(true)}>
              {t(StrCode.Checkout)}
            </Button>
          </PriceBlockStyled>
        </ContainerStyled>
      ) : (
        <ProductsNotFound>
          {t(StrCode.NotCart)}

          <NotFoundImg src="/react_phone-catalog/img/cart-is-empty.png" />
        </ProductsNotFound>
      )}
    </CartStyled>
  );
};

export default CartPage;
