import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import App from '../App';
import mock from '../data';
import renderWithRouter from './helpers/renderWithRouters';

describe('Teste do componente <Pokedex />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  afterEach(() => {
    cleanup();
  });
  test('Verifica se na pagina tem o H2 correto', () => {
    const title = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });
  test('Verifica se tem o botão proximo pokemon', () => {
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();
  });
  test('Verifica se ao clicar no botao outro pokemom é mostrado', () => {
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    const FIRST = screen.getByTestId(/pokemon-name/i).innerHTML;
    for (let index = 0; index <= mock.length; index += 1) {
      const lastName = screen.getByTestId('pokemon-name').innerHTML;
      userEvent.click(button);
      const nextName = screen.getByTestId(/pokemon-name/i).innerHTML;
      expect(lastName).not.toBe(nextName);
      if (index === mock.length) expect(FIRST).toBe(mock[0].name);
    }
  });
  test('Verifica se apenas um pokemon é mostrado', () => {
    const allPokemons = screen.getAllByTestId('pokemon-name');
    expect(allPokemons).toHaveLength(1);
  });
  test('Verifica se exite os butões de filtragem', () => {
    const button = screen.getAllByTestId('pokemon-type-button');
    const types = mock.reduce((acc, curr) => {
      if (!acc.includes(curr.type)) acc.push(curr.type);
      return acc;
    }, []);
    expect(button).toHaveLength(types.length);
    button.forEach((each, index) => {
      expect(each).toHaveTextContent(types[index]);
    });
  });
  test('Verifica se somente pokemon do tipo filtrado é exibido', () => {
    const button = screen.getAllByTestId('pokemon-type-button');
    const types = mock.reduce((acc, curr) => {
      if (!acc.includes(curr.type)) acc.push(curr.type);
      return acc;
    }, []);
    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    button.forEach(each => {
      userEvent.click(each);
      for (let i = 0; i < types.length; i += 1) {
        const NAME_TYPE = screen.getByTestId('pokemon-type').innerHTML;
        expect(NAME_TYPE).toBe(each.innerHTML);
        userEvent.click(nextButton);
      }
    });
  });
  test('Verifica o comportamento do botão all', () => {
    const all = screen.getByRole('button', { name: /all/i });
    expect(all).toBeInTheDocument();
    userEvent.click(all);
    expect(all).toBeInTheDocument();
  });
});
