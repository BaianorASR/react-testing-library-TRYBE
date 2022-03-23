import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';

import Pokemon from '../components/Pokemon';
import mock from '../data';
import renderWithRouter from './helpers/renderWithRouters';

describe('Teste component <Pokemon />', () => {
  let history = createMemoryHistory();
  beforeEach(() => {
    const { history: hist } = renderWithRouter(<Pokemon isFavorite pokemon={mock[0]} />);
    history = hist;
  });
  afterEach(() => {
    cleanup();
  });

  test('Verifica se o sprite do pokemon é o mesmo da api', () => {
    const img = screen.getByAltText(`${mock[0].name} sprite`);
    expect(img).toBeDefined();
    expect(img).toHaveAttribute('src', mock[0].image);
  });
  test('Verifica se o icone de favorito é mostrado', () => {
    const img = screen.getByAltText(`${mock[0].name} is marked as favorite`);
    expect(img).toBeDefined();
    expect(img).toHaveAttribute('src', '/star-icon.svg');
  });
  test('Verifica se mostra o Type do pokemon atual', () => {
    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent(mock[0].type);
  });
  test('Verifica se o link esta redirecionando para a rota correta', () => {
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
});
