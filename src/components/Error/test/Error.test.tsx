import { render } from '@testing-library/react';
import { Error } from '../Error';

describe('Error component', () => {
  it('renders with error message', () => {
    const errorMessage = 'Page not found';
    const component = render(<Error error={errorMessage} />);

    expect(component).toMatchSnapshot();
  });
});
