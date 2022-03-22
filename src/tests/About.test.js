import React from 'react';

import About from '../components/About';
import renderWithRouter from './helpers/renderWithRouters';

describe('Teste component <About />', () => {
  test('Verifica se a pagina contem um titulo com a "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);
    const title = getByRole('heading', { name: /about pokédex/i });
    expect(title).toBeInTheDocument();
  });
  test('Verifica se a pagina contem dois parágrafos', () => {
    const { container } = renderWithRouter(<About />);
    const paragraph = container.querySelectorAll('p');
    expect(paragraph).toHaveLength(2);
  });
  test('Verifica se a pagina tem a image correta', () => {
    const { getByRole } = renderWithRouter(<About />);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = getByRole('img');

    expect(img.src).toBe(url);
  });
});
