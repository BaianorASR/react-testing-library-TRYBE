import { cleanup, screen } from '@testing-library/react';
import React from 'react';

import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './helpers/renderWithRouters';

describe('Teste do component <FavoritePokemons>', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  test('Verifica se mostra a mensagem quando não tem favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const readFavoritePokemonIds = jest.fn();
    readFavoritePokemonIds.mockReturnValue([]);

    const NOT_FAVORITES = 'No favorite pokemon found';
    const error = screen.getByText(NOT_FAVORITES);
    expect(error).toBeInTheDocument();
    readFavoritePokemonIds.mockClear();
  });
  // test('Verifica se mostra os pokemons favoritos corretamente', () => {
  //   const spy = jest.spyOn(TEST, 'readFavoritePokemonIds');
  //   renderWithRouter(<FavoritePokemons />);
  //   expect(TEST.readFavoritePokemonIds).toBeCalled();
  //   // const cards = container.querySelectorAll('.favorite-pokemon');
  //   // expect(cards).toHaveLength(3);
  // });
});
