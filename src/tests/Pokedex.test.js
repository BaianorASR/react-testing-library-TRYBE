import { cleanup, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import App from '../App';
import renderWithRouter from './helpers/renderWithRouters';

describe('Teste do componente <Pokedex />', () => {
  afterEach(() => {
    cleanup();
  });
  test('Verifica se na pagina tem o H2 correto', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(title).toBeInTheDocument();
  });
  test('Verifica se tem o botão proximo pokemon', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();
  });
  test('Verifica se ao clicar no botao outro pokemom é mostrado', async () => {
    renderWithRouter(<App />);
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
    renderWithRouter(<App />);
    const allPokemons = screen.getAllByTestId('pokemon-name');

    expect(allPokemons).toHaveLength(1);
  });
  test('Verifica se exite os butões de filtragem', () => {
    const app = renderWithRouter(<App />);
    const NUMBER = 8;
    const div = app.container.querySelector('.pokedex-buttons-panel');
    const btn = within(div).getAllByRole('button');
    expect(btn).toHaveLength(NUMBER);
  });
});
