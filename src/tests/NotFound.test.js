import { screen } from '@testing-library/react';
import React from 'react';

import NotFound from '../components/NotFound';
import renderWithRouter from './helpers/renderWithRouters';

describe('Teste do component <NotFound />', () => {
  test('Verifica se a mensagem correta é exibida', () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByRole('heading', {
      name: /Page requested not found Crying emoji/i,
    });
    expect(title).toBeInTheDocument();
  });
  test('Verifica se a image da pagina esta correta', () => {
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const { getByRole } = renderWithRouter(<NotFound />);
    const img = getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(img.src).toBe(url);
  });
});
