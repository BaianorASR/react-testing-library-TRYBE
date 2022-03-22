import { cleanup, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';

import App from '../App';
import renderWithRouter from './helpers/renderWithRouters';

describe('Teste do componente <App.js />', () => {
  let history = createMemoryHistory();
  beforeEach(() => {
    const { history: hist } = renderWithRouter(<App />);
    history = hist;
  });
  afterEach(() => {
    cleanup();
  });
  test('Verifica se a barra de navegação está visível', () => {
    const navigation = screen.getByRole('navigation');
    expect(navigation).toBeInTheDocument();
  });
  test('Verifica se a navbar tem a ordem e os nome corretos', () => {
    const navigation = screen.getByRole('navigation');
    const children = within(navigation).getAllByRole('link');
    const arrayTitles = ['Home', 'About', 'Favorite Pokémons'];

    children.forEach((each, index) => {
      expect(each).toHaveTextContent(arrayTitles[index]);
    });
  });
  test('Verifica se o funcionamento do click na navbar esta correto', () => {
    const navigation = screen.getByRole('navigation');
    const children = within(navigation).getAllByRole('link');
    const arrayPaths = ['/', '/about', '/favorites'];

    children.forEach((each, index) => {
      userEvent.click(each);
      const {
        location: { pathname },
      } = history;
      expect(pathname).toBe(arrayPaths[index]);
    });
  });
  test('Verifica se ao colocar um path desconhecido é mostrado a rota "Not Fount"',
    () => {
      expect(history.location.pathname).toBe('/');
      const title = () => screen.getByRole('heading', {
        name: /page requested not found crying emoji/i,
      });

      history.push('essa-rota-nao-existe');
      expect(title()).toBeInTheDocument();

      const arrWarnRoutes = ['abouts', 'homes', 'favorite'];

      arrWarnRoutes.forEach((each) => {
        history.push(each);
        expect(title()).toBeInTheDocument();
      });
    });
});
