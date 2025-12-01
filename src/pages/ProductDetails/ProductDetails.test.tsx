// src/pages/ProductDetails/ProductDetails.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import { phones } from '../../data/phones';

// usa um produto real do dataset (assegure que exista)
const sample = phones[0];

describe('ProductDetails page', () => {
  it('shows loader then product details and allows interactions', async () => {
    render(
      <MemoryRouter initialEntries={[`/product/${sample.id}`]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    // loader aparece (componente retorna Loader)
    expect(screen.getByTestId('product-details')).toBeInTheDocument();

    // aguarda o título aparecer
    await waitFor(() =>
      expect(screen.getByTestId('product-details-title')).toBeInTheDocument(),
    );

    // preço
    expect(screen.getByTestId('product-price')).toBeInTheDocument();

    // se houver cores, deve renderizar opções
    const colors = sample.colorsAvailable ?? [];

    if (colors.length > 0) {
      expect(
        screen.getByTestId(`color-option-${colors[0]}`),
      ).toBeInTheDocument();
    }

    // se houver imagens, thumbs devem existir
    if (sample.images && sample.images.length > 0) {
      expect(screen.getByTestId('product-thumbs')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('product-thumb-0'));
      expect(screen.getByTestId('product-main-image')).toBeInTheDocument();
    }
  });

  it('shows not found message for unknown id', async () => {
    render(
      <MemoryRouter initialEntries={['/product/unknown-id']}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    // espera o not found
    await waitFor(() =>
      expect(
        screen.getByTestId('product-details-not-found'),
      ).toBeInTheDocument(),
    );
    expect(screen.getByText('Produto não encontrado')).toBeInTheDocument();
  });
});
