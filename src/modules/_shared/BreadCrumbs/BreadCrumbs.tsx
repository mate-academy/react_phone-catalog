import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BreadCrumbsStyled, ContainerSVGStyled, CrumbStyled } from './styled';
import { HOME_SVG, VECTOR_SVG } from '../../../utils/SVG';
import { useTranslation } from 'react-i18next';
import { StrCode } from '../../../utils/enums';
import { useEffect, useState } from 'react';

const BreadCrumbs = () => {
  const { pathname } = useLocation();
  const { productId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const basePath = pathname.split('/').slice(0, 2).join('/');

  const adressName = () => {
    switch (basePath) {
      case '/phones':
        return t(StrCode.Phones);
      case '/tablets':
        return t(StrCode.Tablets);
      case '/accessories':
        return t(StrCode.Accessories);
      case '/favorites':
        return t(StrCode.Favourites);
      default:
        return 'Page not found!';
    }
  };

  const navigateTo = (aress: string) => {
    switch (aress) {
      case t(StrCode.Phones):
        navigate('/phones');
        break;
      case t(StrCode.Tablets):
        navigate('/tablets');
        break;
      case t(StrCode.Accessories):
        navigate('/accessories');
        break;
      default:
        break;
    }
  };

  const formatProductName = (productName: string) => {
    const formattedName = productName.replace(/-/g, ' ');

    return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
  };

  const itemsUsed = !productId
    ? [adressName()]
    : [adressName(), formatProductName(productId)];

  const [itemUsed, setItemUsed] = useState(itemsUsed);

  useEffect(() => {
    setItemUsed(
      !productId
        ? [adressName()]
        : [adressName(), formatProductName(productId)],
    );
  }, [t, pathname, productId]);

  return (
    <BreadCrumbsStyled>
      <ContainerSVGStyled onClick={() => navigate('/')}>
        <HOME_SVG />
      </ContainerSVGStyled>

      <CrumbStyled>
        {itemUsed.map(item => (
          <>
            <ContainerSVGStyled>
              <VECTOR_SVG variant="right" />
            </ContainerSVGStyled>

            <div onClick={() => navigateTo(item)}>{item}</div>
          </>
        ))}
      </CrumbStyled>
    </BreadCrumbsStyled>
  );
};

export default BreadCrumbs;
