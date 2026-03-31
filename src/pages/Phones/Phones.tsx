import { Page } from '@/atoms';
import { Catalog } from '@/organisms';
import { usePhones } from '@/hooks';

const Phones = () => {
  const phones = usePhones();

  return (
    <Page>
      <Page.Breadcrumps />
      <Catalog title="Mobile phones">
        <Catalog.List items={phones} />
      </Catalog>
    </Page>
  );
};

export default Phones;
