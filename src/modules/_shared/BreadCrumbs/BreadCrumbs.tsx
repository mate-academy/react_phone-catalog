import { useLocation, useParams } from 'react-router-dom';
import { BreadCrumbsStyled, ContainerSVGStyled, CrumbStyled } from './styled';
import { HOME_SVG, VECTOR_SVG } from '../../../utils/SVG';
import { useTranslation } from 'react-i18next';
import { StrCode } from '../../../utils/enums';

const BreadCrumbs = () => {
  const { pathname } = useLocation();
  const { productId } = useParams();
  const { t } = useTranslation();

  const adressName = () => {
    switch (pathname) {
      case '/phones':
        return t(StrCode.Phones);
      case '/tablets':
        return t(StrCode.Tablets);
      case '/accessories':
        return t(StrCode.Accessories);
      default:
        return 'Page not found!';
    }
  };

  const formatProductName = (productName: string) => {
    const formattedName = productName.replace(/-/g, ' ');

    return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
  };

  const itemsUsed = !productId
    ? [adressName()]
    : [adressName(), formatProductName(productId)];

  return (
    <BreadCrumbsStyled>
      <ContainerSVGStyled>
        <HOME_SVG />
      </ContainerSVGStyled>

      <CrumbStyled>
        {itemsUsed.map(item => (
          <>
            <ContainerSVGStyled>
              <VECTOR_SVG variant="right" />
            </ContainerSVGStyled>

            <div>{item}</div>
          </>
        ))}
      </CrumbStyled>
    </BreadCrumbsStyled>
  );
};

export default BreadCrumbs;
