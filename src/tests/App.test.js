import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes sobre o componente App', () => {
  test('Testa se a aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByText('Home');
    const linkAbout = screen.getByText('About');
    const linkFavorite = screen.getByText('Favorite Pokémons');
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });
  test('Testa o redirecionamento para página inicial, ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Testa redirecionamento para a página About, ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('Testa redirecionamento p/ a pág de Favoritados, ao clicar em Favorite Pokémons',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkFavorite = screen.getByRole('link', {
        name: 'Favorite Pokémons',
      });
      userEvent.click(linkFavorite);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });
  test('Testa o redirecionamento p/ a página NotFound ao entrar em uma URL desconhecida.',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/URLdesconhecida');
      const notFound = screen.getByText('Page requested not found');
      expect(notFound).toBeInTheDocument();
    });
});
