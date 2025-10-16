import { render } from '@testing-library/react';
import Footer from './Footer';
import styles from './Footer.module.css';

describe('Footer component', () => {
  test('renders logo image, nav links and back-to-top elements', () => {
    const { getByAltText, getByRole, getByText } = render(<Footer />);

    // logo image
    const logo = getByAltText('MinhaMarca') as HTMLImageElement;
    expect(logo).toBeInTheDocument();
    expect(logo.tagName).toBe('IMG');

    // nav links
    const githubLink = getByRole('link', {
      name: /GITHUB/i,
    }) as HTMLAnchorElement;
    const contactsLink = getByRole('link', {
      name: /CONTACTS/i,
    }) as HTMLAnchorElement;
    const rightsLink = getByRole('link', {
      name: /RIGHTS/i,
    }) as HTMLAnchorElement;
    expect(githubLink).toBeInTheDocument();
    expect(contactsLink).toBeInTheDocument();
    expect(rightsLink).toBeInTheDocument();
    expect(githubLink.getAttribute('href')).toBe('#github');
    expect(contactsLink.getAttribute('href')).toBe('#contacts');
    expect(rightsLink.getAttribute('href')).toBe('#rights');

    // back to top elements
    const backText = getByText(/Back To Top/i);
    const backImg = getByAltText('BackTop') as HTMLImageElement;
    expect(backText).toBeInTheDocument();
    expect(backImg).toBeInTheDocument();
    expect(backImg.tagName).toBe('IMG');
  });

  test('applies additional className on footer element', () => {
    const extraClass = 'my-extra-class';
    const { container } = render(<Footer className={extraClass} />);
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
    // should contain module class and the extra class passed as prop
    expect(footer).toHaveClass(styles.containerFooter);
    expect(footer).toHaveClass(extraClass);
  });
});
