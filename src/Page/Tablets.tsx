import { TypeAnimation } from 'react-type-animation';
import { Breadcrumbs } from '../components/Bredcrambs';

export const Tablets = () => {
  return (
    <>
      <Breadcrumbs />
      <h1>Tablets</h1>
      <TypeAnimation
        sequence={['Tablets are coming soon ...', 1000]}
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
