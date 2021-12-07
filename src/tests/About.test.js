import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa se a página About contém as informações sobre a Pokédex.', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
  });
  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    const aboutHeader = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(aboutHeader).toBeInTheDocument();
  });
  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const firstParagraph = screen.getAllByText(/This application simulates a Pokédex/i);
    const secondParagraph = screen.getAllByText(/One can filter Pokémons by type/i);
    const aboutParagraphs = [...firstParagraph, ...secondParagraph];
    expect(aboutParagraphs).toHaveLength(2);
  });
  test('Testa se a página contém a seguinte imagem: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img', { name: 'Pokédex' });
    const src = img.getAttribute('src');
    expect(img).toBeInTheDocument();
    expect(src).toEqual(url);
    //  referêcia: https://developer.mozilla.org/pt-BR/docs/Web/API/Element/getAttribute
  });
});
