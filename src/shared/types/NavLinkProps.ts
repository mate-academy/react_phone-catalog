import {
  FooterLabelProp,
  FooterNavName,
  FooterRoutePath,
} from '../../components/Footer/types/footerLinks';
import {
  HeaderLabelProp,
  HeaderNavName,
  HeaderRoutePath,
} from '../../components/Header/types/headerLinks';

export type NavigationItem = {
  name: HeaderNavName | FooterNavName;
  path: HeaderRoutePath | FooterRoutePath;
  labelProp: HeaderLabelProp | FooterLabelProp;
};
