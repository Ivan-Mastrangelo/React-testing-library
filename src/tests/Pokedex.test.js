import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente <Pokedex.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('Se a página contém um heading h2 com o texto Encountered pokémons', () => {
    const Header = screen
      .getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(Header).toBeInTheDocument();
  });
  test('se é exibido o próximo Pokémon quando o botão Próximo pokémon é clicado.', () => {
    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextButton).toBeInTheDocument();
    for (let i = 0; i < pokemons.length; i += 1) {
      const nextPokemon = pokemons[i].name;
      const pokemonShown = screen.getByText(nextPokemon);
      expect(pokemonShown).toBeInTheDocument();
      userEvent.click(nextButton);
      console.log(nextPokemon);
    }
    const firstPokemon = pokemons[0].name;
    const pokemonShown = screen.getByText(firstPokemon);
    expect(pokemonShown).toBeInTheDocument();
  });
  test('se é mostrado apenas um Pokémon por vez', () => {
    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    for (let i = 0; i < pokemons.length; i += 1) {
      const allPokemons = screen.getAllByTestId('pokemon-name');
      expect(allPokemons).toHaveLength(1);
      userEvent.click(nextButton);
    }
  });
  test('se a Pokédex tem os botões de filtro', () => {
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(typeButtons).toBeDefined();
    pokemons.forEach((pokemon) => {
      const eachTypeBtn = screen.getByRole('button', { name: pokemon.type });
      expect(eachTypeBtn).toBeInTheDocument();
    });
  });
  test('se a Pokédex contém um botão para resetar o filtro', () => {
    const allBtn = screen.getByRole('button', { name: 'All' });
    // expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);
    expect(allBtn).toBeInTheDocument();
  });
});
