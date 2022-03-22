import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Pokedex from '../components/Pokedex';
import { isPokemonFavoriteById, pokemons } from '../services/mocks/MOCK';
import renderWithRouter from './helpers/renderWithRouters';

describe('Teste do componente <Pokedex />', () => {
  beforeEach(() => {
    renderWithRouter(
      <Pokedex isPokemonFavoriteById={ isPokemonFavoriteById } pokemons={ pokemons } />,
    );
  });
  afterEach(() => {
    cleanup();
  });
  test('Verifica se na pagina tem o H2 correto', () => {
    const title = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(title).toBeInTheDocument();
  });
  test('Verifica se tem o botão proximo pokemon', () => {
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();
  });
  test('Verifica se ao clicar no botao outro pokemom é mostrado', async () => {
    const button = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const RANGE = 25;
    for (let index = 0; index < RANGE; index += 1) {
      const name = screen.getByTestId('pokemon-name').innerHTML;
      userEvent.click(button);
      const nextName = screen.getByTestId(/pokemon-name/i).innerHTML;
      expect(name).not.toEqual(nextName);
    }
  });
  test('Verifica se apenas um pokemon é mostrado', () => {
    const allPokemons = screen.getAllByTestId('pokemon-name');

    expect(allPokemons).toHaveLength(1);
  });
});
