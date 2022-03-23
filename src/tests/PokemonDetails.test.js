import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import App from '../App';
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
  summary:
    'This intelligent Pokémon roasts hard berries with' +
    ' electricity to make them tender enough to eat.',
};

describe('Teste do component <PokemonDetails />', () => {
  const path = '/pokemons/25';
  test('Verifica se os items corretos estão exibidos', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);
    expect(history.location.pathname).toBe(path);
    const title = screen.getByRole('heading', {
      name: `${mock.name} Details`,
    });
    expect(title).toBeInTheDocument();

    const link = screen.queryByRole('link', { name: /more details/i });
    expect(link).not.toBeInTheDocument();

    const H2 = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    expect(H2).toBeInTheDocument();

    const summary = screen.getByText(mock.summary);
    expect(summary).toBeInTheDocument();
  });
  test('Verifica se a parte do mapa esta correta', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);
    expect(history.location.pathname).toBe(path);
    const title = screen.getByRole('heading', {
      name: `Game Locations of ${mock.name}`,
    });
    expect(title).toBeInTheDocument();

    const imgs = screen.getAllByAltText(`${mock.name} location`);
    expect(imgs).toBeDefined();

    imgs.forEach((each, index) => {
      expect(each).toHaveAttribute('src', mock.foundAt[index].map);
    });
  });
  test('Verifica Favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);
    expect(history.location.pathname).toBe(path);

    const check = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(check).toBeInTheDocument();
  });
});
