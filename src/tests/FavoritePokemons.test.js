import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <FavoritePokemons.js />', () => {
  test('Testa se é exibida mensagem "No favorite pokemon found", se não tiver favoritos',
    () => {
      renderWithRouter(<App />);
      const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
      userEvent.click(linkFavorites);
      const noSelectFavorites = screen.getByText('No favorite pokemon found');
      expect(noSelectFavorites).toBeInTheDocument();
    });
  test('Teste se são exibidos todos os cards de pokémons favoritados.',
    () => {
      renderWithRouter(<App />);
      const linkMoreDetails = screen.getByRole('link', { name: /More Details/i });
      expect(linkMoreDetails).toBeInTheDocument();
      userEvent.click(linkMoreDetails);
      const title = screen.getByTestId('pokemon-name');
      expect(title).toBeInTheDocument();
      const inputLabel = screen.getByLabelText(/Pokémon favoritado?/i);
      expect(inputLabel).toBeInTheDocument();
      const checkImput = screen.getByRole('checkbox');
      userEvent.click(checkImput);
      expect(checkImput).toBeDefined();
      const favoritedSimbol = screen
        .getByRole('img', { name: 'Pikachu is marked as favorite' });
      expect(favoritedSimbol).toBeInTheDocument();
    });
});
