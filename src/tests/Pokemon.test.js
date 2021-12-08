import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const { id, name, type, image, averageWeight: { value, measurementUnit } } = pokemons[0];
let history;

describe('Testa o componente <Pokemon.js />', () => {
  beforeEach(() => {
    const { history: newHistory } = renderWithRouter(<App />);
    history = newHistory; // forma de exportar o history aprendida com o mentore summer Paulo Eduardo.
  });
  test('se é renderizado um card com as informações de determinado pokémon.', () => {
    const pokemName = screen.getByTestId('pokemon-name');
    expect(pokemName).toBeInTheDocument();
    expect(pokemName).toHaveTextContent(name);
    const pokemType = screen.getByTestId('pokemon-type');
    expect(pokemType).toBeInTheDocument();
    expect(pokemType).toHaveTextContent(type);
    const pokemAverageWeight = screen.getByTestId('pokemon-weight');
    expect(pokemAverageWeight).toBeInTheDocument();
    expect(pokemAverageWeight)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    const pokemImg = screen.getByRole('img');
    const src = pokemImg.getAttribute('src');
    const alt = pokemImg.getAttribute('alt');
    expect(pokemImg).toBeInTheDocument();
    expect(src).toBe(image);
    expect(alt).toBe(`${name} sprite`);
  });
  test('se o card Pokémon da Pokédex tem um link para os detalhes deste Pokémon', () => {
    const linkCard = screen.getByRole('link', { name: 'More details' });
    const url = linkCard.getAttribute('href');
    console.log(url);
    expect(linkCard).toBeInTheDocument();
    expect(url).toBe(`/pokemons/${id}`);
  });
  test('se ao clicar no link do card, usuário é redirecionado p/ a página de detalhes',
    () => {
      const linkCard = screen.getByRole('link', { name: 'More details' });
      expect(linkCard).toBeInTheDocument();
      userEvent.click(linkCard);
      expect(history.location.pathname).toEqual(`/pokemons/${id}`);
    });
  test('se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const newLinkCard = screen.getByRole('link', { name: /More details/ });
    expect(newLinkCard).toBeInTheDocument();
    userEvent.click(newLinkCard);
    const inputLabel = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(inputLabel).toBeInTheDocument();
    const checkImput = screen.getByRole('checkbox');
    userEvent.click(checkImput);
    const favorited = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(favorited).toBeInTheDocument();
    const srcStar = favorited.getAttribute('src');
    console.log(srcStar);
    expect(srcStar).toBe('/star-icon.svg');
  });
});

// Este requisito foi desenvolvido com auxílio da mentora summer Lanai Conceição.
