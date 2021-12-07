import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o componente <NotFound.js />', () => {
  test('Testa se pág. contém um heading h2 com texto Page requested not found 😭', () => {
    render(<NotFound />);
    const notFoundHeader = screen
      .getByRole('heading', { level: 2, name: /Page requested not found/i });
    expect(notFoundHeader).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem: https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const notFoundImg = screen
      .getByRole(
        'img', { name: 'Pikachu crying because the page requested was not found' },
      );
    const src = notFoundImg.getAttribute('src');
    expect(notFoundImg).toBeInTheDocument();
    expect(src).toEqual(url);
  });
});
