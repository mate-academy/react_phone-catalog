import { render } from '@testing-library/react';
import { Icon } from '../Icon';
import { Icons } from '../../../types/Icons';

describe('Icon component', () => {
  it('renders with icon', () => {
    const component = render(<Icon icon={Icons.ArrowUp} />);

    expect(component).toMatchSnapshot();
  });
});
