import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente Footer', () => {
  test('testa se aparece os botões na tela', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });

    const drink = screen.getByRole('img', { name: /drink icon/i });
    const meal = screen.getByRole('img', { name: /meal icon/i });

    expect(drink).toBeInTheDocument();
    expect(meal).toBeInTheDocument();
  });

  test('testa se redireciona para a rota correta', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });

    const drink = screen.getByTestId('drinks-bottom-btn');
    const meal = screen.getByTestId('meals-bottom-btn');

    userEvent.click(drink);
    expect(history.location.pathname).toBe('/drinks');
    userEvent.click(meal);
    expect(history.location.pathname).toBe('/meals');
  });
});
