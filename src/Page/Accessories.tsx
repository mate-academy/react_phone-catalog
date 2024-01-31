import { TypeAnimation } from 'react-type-animation';
import { Breadcrumbs } from '../components/Bredcrambs/Breadcrumbs';

export const Accessories = () => {
  return (
    <>
      <Breadcrumbs />
      <h1>Accessories</h1>
      <TypeAnimation
        sequence={['Accessories are coming soon ...', 1000]}
        style={{
          fontSize: '3em',
          display: 'flex',
          fontWeight: '700',
          padding: '32px 0',
          color: '#313237',
        }}
      />
    </>
  );
};
