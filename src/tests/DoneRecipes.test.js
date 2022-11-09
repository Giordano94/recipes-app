import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import { setLocalStorage, clearLocalStorage } from './utils/mockLocalStorage';

const mockRecipes = [
  {
    id: '178359',
    type: 'drink',
    nationality: 'Brazilian',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Kiwi Martini',
    image:
      'https://www.thecocktaildb.com/images/media/drink/bmxmyq1630407098.jpg',
    doneDate: '29/10/2022',
    tags: ['Green', 'Sharp'],
  },
  {
    id: '52951',
    type: 'meal',
    nationality: '"Chinese"',
    category: 'Chicken',
    alcoholicOrNot: '',
    name: 'General Tso\'s Chicken',
    image: 'https://www.themealdb.com/images/media/meals/1529444113.jpg',
    doneDate: '30/10/2022',
    tags: [],
  },
];

const filterByAllBtn = 'filter-by-all-btn';
const filterByMealBtn = 'filter-by-meal-btn';
const filterByDrinkBtn = 'filter-by-drink-btn';
const DoneRecipesRoute = '/done-recipes';
const drinkName = 'Kiwi Martini';
const mealName = 'General Tso\'s Chicken';
const shareButton0 = '0-horizontal-share-btn';

describe('test  DoneRecipes page ', () => {
  test('checks if the elements exist on the screen', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(DoneRecipesRoute);
    });

    expect(history.location.pathname).toBe(DoneRecipesRoute);

    const allButton = screen.getByTestId(filterByAllBtn);
    expect(allButton).toBeDefined();
    const mealButton = screen.getByTestId(filterByMealBtn);
    expect(mealButton).toBeDefined();
    const drinkButton = screen.getByTestId(filterByDrinkBtn);
    expect(drinkButton).toBeDefined();
  });

  test('checks if the meal button renders meal recipes', async () => {
    const mockClipboard = {
      writeText: jest.fn(),
    };

    global.navigator.clipboard = mockClipboard;

    setLocalStorage('doneRecipes', mockRecipes);

    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(DoneRecipesRoute);
    });

    const mealButton = screen.getByTestId(filterByMealBtn);
    const imgButtonMeals = screen.getByRole('img', { name: /buttonmeal/i });
    expect(mealButton).toBeDefined();
    userEvent.click(mealButton);
    userEvent.click(imgButtonMeals);

    const mealEle = screen.findByText(mealName);
    expect(mealEle).toBeDefined();

    const shareBtn = await screen.findByTestId(shareButton0);
    userEvent.click(shareBtn);
  });

  test('checks if the all button renders all recipes', async () => {
    clearLocalStorage('doneRecipes');
    setLocalStorage('doneRecipes', mockRecipes);

    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(DoneRecipesRoute);
    });

    const allButton = screen.getByTestId(filterByAllBtn);
    const imgButtonAll = screen.getByRole('img', { name: /buttonall/i });
    expect(allButton).toBeDefined();
    userEvent.click(allButton);
    userEvent.click(imgButtonAll);

    const mealEle = screen.findByText(mealName);
    expect(mealEle).toBeDefined();
    const drinkEle = screen.findByText(drinkName);
    expect(drinkEle).toBeDefined();
  });

  test('checks if the drink button renders drink recipes', async () => {
    clearLocalStorage('doneRecipes');
    const mockClipboard = {
      writeText: jest.fn(),
    };

    global.navigator.clipboard = mockClipboard;

    setLocalStorage('doneRecipes', mockRecipes);

    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(DoneRecipesRoute);
    });

    const drinkButton = screen.getByTestId(filterByDrinkBtn);
    const imgButtonDrink = screen.getByRole('img', { name: /buttondrink/i });
    expect(drinkButton).toBeDefined();
    userEvent.click(drinkButton);
    userEvent.click(imgButtonDrink);

    const drinkEle = screen.findByText(drinkName);
    expect(drinkEle).toBeDefined();

    const shareBtn = await screen.findByTestId(shareButton0);
    userEvent.click(shareBtn);
  });
});
