import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testando a tela de receitas', () => {
  jest.setTimeout(40000);
  test('1-meals', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    const img = await screen.findByTestId('0-card-img', undefined, { timeout: 5000 });
    const button = await screen.findByTestId('Beef-category-filter', { }, { timeout: 5000 });
    const buttons = await screen.findAllByRole('checkbox', undefined, { timeout: 5000 });
    const todos = await screen.findByTestId('All-category-filter', { }, { timeout: 5000 });

    expect(img).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(buttons.length).toBe(Number(6));

    userEvent.click(button);
    const img2 = await screen.findByTestId('0-card-name', { }, { timeout: 5000 });
    const img5 = await screen.findAllByRole('heading', undefined, { timeout: 5000 });
    expect(img2).toBeInTheDocument();
    expect(img5.length).toBe(Number(1));

    userEvent.click(todos);
    const img6 = await screen.findAllByRole('img', undefined, { timeout: 5000 });
    expect(img6.length).toBe(Number(19));
    expect(img6[0]).toBeInTheDocument();
  });
  it('2-drinks', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    expect(history.location.pathname).toBe('/drinks');

    const img = await screen.findByTestId('0-card-img', undefined, { timeout: 5000 });
    const button = await screen.findByTestId(/ordinary drink-category-filter/i, { }, { timeout: 5000 });
    const button2 = await screen.findByTestId('Cocktail-category-filter', { }, { timeout: 5000 });
    const todos = await screen.findByTestId('All-category-filter', { }, { timeout: 5000 });
    const buttons = await screen.findAllByRole('checkbox', undefined, { timeout: 5000 });

    expect(img).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(buttons.length).toBe(Number(6));

    userEvent.click(button);
    const img2 = await screen.findByTestId('0-card-name', { }, { timeout: 5000 });
    const img5 = await screen.findAllByRole('heading', undefined, { timeout: 5000 });
    expect(img2).toBeInTheDocument();
    expect(img5.length).toBe(Number(1));

    userEvent.click(button);
    const img4 = await screen.findByTestId('3-card-name', { }, { timeout: 5000 });
    expect(img4).toBeInTheDocument();

    userEvent.click(button2);
    const img3 = await screen.findByTestId('4-card-name', { }, { timeout: 5000 });
    expect(img3).toBeInTheDocument();

    userEvent.click(todos);
    const img6 = await screen.findAllByRole('heading', undefined, { timeout: 5000 });
    expect(img6.length).toBe(Number(1));
    expect(img6[0]).toBeInTheDocument();
  });
  test('test', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    const button = await screen.findByTestId(/ordinary drink-category-filter/i, { }, { timeout: 5000 });
    userEvent.click(button);
    const img2 = await screen.findByTestId('1-card-name', { }, { timeout: 5000 });
    expect(img2).toBeInTheDocument();
    userEvent.click(button);
    const img6 = await screen.findByTestId('2-card-name', { }, { timeout: 5000 });
    expect(img6).toBeInTheDocument();
  });
  jest.setTimeout(60000);
  test('test-2', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const button = await screen.findByTestId('Beef-category-filter', { }, { timeout: 5000 });
    userEvent.click(button);
    const img2 = await screen.findByText(/beef and mustard pie/i, { }, { timeout: 10000 });
    expect(img2).toBeInTheDocument();
    userEvent.click(button);
    const img6 = await screen.findByText(/corba/i, { }, { timeout: 5000 });
    expect(img6).toBeInTheDocument();
  });
});
