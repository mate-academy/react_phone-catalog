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
import { useTheme } from '../../../../components/Themes/ThemeProvider';

const CategoryBlock = () => {
  const { t } = useTranslation();
  const { phones } = useAppSelector(state => state.phones);
  const { tables } = useAppSelector(state => state.tables);
  const { accessories } = useAppSelector(state => state.accessories);
  const { theme } = useTheme();

  return (
    <ContainerStyled>
      <CategoryTitleStyled>{t(StrCode.ShopByCategory)}</CategoryTitleStyled>

      <CategotyStyled>
        <CategoryItemStyled to="/phones">
          <div
            style={{
              overflow: 'hidden',
              marginBottom: '20px',
              borderRadius: theme.borderRadius,
            }}
          >
            <ContainerImgStyled variang="first">
              <CategoryImageStyled variang="first" />
            </ContainerImgStyled>
          </div>

          <CategoryTextStyled>{t(StrCode.MobilePhones)}</CategoryTextStyled>

          <SecondTextStyled>
            {`${phones.length} ${t(StrCode.Models)}`}
          </SecondTextStyled>
        </CategoryItemStyled>

        <CategoryItemStyled to="/tablets">
          <div
            style={{
              overflow: 'hidden',
              marginBottom: '20px',
              borderRadius: theme.borderRadius,
            }}
          >
            <ContainerImgStyled variang="second">
              <CategoryImageStyled variang="second" />
            </ContainerImgStyled>
          </div>

          <CategoryTextStyled>{t(StrCode.Tablets)}</CategoryTextStyled>

          <SecondTextStyled>
            {`${tables.length} ${t(StrCode.Models)}`}
          </SecondTextStyled>
        </CategoryItemStyled>

        <CategoryItemStyled to="/accessories">
          <div
            style={{
              overflow: 'hidden',
              marginBottom: '20px',
              borderRadius: theme.borderRadius,
            }}
          >
            <ContainerImgStyled variang="three">
              <CategoryImageStyled variang="three" />
            </ContainerImgStyled>
          </div>

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
