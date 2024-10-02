import { useTranslation } from 'react-i18next';
import {
  CategoryImageStyled,
  CategoryItemStyled,
  CategoryTextStyled,
  CategoryTitleStyled,
  CategotyStyled,
  ContainerImgStyled,
  ContainerStyled,
  SecondTextStyled,
} from './styled';
import { StrCode } from '../../../../utils/enums';
import { useAppSelector } from '../../../../hooks/hookStore';

const CategoryBlock = () => {
  const { t } = useTranslation();
  const { phones } = useAppSelector(state => state.phones);
  const { tables } = useAppSelector(state => state.tables);
  const { accessories } = useAppSelector(state => state.accessories);

  return (
    <ContainerStyled>
      <CategoryTitleStyled>{t(StrCode.ShopByCategory)}</CategoryTitleStyled>

      <CategotyStyled>
        <CategoryItemStyled>
          <ContainerImgStyled variang="first">
            <CategoryImageStyled variang="first" />
          </ContainerImgStyled>

          <CategoryTextStyled>{t(StrCode.MobilePhones)}</CategoryTextStyled>

          <SecondTextStyled>
            {`${phones.length} ${t(StrCode.Models)}`}
          </SecondTextStyled>
        </CategoryItemStyled>

        <CategoryItemStyled>
          <ContainerImgStyled variang="second">
            <CategoryImageStyled variang="second" />
          </ContainerImgStyled>

          <CategoryTextStyled>{t(StrCode.Tablets)}</CategoryTextStyled>

          <SecondTextStyled>
            {`${tables.length} ${t(StrCode.Models)}`}
          </SecondTextStyled>
        </CategoryItemStyled>

        <CategoryItemStyled>
          <ContainerImgStyled variang="three">
            <CategoryImageStyled variang="three" />
          </ContainerImgStyled>

          <CategoryTextStyled>{t(StrCode.Accessories)}</CategoryTextStyled>

          <SecondTextStyled>
            {`${accessories.length} ${t(StrCode.Models)}`}
          </SecondTextStyled>
        </CategoryItemStyled>
      </CategotyStyled>
    </ContainerStyled>
  );
};

export default CategoryBlock;
