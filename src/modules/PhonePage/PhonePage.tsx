import { Container } from '../../components/container/Container';
import { TitlePages } from '../HomePage/components/title/TitlePages';
import { PageNav } from './components/pageNav/PageNav';
import styles from './PhonePage.module.scss';

export const PhonePage = () => {

  return (<>
    <Container>
      <PageNav />
       <TitlePages type={'phones'} />
 </Container>

    </>)
};
