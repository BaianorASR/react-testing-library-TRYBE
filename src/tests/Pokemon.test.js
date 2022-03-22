import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Pokemon from '../components/Pokemon';
import renderWithRouter from './helpers/renderWithRouters';

const mock = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
};

describe('Teste component Pokemon', () => {
  test('Verifica alguma poha ai', () => {
    renderWithRouter(<Pokemon isFavorite pokemon={ mock } />);
    const img = screen.getByAltText(`${mock.name} sprite`);
    expect(img).toBeDefined();
    expect(img).toHaveAttribute('src', mock.image);
  });
  test('Verifica alguma poha ai', () => {
    renderWithRouter(<Pokemon isFavorite pokemon={ mock } />);
    const img = screen.getByAltText(`${mock.name} is marked as favorite`);
    expect(img).toBeDefined();
    expect(img).toHaveAttribute('src', '/star-icon.svg');
  });
  test('Verifica se mostra o Type', () => {
    renderWithRouter(<Pokemon isFavorite pokemon={ mock } />);
    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent(mock.type);
  });
  test('Link', () => {
    const { history } = renderWithRouter(<Pokemon isFavorite pokemon={ mock } />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
});
