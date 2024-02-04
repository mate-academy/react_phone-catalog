import { FC } from 'react';
import { TypeAnimation } from 'react-type-animation';

type Props = {
  message?: string | null;
};

export const Error: FC<Props> = ({
  message = '',
}) => {
  return (
    <>
      {message ? (
        <TypeAnimation
          sequence={[message!, 1000]}
          style={{
            fontSize: '3em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: '700',
            padding: '32px 0',
            color: '#313237',
          }}
        />
      ) : (
        <TypeAnimation
          sequence={['Not found page', 1000]}
          style={{
            fontSize: '3em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: '700',
            padding: '32px 0',
            color: '#313237',
          }}
        />
      )}

    </>
  );
};

Error.defaultProps = {
  message: 'Ahh, Page is not working ;)',
};
