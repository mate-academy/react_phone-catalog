import { createCssColor } from '../functions';

describe('createCssColor', () => {
  it('To work with rosegold', () => {
    expect(createCssColor('rosegold')).toEqual('#e6bdb7');
  });
  it('To work with midnightgreen', () => {
    expect(createCssColor('midnightgreen')).toEqual('#3d654f');
  });
  it('To return proper value', () => {
    expect(createCssColor('')).toEqual('');
  });
});
