import { describe, it, expect } from 'vitest';
import { searchHistoryReducer } from './SearchHistoryContext';
import type { SearchHistoryState } from '../types/weather';

const emptyState: SearchHistoryState = { items: [], lastRemoved: null };

describe('searchHistoryReducer', () => {
  it('ADD — adds a new city to the beginning', () => {
    const result = searchHistoryReducer(emptyState, {
      type: 'ADD',
      payload: { city: 'London' },
    });
    expect(result.items).toHaveLength(1);
    expect(result.items[0]?.city).toBe('London');
  });

  it('ADD — deduplicates by moving existing city to top', () => {
    const state: SearchHistoryState = {
      items: [
        { id: '1', city: 'Paris', searchedAt: 100 },
        { id: '2', city: 'London', searchedAt: 50 },
      ],
      lastRemoved: null,
    };
    const result = searchHistoryReducer(state, {
      type: 'ADD',
      payload: { city: 'London' },
    });
    expect(result.items).toHaveLength(2);
    expect(result.items[0]?.city).toBe('London');
    expect(result.items[1]?.city).toBe('Paris');
  });

  it('ADD — deduplication is case-insensitive', () => {
    const state: SearchHistoryState = {
      items: [{ id: '1', city: 'London', searchedAt: 100 }],
      lastRemoved: null,
    };
    const result = searchHistoryReducer(state, {
      type: 'ADD',
      payload: { city: 'london' },
    });
    expect(result.items).toHaveLength(1);
    expect(result.items[0]?.city).toBe('london');
  });

  it('REMOVE — removes item and saves to lastRemoved', () => {
    const state: SearchHistoryState = {
      items: [
        { id: '1', city: 'London', searchedAt: 100 },
        { id: '2', city: 'Paris', searchedAt: 50 },
      ],
      lastRemoved: null,
    };
    const result = searchHistoryReducer(state, {
      type: 'REMOVE',
      payload: { id: '1' },
    });
    expect(result.items).toHaveLength(1);
    expect(result.items[0]?.city).toBe('Paris');
    expect(result.lastRemoved?.city).toBe('London');
  });

  it('UNDO_REMOVE — restores item to correct position', () => {
    const state: SearchHistoryState = {
      items: [{ id: '2', city: 'Paris', searchedAt: 50 }],
      lastRemoved: { id: '1', city: 'London', searchedAt: 100 },
    };
    const result = searchHistoryReducer(state, { type: 'UNDO_REMOVE' });
    expect(result.items).toHaveLength(2);
    expect(result.items[0]?.city).toBe('London');
    expect(result.lastRemoved).toBeNull();
  });

  it('UNDO_REMOVE — does nothing when lastRemoved is null', () => {
    const result = searchHistoryReducer(emptyState, { type: 'UNDO_REMOVE' });
    expect(result).toBe(emptyState);
  });
});
