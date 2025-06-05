import { describe, it, expect } from 'vitest';
import { cartReducer } from '../src/Components/Cart/CartContext';

describe('Suites de test : cartReducer', () => {
  it('SET_TOTAL_ITEMS met à jour totalItems', () => {
    const state = { totalItems: 0 };
    const action = { type: 'SET_TOTAL_ITEMS', payload: 3 };
    const result = cartReducer(state, action);
    expect(result.totalItems).toBe(3);
  });

  it('CLEAR_TOTAL_ITEMS remet totalItems à 0', () => {
    const state = { totalItems: 7 };
    const action = { type: 'CLEAR_TOTAL_ITEMS' };
    const result = cartReducer(state, action);
    expect(result.totalItems).toBe(0);
  });

  it('UNKNOWN_ACTION do something unusual, initial state 3, must stay at 3', () => {
    const initialState = { totalItems: 3 };
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = cartReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
